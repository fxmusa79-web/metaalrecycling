/**
 * Cloudflare Worker API scaffold for Duurzaam Metaal Recycling.
 *
 * Routes (placeholders):
 *   POST /api/contact
 *   POST /api/request
 *
 * Secrets are injected via Wrangler / Cloudflare dashboard — never hardcode them.
 * Turnstile verification and email delivery are modular stubs until configured.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://duurzaammetaalrecycling.nl',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
}

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

/**
 * Verify Cloudflare Turnstile token when TURNSTILE_SECRET_KEY is configured.
 * Returns { ok: true } when secret is missing (dev) or verification succeeds.
 */
async function verifyTurnstile(token, secret, ip) {
  if (!secret) {
    return { ok: true, skipped: true }
  }
  if (!token) {
    return { ok: false, error: 'Turnstile token ontbreekt.' }
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
    return { ok: false, error: 'Turnstile-verificatie mislukt.' }
  }
  return { ok: true }
}

/**
 * Send transactional email via Resend when RESEND_API_KEY is set.
 * Does not fake success when the key is missing.
 */
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
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim()
  const phone = String(body.phone || '').trim()
  const requestType = String(body.requestType || body.type || '').trim()
  const description = String(body.description || body.message || '').trim()
  const company = String(body.company || '').trim()
  const location = String(body.location || '').trim()

  if (!name) errors.name = 'Naam is verplicht.'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Geldig e-mailadres is verplicht.'
  }
  if (!phone) errors.phone = 'Telefoon is verplicht.'
  if (!requestType) errors.requestType = 'Type aanvraag is verplicht.'
  if (!description) errors.description = 'Omschrijving is verplicht.'

  return {
    errors,
    data: { name, email, phone, requestType, description, company, location },
  }
}

async function handleContact(request, env) {
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

  const ip = request.headers.get('CF-Connecting-IP') || ''
  const turnstile = await verifyTurnstile(
    body.turnstileToken || body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    ip
  )
  if (!turnstile.ok) {
    return badRequest(turnstile.error)
  }

  const text = [
    `Nieuwe aanvraag via website`,
    ``,
    `Naam: ${data.name}`,
    `Bedrijf: ${data.company || '—'}`,
    `Telefoon: ${data.phone}`,
    `E-mail: ${data.email}`,
    `Type: ${data.requestType}`,
    `Locatie: ${data.location || '—'}`,
    ``,
    `Omschrijving:`,
    data.description,
    ``,
    `Let op: foto-uploads gaan niet via deze JSON-route.`,
    `Gebruik aparte storage / e-mailbijlage wanneer beschikbaar.`,
  ].join('\n')

  const mail = await sendEmail({
    apiKey: env.RESEND_API_KEY,
    to: env.CONTACT_EMAIL || 'info@duurzaammetaalrecycling.nl',
    replyTo: data.email,
    subject: `Aanvraag: ${data.requestType} — ${data.name}`,
    text,
  })

  if (!mail.ok) {
    return json(
      {
        ok: false,
        received: true,
        email: mail,
        message:
          'Aanvraag ontvangen door de API, maar e-mailverzending is nog niet actief of is mislukt.',
      },
      mail.configured ? 502 : 503
    )
  }

  return json({ ok: true, message: 'Aanvraag verstuurd.' })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/api/health')) {
      return json({
        ok: true,
        service: 'duurzaammetaalrecycling-api',
        routes: ['POST /api/contact', 'POST /api/request'],
      })
    }

    if (request.method === 'POST' && (url.pathname === '/api/contact' || url.pathname === '/api/request')) {
      return handleContact(request, env)
    }

    return json({ ok: false, error: 'Not found' }, 404)
  },
}
