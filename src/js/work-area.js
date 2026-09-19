const STORAGE_KEY = 'dmr_project_location'

export function getStoredProjectLocation() {
  try {
    return String(sessionStorage.getItem(STORAGE_KEY) || '').trim()
  } catch {
    return ''
  }
}

export function setStoredProjectLocation(value) {
  const cleaned = String(value || '').trim()
  try {
    if (cleaned) sessionStorage.setItem(STORAGE_KEY, cleaned)
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore quota / private mode */
  }
  return cleaned
}

/** Prefill every location field in the interactive request form */
export function applyProjectLocationToRequestForm(location) {
  const value = String(location || '').trim()
  if (!value) return

  const form = document.getElementById('interactive-request-form')
  if (!form) return

  form.querySelectorAll('[name="locatie"]').forEach((field) => {
    field.value = value
  })

  const contactLocation = document.getElementById('request-location')
  if (contactLocation) contactLocation.value = value
}

function scrollToRequest() {
  const target = document.getElementById('aanvraag')
  if (!target) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

export function initWorkArea() {
  const form = document.getElementById('location-check-form')
  if (!form) return

  const input = document.getElementById('location-check-input')
  const error = document.getElementById('location-check-error')
  const result = document.getElementById('location-check-result')
  const valueEl = form.querySelector('[data-location-value]')
  const cta = form.querySelector('[data-location-cta]')
  const discuss = document.querySelector('[data-location-discuss]')

  const showError = (message) => {
    if (!error) return
    error.hidden = !message
    error.textContent = message || ''
  }

  const showResult = (location) => {
    if (!result) return
    if (valueEl) valueEl.textContent = location
    result.hidden = false
  }

  /* Restore previous check in this session */
  const existing = getStoredProjectLocation()
  if (existing && input) {
    input.value = existing
    showResult(existing)
    applyProjectLocationToRequestForm(existing)
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    showError('')

    const location = String(input?.value || '').trim()
    if (!location) {
      showError('Vul een plaats of postcode in.')
      input?.focus()
      return
    }

    setStoredProjectLocation(location)
    applyProjectLocationToRequestForm(location)
    showResult(location)
  })

  cta?.addEventListener('click', (event) => {
    event.preventDefault()
    const location =
      getStoredProjectLocation() || String(input?.value || '').trim()
    if (location) {
      setStoredProjectLocation(location)
      applyProjectLocationToRequestForm(location)
    }
    if (window.location.hash !== '#aanvraag') {
      history.pushState(null, '', '#aanvraag')
    }
    scrollToRequest()
  })

  discuss?.addEventListener('click', (event) => {
    event.preventDefault()
    const location = String(input?.value || '').trim() || getStoredProjectLocation()
    if (location) {
      setStoredProjectLocation(location)
      applyProjectLocationToRequestForm(location)
    }
    if (window.location.hash !== '#aanvraag') {
      history.pushState(null, '', '#aanvraag')
    }
    scrollToRequest()
  })
}
