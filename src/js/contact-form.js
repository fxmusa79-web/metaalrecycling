import { site } from '../config/site.js'
import { getSelectedPhotos, initPhotoUploads } from './photos.js'

function showError(el, message) {
  if (!el) return
  el.hidden = !message
  el.textContent = message || ''
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function apiBase() {
  return (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '')
}

export function initContactForm() {
  const form = document.getElementById('request-form')
  if (!form) return

  initPhotoUploads(form)

  const typeSelect = form.querySelector('#request-type')
  const otherWrap = form.querySelector('#request-other-wrap')
  const otherInput = form.querySelector('#request-other')
  const formError = form.querySelector('#request-form-error')
  const formSuccess = form.querySelector('#request-form-success')

  const params = new URLSearchParams(window.location.search)
  const presetType = params.get('type')
  if (presetType && typeSelect) {
    const match = [...typeSelect.options].find((opt) => opt.value === presetType)
    if (match) typeSelect.value = presetType
  }

  const syncOther = () => {
    const isOther = typeSelect?.value === 'Ander verzoek'
    otherWrap?.classList.toggle('is-hidden', !isOther)
    if (otherInput) otherInput.required = Boolean(isOther)
    if (!isOther && otherInput) otherInput.value = ''
  }

  typeSelect?.addEventListener('change', syncOther)
  syncOther()

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    showError(formError, '')
    if (formSuccess) formSuccess.hidden = true

    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const email = String(data.get('email') || '').trim()
    const type = String(data.get('type') || '').trim()
    const other = String(data.get('other') || '').trim()
    const message = String(data.get('message') || '').trim()
    const location = String(data.get('location') || '').trim()
    const company = String(data.get('company') || '').trim()
    const privacy = form.querySelector('#request-privacy')?.checked

    let valid = true
    const setFieldError = (key, msg) => {
      showError(form.querySelector(`[data-error-for="${key}"]`), msg)
      if (msg) valid = false
    }

    setFieldError('name', name ? '' : 'Vul uw naam in.')
    setFieldError('phone', phone ? '' : 'Vul een telefoonnummer in.')
    setFieldError(
      'email',
      email ? (validateEmail(email) ? '' : 'Vul een geldig e-mailadres in.') : 'Vul een e-mailadres in.'
    )
    setFieldError('type', type ? '' : 'Kies een type aanvraag.')
    setFieldError('other', type === 'Ander verzoek' && !other ? 'Omschrijf uw verzoek.' : '')
    setFieldError('message', message ? '' : 'Vul een omschrijving in.')
    setFieldError('privacy', privacy ? '' : 'Bevestig de privacyverklaring.')

    if (!valid) {
      showError(formError, 'Controleer de gemarkeerde velden.')
      return
    }

    const photos = getSelectedPhotos(form)
    const requestType = type === 'Ander verzoek' && other ? `${type}: ${other}` : type
    const payload = {
      name,
      company,
      phone,
      email,
      requestType,
      location,
      description: message,
      photoCount: photos.length,
      turnstileToken: String(data.get('cf-turnstile-response') || data.get('turnstileToken') || ''),
    }

    const endpoint = `${apiBase()}/api/contact`
    const submitBtn = form.querySelector('[type="submit"]')
    if (submitBtn) submitBtn.disabled = true

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        form.reset()
        syncOther()
        if (formSuccess) {
          formSuccess.hidden = false
          formSuccess.textContent =
            photos.length > 0
              ? 'Aanvraag verstuurd. Voeg geselecteerde foto’s eventueel nog per e-mail toe.'
              : 'Aanvraag verstuurd. Wij nemen contact met u op.'
        }
        return
      }

      if (res.status === 404 || res.status === 503 || res.status >= 500) {
        openMailtoFallback({ requestType, company, location, name, phone, email, message, photos })
        return
      }

      const err = await res.json().catch(() => ({}))
      showError(formError, err.error || 'Verzenden mislukt. Probeer opnieuw of bel ons.')
    } catch {
      openMailtoFallback({ requestType, company, location, name, phone, email, message, photos })
    } finally {
      if (submitBtn) submitBtn.disabled = false
    }
  })
}

function openMailtoFallback({ requestType, company, location, name, phone, email, message, photos }) {
  const subject = encodeURIComponent(`Aanvraag via website: ${requestType}`)
  const body = encodeURIComponent(
    [
      `Type aanvraag: ${requestType}`,
      company ? `Bedrijf: ${company}` : null,
      location ? `Locatie: ${location}` : null,
      '',
      `Naam: ${name}`,
      `Telefoon: ${phone}`,
      `E-mail: ${email}`,
      '',
      'Omschrijving:',
      message,
      '',
      photos.length
        ? `Foto’s geselecteerd in het formulier: ${photos.length}. Voeg deze handmatig toe aan deze e-mail.`
        : 'Geen foto’s geselecteerd.',
      '',
      '—',
      'Verzoek via duurzaammetaalrecycling.nl',
    ]
      .filter((line) => line !== null)
      .join('\n')
  )

  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
}
