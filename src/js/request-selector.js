import {
  mountTurnstile,
  photosMetadata,
  submitContact,
  validateEmail,
} from './contact-api.js'
import { getSelectedPhotos, initPhotoUploads } from './photos.js'

const TYPE_LABELS = {
  metaal: 'Metaal verkopen',
  machine: 'Machine / installatie',
  demontage: 'Demontage & sloop',
  kabels: 'Kabels / transformator',
  ander: 'Ander verzoek',
}

function buildDescription(kind, panel) {
  const get = (name) => {
    const el = panel.querySelector(`[name="${name}"]`)
    if (!el) return ''
    if (el.type === 'radio') {
      const checked = panel.querySelector(`[name="${name}"]:checked`)
      return checked ? checked.value.trim() : ''
    }
    return String(el.value || '').trim()
  }

  const lines = []
  const pairs = {
    metaal: [
      ['Materiaaltype', get('materiaal')],
      ['Hoeveelheid', get('hoeveelheid')],
      ['Locatie', get('locatie')],
      ['Omschrijving', get('message')],
    ],
    machine: [
      ['Soort', get('soort')],
      ['Afmetingen', get('afmetingen')],
      ['Locatie', get('locatie')],
      ['Demontage nodig', get('demontage_nodig')],
      ['Omschrijving', get('message')],
    ],
    demontage: [
      ['Type object', get('object')],
      ['Locatie', get('locatie')],
      ['Bereikbaarheid', get('bereikbaarheid')],
      ['Omschrijving', get('message')],
    ],
    kabels: [
      ['Soort materiaal', get('soort_materiaal')],
      ['Hoeveelheid', get('hoeveelheid')],
      ['Locatie', get('locatie')],
      ['Omschrijving', get('message')],
    ],
    ander: [
      ['Omschrijving', get('message')],
      ['Locatie', get('locatie')],
    ],
  }

  for (const [label, value] of pairs[kind] || []) {
    if (value) lines.push(`${label}: ${value}`)
  }

  return lines.join('\n') || 'Geen extra omschrijving.'
}

function getLocation(panel) {
  const el = panel.querySelector('[name="locatie"]')
  return el ? String(el.value || '').trim() : ''
}

export function initRequestSelector() {
  const form = document.getElementById('interactive-request-form')
  if (!form) return

  const kindInput = document.getElementById('request-kind')
  const options = form.querySelectorAll('[data-request]')
  const panels = form.querySelectorAll('[data-panel]')
  const steps = form.querySelectorAll('[data-step]')
  const error = document.getElementById('request-form-error')
  const fill = form.querySelector('[data-stepper-fill]')
  const label = form.querySelector('[data-stepper-label]')
  const backBtn = form.querySelector('[data-stepper-back]')
  const nextBtn = form.querySelector('[data-stepper-next]')
  const submitBtn = form.querySelector('[data-stepper-submit]')
  const nav = form.querySelector('[data-stepper-nav]')
  const success = form.querySelector('[data-request-success]')
  const turnstileSlot = form.querySelector('[data-turnstile-slot]')

  initPhotoUploads(form)
  const getTurnstileToken = mountTurnstile(turnstileSlot)

  let step = 1
  let kind = ''

  const showError = (message) => {
    if (!error) return
    error.hidden = !message
    error.textContent = message || ''
  }

  const setStep = (next) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    step = next

    steps.forEach((el) => {
      const n = Number(el.dataset.step)
      const active = n === step
      el.hidden = !active
      el.classList.toggle('is-active', active)
      if (active && !reduce) {
        el.style.opacity = '0'
        el.style.transform = 'translateY(8px)'
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 0.28s ease, transform 0.28s ease'
          el.style.opacity = '1'
          el.style.transform = 'none'
        })
      }
    })

    if (fill) fill.style.width = `${(step / 4) * 100}%`
    if (label) label.textContent = `Stap ${step} van 4`

    if (backBtn) backBtn.hidden = step <= 1
    if (nextBtn) nextBtn.hidden = step >= 4
    if (submitBtn) submitBtn.hidden = step !== 4
  }

  const activateKind = (id) => {
    kind = id
    if (kindInput) kindInput.value = id

    options.forEach((btn) => {
      const active = btn.dataset.request === id
      btn.classList.toggle('is-active', active)
      btn.setAttribute('aria-selected', String(active))
    })

    panels.forEach((panel) => {
      const active = panel.dataset.panel === id
      panel.hidden = !active
      panel.querySelectorAll('input, textarea, select').forEach((field) => {
        field.disabled = !active
      })
    })
  }

  options.forEach((btn) => {
    btn.addEventListener('click', () => {
      activateKind(btn.dataset.request)
      showError('')
      setStep(2)
    })
  })

  panels.forEach((panel) => {
    panel.querySelectorAll('input, textarea, select').forEach((field) => {
      field.disabled = true
    })
  })

  backBtn?.addEventListener('click', () => {
    showError('')
    if (step === 2) {
      setStep(1)
      return
    }
    setStep(Math.max(1, step - 1))
  })

  nextBtn?.addEventListener('click', () => {
    showError('')
    if (step === 1 && !kind) {
      showError('Kies eerst wat u wilt doen.')
      return
    }
    if (step === 2) {
      const panel = form.querySelector(`[data-panel="${kind}"]`)
      if (!panel) return
      const requiredish = panel.querySelector(
        kind === 'ander'
          ? '[name="message"]'
          : kind === 'metaal'
            ? '[name="materiaal"]'
            : kind === 'machine'
              ? '[name="soort"]'
              : kind === 'demontage'
                ? '[name="object"]'
                : '[name="soort_materiaal"]'
      )
      if (requiredish && !String(requiredish.value || '').trim()) {
        requiredish.focus()
        showError('Vul de belangrijkste gegevens in om verder te gaan.')
        return
      }
    }
    setStep(Math.min(4, step + 1))
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    showError('')

    if (!kind) {
      showError('Kies eerst wat u wilt doen.')
      setStep(1)
      return
    }

    const panel = form.querySelector(`[data-panel="${kind}"]`)
    const name = String(form.querySelector('[name="name"]')?.value || '').trim()
    const company = String(form.querySelector('[name="company"]')?.value || '').trim()
    const phone = String(form.querySelector('[name="phone"]')?.value || '').trim()
    const email = String(form.querySelector('[name="email"]')?.value || '').trim()
    const privacy = form.querySelector('#stepper-privacy')?.checked

    if (!name) {
      showError('Vul uw naam in.')
      return
    }
    if (!phone) {
      showError('Vul een telefoonnummer in.')
      return
    }
    if (!email || !validateEmail(email)) {
      showError('Vul een geldig e-mailadres in.')
      return
    }
    if (!privacy) {
      showError('Bevestig de privacyverklaring.')
      return
    }

    const photos = getSelectedPhotos(form)
    const requestType = TYPE_LABELS[kind] || kind
    const description = buildDescription(kind, panel)
    const location = getLocation(panel)

    const payload = {
      name,
      company,
      phone,
      email,
      requestType,
      location,
      description,
      photosMetadata: photosMetadata(photos),
      photoCount: photos.length,
      turnstileToken: getTurnstileToken(),
    }

    if (submitBtn) submitBtn.disabled = true

    try {
      const { ok, status, data } = await submitContact(payload)

      if (ok) {
        if (nav) nav.hidden = true
        if (label) label.hidden = true
        if (fill?.parentElement) fill.parentElement.hidden = true
        steps.forEach((el) => {
          el.hidden = true
        })
        if (success) success.hidden = false
        return
      }

      if (status === 503) {
        showError(
          data.error ||
            'De e-mailservice is nog niet geconfigureerd. Mail ons via info@duurzaammetaalrecycling.nl of bel ons.'
        )
        return
      }

      showError(data.error || 'Verzenden mislukt. Probeer opnieuw of bel ons.')
    } catch {
      showError(
        'Verbinding mislukt. Controleer uw internetverbinding of mail ons via info@duurzaammetaalrecycling.nl.'
      )
    } finally {
      if (submitBtn) submitBtn.disabled = false
    }
  })

  setStep(1)
}
