import {
  mountTurnstile,
  photosMetadata,
  submitContact,
  SUCCESS_TEXT,
  SUCCESS_TITLE,
  validateEmail,
} from './contact-api.js'
import { getSelectedPhotos, initPhotoUploads } from './photos.js'
import { getStoredProjectLocation } from './work-area.js'

function showError(el, message) {
  if (!el) return
  el.hidden = !message
  el.textContent = message || ''
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
  const turnstileSlot = form.querySelector('[data-turnstile-slot]')
  const getTurnstileToken = mountTurnstile(turnstileSlot)

  const params = new URLSearchParams(window.location.search)
  const presetType = params.get('type')
  if (presetType && typeSelect) {
    const match = [...typeSelect.options].find((opt) => opt.value === presetType)
    if (match) typeSelect.value = presetType
  }

  const storedLocation = getStoredProjectLocation()
  if (storedLocation) {
    const locationField = form.querySelector('#request-location, [name="location"]')
    if (locationField && !locationField.value) locationField.value = storedLocation
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
      photosMetadata: photosMetadata(photos),
      photoCount: photos.length,
      turnstileToken: getTurnstileToken() || String(data.get('cf-turnstile-response') || ''),
    }

    const submitBtn = form.querySelector('[type="submit"]')
    if (submitBtn) submitBtn.disabled = true

    try {
      const { ok, status, data: resData } = await submitContact(payload)

      if (ok) {
        if (formSuccess) {
          formSuccess.hidden = false
          formSuccess.innerHTML = `<strong>${SUCCESS_TITLE}</strong><span>${SUCCESS_TEXT}</span>`
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
        form.querySelectorAll('input, textarea, select, button').forEach((el) => {
          if (el === submitBtn) return
          el.disabled = true
        })
        if (submitBtn) {
          submitBtn.disabled = true
          submitBtn.hidden = true
        }
        return
      }

      if (status === 503) {
        showError(
          formError,
          resData.error ||
            'De e-mailservice is nog niet geconfigureerd. Mail ons via info@duurzaammetaalrecycling.nl of bel ons.'
        )
        return
      }

      showError(formError, resData.error || 'Verzenden mislukt. Probeer opnieuw of bel ons.')
    } catch {
      showError(
        formError,
        'Verbinding mislukt. Controleer uw internetverbinding of mail ons via info@duurzaammetaalrecycling.nl.'
      )
    } finally {
      if (submitBtn && formSuccess?.hidden) submitBtn.disabled = false
    }
  })
}
