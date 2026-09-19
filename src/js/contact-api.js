/** Shared contact / request API helpers */

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

export const SUCCESS_TITLE = 'Aanvraag ontvangen'
export const SUCCESS_TEXT =
  'Bedankt. We hebben uw aanvraag ontvangen en nemen contact met u op.'
