/**
 * Cloudflare Worker API for Duurzaam Metaal Recycling.
 *
 * POST /api/contact — validate, Turnstile, rate-limit, email via Resend (+ photo attachments)
 * Secrets (wrangler secret put): RESEND_API_KEY, TURNSTILE_SECRET_KEY
 * Vars: CONTACT_EMAIL, RESEND_FROM_EMAIL
 */

import { BUILD } from './build-meta.js'
import {
  buildBusinessEmail,
  buildCustomerConfirmation,
  sendResendEmail,
} from './email.js'

const ALLOWED_ORIGINS = new Set([
  'https://duurzaammetaalrecycling.nl',
  'https://www.duurzaammetaalrecycling.nl',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:8787',
  'http://127.0.0.1:8787',
])

const MAX_FIELD = 4000
const MAX_NAME = 200
const MAX_PHOTOS = 6
const MAX_PHOTO_BYTES = 5 * 1024 * 1024
const MAX_TOTAL_PHOTO_BYTES = 15 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 8

/** @type {Map<string, number[]>} */
const rateBuckets = new Map()

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || ''
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://duurzaammetaalrecycling.nl'
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(request, data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(request),
      ...extraHeaders,
    },
  })
}

function validationError(request, message, fields = {}) {
  return json(
    request,
    {
      ok: false,
      error: 'VALIDATION_ERROR',
      message,
      fields,
    },
    400
  )
}

function sanitize(value, max = MAX_FIELD) {
  return String(value || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .slice(0, max)
}

function checkRateLimit(ip) {
  const key = ip || 'unknown'
  const now = Date.now()
  const recent = (rateBuckets.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    rateBuckets.set(key, recent)
    return false
  }
  recent.push(now)
  rateBuckets.set(key, recent)
  return true
}

async function verifyTurnstile(token, secret, ip) {
  if (!secret) {
    return { ok: true, skipped: true }
  }
  if (!token) {
    return { ok: false, message: 'Bevestig dat u geen robot bent (Turnstile).' }
  }

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', token)
  if (ip) body.set('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const data = await res.json()
  if (!data.success) {
    return { ok: false, message: 'Turnstile-verificatie mislukt. Probeer opnieuw.' }
  }
  return { ok: true }
}

function decodeBase64(content) {
  try {
    const cleaned = String(content || '').replace(/\s/g, '')
    if (!cleaned || cleaned.length > MAX_PHOTO_BYTES * 1.4) return null
    const binary = atob(cleaned)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    return bytes
  } catch {
    return null
  }
}

function detectImageMime(bytes) {
  if (!bytes || bytes.length < 12) return null
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return 'image/png'
  }
  const riff = String.fromCharCode(...bytes.slice(0, 4))
  const webp = String.fromCharCode(...bytes.slice(8, 12))
  if (riff === 'RIFF' && webp === 'WEBP') return 'image/webp'
  return null
}

function safeFilename(name, mime, index) {
  const base = sanitize(name, 120)
    .replace(/[^\w.\- ()\[\]]+/g, '_')
    .replace(/\s+/g, '_')
  const ext =
    mime === 'image/png' ? '.png' : mime === 'image/webp' ? '.webp' : '.jpg'
  const stem = base.replace(/\.(jpe?g|png|webp)$/i, '') || `foto-${index + 1}`
  return `${stem}${ext}`
}

function parsePhotos(rawPhotos) {
  const list = Array.isArray(rawPhotos) ? rawPhotos : []
  if (list.length > MAX_PHOTOS) {
    return {
      error: `U kunt maximaal ${MAX_PHOTOS} foto’s meesturen.`,
      attachments: [],
    }
  }

  const attachments = []
  let total = 0

  for (let i = 0; i < list.length; i++) {
    const item = list[i] || {}
    const claimedType = sanitize(item.type || item.contentType, 80).toLowerCase()
    if (claimedType && !ALLOWED_IMAGE_TYPES.has(claimedType)) {
      return {
        error: 'Alleen JPG, PNG of WEBP-foto’s zijn toegestaan.',
        attachments: [],
      }
    }

    const bytes = decodeBase64(item.content || item.data)
    if (!bytes) {
      return {
        error: 'Een of meer foto’s konden niet worden gelezen. Probeer opnieuw.',
        attachments: [],
      }
    }

    if (bytes.length > MAX_PHOTO_BYTES) {
      return {
        error: `Elke foto mag maximaal ${MAX_PHOTO_BYTES / (1024 * 1024)} MB zijn.`,
        attachments: [],
      }
    }

    total += bytes.length
    if (total > MAX_TOTAL_PHOTO_BYTES) {
      return {
        error: `De totale fotogrootte mag maximaal ${MAX_TOTAL_PHOTO_BYTES / (1024 * 1024)} MB zijn.`,
        attachments: [],
      }
    }

    const detected = detectImageMime(bytes)
    if (!detected || !ALLOWED_IMAGE_TYPES.has(detected)) {
      return {
        error: 'Alleen JPG, PNG of WEBP-foto’s zijn toegestaan.',
        attachments: [],
      }
    }

    attachments.push({
      filename: safeFilename(item.filename || item.name, detected, i),
      content: String(item.content || item.data).replace(/\s/g, ''),
      type: detected,
      size: bytes.length,
    })
  }

  return { error: null, attachments }
}

function validateContactPayload(body) {
  const errors = {}
  const name = sanitize(body.name, MAX_NAME)
  const email = sanitize(body.email, 320)
  const phone = sanitize(body.phone, 80)
  const requestType = sanitize(body.requestType || body.type, 200)
  const description = sanitize(body.description || body.message, MAX_FIELD)
  const company = sanitize(body.company, 200)
  const location = sanitize(body.location, 200)
  const sourcePage = sanitize(body.sourcePage || body.page || body.referrer, 500)

  if (!name) errors.name = 'Naam is verplicht.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Geldig e-mailadres is verplicht.'
  }
  if (!phone) errors.phone = 'Telefoon is verplicht.'
  if (!requestType) errors.requestType = 'Type aanvraag is verplicht.'
  if (!description) errors.description = 'Omschrijving is verplicht.'

  const { error: photoError, attachments } = parsePhotos(body.photos || body.attachments)

  if (photoError) errors.photos = photoError

  return {
    errors,
    data: {
      name,
      email,
      phone,
      requestType,
      description,
      company,
      location,
      sourcePage,
      attachments,
    },
  }
}

function fromAddress(env) {
  return (
    env.RESEND_FROM_EMAIL ||
    'Duurzaam Metaal Recycling <website@duurzaammetaalrecycling.nl>'
  )
}

async function handleContact(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || ''

  if (!checkRateLimit(ip)) {
    return json(
      request,
      {
        ok: false,
        error: 'RATE_LIMITED',
        message: 'Te veel verzoeken. Probeer het over een minuut opnieuw.',
      },
      429
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return validationError(request, 'Ongeldige JSON body.')
  }

  const { errors, data } = validateContactPayload(body)
  if (Object.keys(errors).length) {
    const first = Object.values(errors)[0]
    return validationError(request, first || 'Validatie mislukt.', errors)
  }

  const turnstile = await verifyTurnstile(
    body.turnstileToken || body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    ip
  )
  if (!turnstile.ok) {
    return json(
      request,
      {
        ok: false,
        error: 'TURNSTILE_FAILED',
        message: turnstile.message,
      },
      403
    )
  }

  const submittedAt = new Date().toLocaleString('nl-NL', {
    timeZone: 'Europe/Amsterdam',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const sourcePage =
    data.sourcePage ||
    request.headers.get('Referer') ||
    'https://duurzaammetaalrecycling.nl/contact.html'

  const business = buildBusinessEmail({
    data,
    sourcePage,
    submittedAt,
  })

  const mail = await sendResendEmail({
    apiKey: env.RESEND_API_KEY,
    from: fromAddress(env),
    to: env.CONTACT_EMAIL || 'info@duurzaammetaalrecycling.nl',
    replyTo: data.email,
    subject: business.subject,
    text: business.text,
    html: business.html,
    attachments: data.attachments,
  })

  if (!mail.ok) {
    return json(
      request,
      {
        ok: false,
        error: mail.error || 'MAIL_SEND_FAILED',
        message: mail.message || 'E-mail verzenden mislukt.',
      },
      mail.configured === false ? 503 : 502
    )
  }

  // Confirmation only after business mail succeeded
  const confirm = buildCustomerConfirmation({
    name: data.name,
    requestType: data.requestType,
  })
  const confirmResult = await sendResendEmail({
    apiKey: env.RESEND_API_KEY,
    from: fromAddress(env),
    to: data.email,
    subject: confirm.subject,
    text: confirm.text,
    html: confirm.html,
  })
  if (!confirmResult.ok) {
    console.error('[contact] confirmation mail failed', confirmResult.error)
  }

  return json(request, { ok: true, message: 'Aanvraag ontvangen.' })
}

/**
 * Apply cache + build headers to static asset responses.
 * HTML: revalidate. Hashed /assets/*: immutable. Images: short cache + revalidate.
 */
function withCacheHeaders(request, response) {
  const url = new URL(request.url)
  const path = url.pathname
  const headers = new Headers(response.headers)
  const contentType = (headers.get('Content-Type') || '').toLowerCase()

  headers.set('X-DMR-Build', BUILD.commit)
  headers.set('X-DMR-Built-At', BUILD.builtAt)

  const isHtml =
    contentType.includes('text/html') ||
    path.endsWith('.html') ||
    path === '/' ||
    (!path.includes('.') && !path.startsWith('/api/'))

  const isHashedAsset =
    path.startsWith('/assets/') &&
    /-[A-Za-z0-9_-]{6,}\.(js|css|woff2?|ttf|otf)$/i.test(path)

  const isMutableImage =
    /\.(jpe?g|png|webp|gif|svg|ico|avif)$/i.test(path) && !isHashedAsset

  const isMeta =
    path === '/robots.txt' ||
    path === '/sitemap.xml' ||
    path === '/_headers' ||
    path === '/favicon.png'

  if (isHtml || isMeta) {
    headers.set('Cache-Control', 'no-cache, must-revalidate')
    headers.set('CDN-Cache-Control', 'no-cache')
  } else if (isHashedAsset) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (isMutableImage) {
    headers.set('Cache-Control', 'public, max-age=86400, must-revalidate')
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

async function serveStatic(request, env) {
  if (!env.ASSETS) {
    return json(request, { ok: false, error: 'Not found' }, 404)
  }
  const response = await env.ASSETS.fetch(request)
  return withCacheHeaders(request, response)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (
      url.hostname === 'www.duurzaammetaalrecycling.nl' &&
      (request.method === 'GET' || request.method === 'HEAD') &&
      !url.pathname.startsWith('/api/')
    ) {
      url.hostname = 'duurzaammetaalrecycling.nl'
      return Response.redirect(url.toString(), 301)
    }

    if (!url.pathname.startsWith('/api/')) {
      return serveStatic(request, env)
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) })
    }

    if (
      request.method === 'GET' &&
      (url.pathname === '/api/health' || url.pathname === '/api/version')
    ) {
      return json(request, {
        ok: true,
        service: 'duurzaammetaalrecycling',
        worker: 'metaalrecycling',
        commit: BUILD.commit,
        builtAt: BUILD.builtAt,
        routes: ['POST /api/contact', 'GET /api/version'],
        emailConfigured: Boolean(env.RESEND_API_KEY),
        fromConfigured: Boolean(env.RESEND_FROM_EMAIL || true),
        turnstileConfigured: Boolean(env.TURNSTILE_SECRET_KEY),
        contactEmail: env.CONTACT_EMAIL || 'info@duurzaammetaalrecycling.nl',
      })
    }

    if (
      request.method === 'POST' &&
      (url.pathname === '/api/contact' || url.pathname === '/api/request')
    ) {
      return handleContact(request, env)
    }

    return json(request, { ok: false, error: 'Not found' }, 404)
  },
}
