/**
 * Cloudflare Worker API for Duurzaam Metaal Recycling.
 *
 * POST /api/contact — validate, Turnstile, rate-limit, email via Resend
 * Secrets (wrangler secret put): RESEND_API_KEY, TURNSTILE_SECRET_KEY
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://duurzaammetaalrecycling.nl',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
}

const MAX_FIELD = 4000
const MAX_NAME = 200
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 8

/** @type {Map<string, number[]>} */
const rateBuckets = new Map()

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...CORS_HEADERS,
      ...extraHeaders,
    },
  })
}

function badRequest(message, fields = {}) {
  return json({ ok: false, error: message, fields }, 400)
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
    return { ok: false, error: 'Bevestig dat u geen robot bent (Turnstile).' }
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
    return { ok: false, error: 'Turnstile-verificatie mislukt. Probeer opnieuw.' }
  }
  return { ok: true }
}

async function sendEmail({ apiKey, to, replyTo, subject, text }) {
  if (!apiKey) {
    return {
      ok: false,
      configured: false,
      error: 'E-mailservice is nog niet geconfigureerd (RESEND_API_KEY ontbreekt).',
    }
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Duurzaam Metaal Recycling <noreply@duurzaammetaalrecycling.nl>',
      to: [to],
      reply_to: replyTo || undefined,
      subject,
      text,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    return { ok: false, configured: true, error: 'E-mail verzenden mislukt.', detail }
  }

  return { ok: true, configured: true }
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

  if (!name) errors.name = 'Naam is verplicht.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Geldig e-mailadres is verplicht.'
  }
  if (!phone) errors.phone = 'Telefoon is verplicht.'
  if (!requestType) errors.requestType = 'Type aanvraag is verplicht.'
  if (!description) errors.description = 'Omschrijving is verplicht.'

  const photosRaw = Array.isArray(body.photosMetadata) ? body.photosMetadata : []
  const photosMetadata = photosRaw.slice(0, 12).map((item) => ({
    name: sanitize(item?.name, 180),
    size: Number(item?.size) || 0,
    type: sanitize(item?.type, 80),
  }))

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
      photosMetadata,
    },
  }
}

function formatPhotosBlock(photos) {
  if (!photos.length) return 'Foto’s: geen bestanden geselecteerd in het formulier.'
  const lines = photos.map(
    (p, i) =>
      `  ${i + 1}. ${p.name || 'bestand'} (${p.type || 'image'}, ${Math.round((p.size || 0) / 1024)} KB)`
  )
  return [
    `Foto’s geselecteerd in het formulier: ${photos.length}`,
    '(Bestanden worden nog niet als bijlage meegestuurd — metadata hieronder.)',
    ...lines,
  ].join('\n')
}

async function handleContact(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || ''

  if (!checkRateLimit(ip)) {
    return json({ ok: false, error: 'Te veel verzoeken. Probeer het over een minuut opnieuw.' }, 429)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return badRequest('Ongeldige JSON body.')
  }

  const { errors, data } = validateContactPayload(body)
  if (Object.keys(errors).length) {
    return badRequest('Validatie mislukt.', errors)
  }

  const turnstile = await verifyTurnstile(
    body.turnstileToken || body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    ip
  )
  if (!turnstile.ok) {
    return badRequest(turnstile.error)
  }

  const text = [
    'Nieuwe aanvraag via DuurzaamMetaalRecycling.nl',
    '',
    `Naam: ${data.name}`,
    `Bedrijf: ${data.company || '—'}`,
    `Telefoon: ${data.phone}`,
    `E-mail: ${data.email}`,
    `Type aanvraag: ${data.requestType}`,
    `Locatie: ${data.location || '—'}`,
    '',
    'Omschrijving:',
    data.description,
    '',
    formatPhotosBlock(data.photosMetadata),
  ].join('\n')

  const mail = await sendEmail({
    apiKey: env.RESEND_API_KEY,
    to: env.CONTACT_EMAIL || 'info@duurzaammetaalrecycling.nl',
    replyTo: data.email,
    subject: 'Nieuwe aanvraag via DuurzaamMetaalRecycling.nl',
    text,
  })

  if (!mail.ok) {
    return json(
      {
        ok: false,
        error: mail.error,
        email: { configured: mail.configured },
      },
      mail.configured ? 502 : 503
    )
  }

  return json({ ok: true, message: 'Aanvraag ontvangen.' })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (!url.pathname.startsWith('/api/')) {
      if (env.ASSETS) {
        return env.ASSETS.fetch(request)
      }
      return json({ ok: false, error: 'Not found' }, 404)
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    if (request.method === 'GET' && url.pathname === '/api/health') {
      return json({
        ok: true,
        service: 'duurzaammetaalrecycling',
        routes: ['POST /api/contact'],
        emailConfigured: Boolean(env.RESEND_API_KEY),
        turnstileConfigured: Boolean(env.TURNSTILE_SECRET_KEY),
      })
    }

    if (request.method === 'POST' && (url.pathname === '/api/contact' || url.pathname === '/api/request')) {
      return handleContact(request, env)
    }

    return json({ ok: false, error: 'Not found' }, 404)
  },
}
