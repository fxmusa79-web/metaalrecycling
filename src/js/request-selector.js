import { site } from '../config/site.js'
import { getSelectedPhotos, initPhotoUploads } from './photos.js'

const typeMap = {
  metaal: 'Metaal aanbieden',
  machine: 'Machine / installatie',
  demontage: 'Demontage & sloop',
  ander: 'Ander verzoek',
}

export function initRequestSelector() {
  const form = document.getElementById('interactive-request-form')
  const kindInput = document.getElementById('request-kind')
  const options = document.querySelectorAll('[data-request]')
  const panels = document.querySelectorAll('[data-panel]')
  const error = document.getElementById('request-form-error')
  if (!form || !options.length) return

  initPhotoUploads(form)

  const activate = (id) => {
    const wasHidden = form.hidden

    options.forEach((btn) => {
      const active = btn.dataset.request === id
      btn.classList.toggle('is-active', active)
      btn.setAttribute('aria-selected', String(active))
    })

    panels.forEach((panel) => {
      const active = panel.dataset.panel === id
      panel.hidden = !active
      panel.querySelectorAll('input, textarea, select').forEach((field) => {
        if (field.type === 'hidden') return
        field.disabled = !active
      })
    })

    form.hidden = false
    if (kindInput) kindInput.value = id
    error.hidden = true

    if (wasHidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const start = 0
      const end = form.scrollHeight
      form.style.overflow = 'hidden'
      form.style.height = `${start}px`
      form.style.opacity = '0.35'
      requestAnimationFrame(() => {
        form.style.transition = 'height 0.35s ease, opacity 0.28s ease'
        form.style.height = `${end}px`
        form.style.opacity = '1'
        const done = () => {
          form.style.height = ''
          form.style.overflow = ''
          form.style.transition = ''
          form.removeEventListener('transitionend', done)
        }
        form.addEventListener('transitionend', done)
      })
    }
  }

  options.forEach((btn) => {
    btn.addEventListener('click', () => activate(btn.dataset.request))
  })

  // Disable all panel fields initially
  panels.forEach((panel) => {
    panel.querySelectorAll('input, textarea, select').forEach((field) => {
      field.disabled = true
    })
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const kind = kindInput?.value
    if (!kind) {
      error.hidden = false
      error.textContent = 'Kies eerst een type verzoek.'
      return
    }

    const activePanel = form.querySelector(`[data-panel="${kind}"]`)
    if (!activePanel) return

    const fields = [...activePanel.querySelectorAll('input, textarea, select')].filter(
      (field) => !field.disabled
    )

    for (const field of fields) {
      if (field.type === 'radio') continue
      if (field.type === 'file') continue
      if (!field.checkValidity()) {
        field.reportValidity()
        return
      }
    }

    const data = new FormData()
    fields.forEach((field) => {
      if (field.type === 'radio' && !field.checked) return
      if (field.name) data.append(field.name, field.value)
    })

    const photos = getSelectedPhotos(activePanel)
    const typeLabel = typeMap[kind] || kind
    const lines = [`Type: ${typeLabel}`, '']
    for (const [key, value] of data.entries()) {
      if (!value) continue
      lines.push(`${key}: ${value}`)
    }
    if (photos.length) {
      lines.push('')
      lines.push(`Foto’s geselecteerd: ${photos.length}. Voeg deze handmatig toe aan de e-mail.`)
    }
    lines.push('', '—', 'Aanvraag via duurzaammetaalrecycling.nl')

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Aanvraag: ${typeLabel}`
    )}&body=${encodeURIComponent(lines.join('\n'))}`
  })
}
