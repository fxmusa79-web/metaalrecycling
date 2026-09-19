/** Shared contact / request API helpers */

export const MAX_PHOTOS = 6
export const MAX_PHOTO_MB = 5
export const MAX_TOTAL_PHOTO_MB = 15
export const ALLOWED_PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export function apiBase() {
  return (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')
}

export function turnstileSiteKey() {
  return String(import.meta.env.VITE_TURNSTILE_SITE_KEY || '').trim()
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function photosMetadata(files) {
  return files.map((file) => ({
    name: file.name,
    size: file.size,
    type: file.type || 'image/*',
  }))
}

/**
 * Convert File objects to Resend-ready base64 attachments.
 */
export async function filesToAttachments(files) {
  const attachments = []
  for (const file of files) {
    const dataUrl = await readAsDataUrl(file)
    const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl
    attachments.push({
      filename: file.name,
      name: file.name,
      type: file.type || 'image/jpeg',
      content: base64,
      size: file.size,
    })
  }
  return attachments
}

function readAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(reader.error || new Error('Bestand lezen mislukt'))
    reader.readAsDataURL(file)
  })
}

/**
 * Client-side photo validation (Dutch messages). Server re-validates.
 */
export function validatePhotos(files) {
  if (!files.length) return { ok: true, message: '' }

  if (files.length > MAX_PHOTOS) {
    return { ok: false, message: `U kunt maximaal ${MAX_PHOTOS} foto’s toevoegen.` }
  }

  let total = 0
  for (const file of files) {
    const type = (file.type || '').toLowerCase()
    if (type) {
      const normalized = type === 'image/jpg' ? 'image/jpeg' : type
      if (!ALLOWED_PHOTO_TYPES.has(normalized)) {
        return {
          ok: false,
          message: `${file.name}: alleen JPG, PNG of WEBP zijn toegestaan.`,
        }
      }
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      return {
        ok: false,
        message: `${file.name} is te groot (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum is ${MAX_PHOTO_MB} MB per foto.`,
      }
    }
    total += file.size
  }

  if (total > MAX_TOTAL_PHOTO_MB * 1024 * 1024) {
    return {
      ok: false,
      message: `De totale fotogrootte mag maximaal ${MAX_TOTAL_PHOTO_MB} MB zijn.`,
    }
  }

  return { ok: true, message: '' }
}

/**
 * Load Turnstile script once and render a widget into `container`.
 * Returns a function that reads the current token.
 */
export function mountTurnstile(container) {
  const siteKey = turnstileSiteKey()
  if (!siteKey || !container) {
    return () => ''
  }

  container.hidden = false
  container.innerHTML = '<div class="cf-turnstile" data-turnstile-host></div>'
  const host = container.querySelector('[data-turnstile-host]')

  const ensureScript = () =>
    new Promise((resolve) => {
      if (window.turnstile) {
        resolve(window.turnstile)
        return
      }
      const existing = document.querySelector('script[data-turnstile]')
      if (existing) {
        existing.addEventListener('load', () => resolve(window.turnstile), { once: true })
        return
      }
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.dataset.turnstile = '1'
      script.addEventListener('load', () => resolve(window.turnstile), { once: true })
      document.head.appendChild(script)
    })

  let widgetId = null
  ensureScript().then((turnstile) => {
    if (!turnstile || !host) return
    widgetId = turnstile.render(host, {
      sitekey: siteKey,
      theme: 'light',
      size: 'flexible',
    })
  })

  return () => {
    if (widgetId != null && window.turnstile) {
      try {
        return window.turnstile.getResponse(widgetId) || ''
      } catch {
        return ''
      }
    }
    return ''
  }
}

export async function submitContact(payload) {
  const endpoint = `${apiBase()}/api/contact`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    data = {}
  }

  return { ok: res.ok, status: res.status, data }
}

/** Prefer structured API message, fall back to legacy `error` string. */
export function apiErrorMessage(data, fallback) {
  if (!data || typeof data !== 'object') return fallback
  if (typeof data.message === 'string' && data.message.trim()) return data.message
  if (typeof data.error === 'string' && data.error.trim() && !/^[A-Z_]+$/.test(data.error)) {
    return data.error
  }
  if (data.error === 'MAIL_NOT_CONFIGURED' || data.error === 'MAIL_FROM_MISSING') {
    return (
      data.message ||
      'De e-mailservice is nog niet geconfigureerd. Mail ons via info@duurzaammetaalrecycling.nl of bel ons.'
    )
  }
  if (data.error === 'MAIL_SEND_FAILED') {
    return data.message || 'E-mail verzenden mislukt. Probeer opnieuw of bel ons.'
  }
  if (data.error === 'TURNSTILE_FAILED') {
    return data.message || 'Robotcontrole mislukt. Probeer opnieuw.'
  }
  if (data.error === 'VALIDATION_ERROR') {
    return data.message || 'Controleer de ingevulde gegevens.'
  }
  if (data.error === 'RATE_LIMITED') {
    return data.message || 'Te veel verzoeken. Probeer het over een minuut opnieuw.'
  }
  return data.message || fallback
}

export const SUCCESS_TITLE = 'Aanvraag ontvangen'
export const SUCCESS_TEXT =
  'Bedankt. Uw aanvraag is verzonden. We nemen contact met u op.'
