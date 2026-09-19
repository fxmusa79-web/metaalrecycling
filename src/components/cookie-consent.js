import {
  getConsent,
  acceptAll,
  acceptNecessaryOnly,
  saveConsent,
} from '../js/consent.js'

const CATEGORIES = [
  {
    id: 'necessary',
    title: 'Noodzakelijk',
    text: 'Vereist voor basiswerking van de website, zoals navigatie en beveiliging. Altijd actief.',
    locked: true,
  },
  {
    id: 'preferences',
    title: 'Voorkeuren',
    text: 'Onthoudt keuzes zoals locatie-invoer of weergavevoorkeuren, zodat u die niet opnieuw hoeft in te vullen.',
  },
  {
    id: 'analytics',
    title: 'Statistieken',
    text: 'Helpt ons begrijpen hoe de site wordt gebruikt, zodat we pagina’s en inhoud kunnen verbeteren.',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    text: 'Wordt gebruikt voor eventuele marketing- of remarketingdoeleinden. Standaard uitgeschakeld.',
  },
]

export function CookieConsentMarkup() {
  return `
    <div class="cookie-root" id="cookie-root" hidden>
      <div class="cookie-banner" id="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-banner-title" hidden>
        <div class="cookie-banner__inner">
          <div class="cookie-banner__copy">
            <p class="cookie-banner__eyebrow">Cookies</p>
            <h2 class="cookie-banner__title" id="cookie-banner-title">Cookievoorkeuren</h2>
            <p class="cookie-banner__text">
              We gebruiken cookies voor noodzakelijke sitefuncties. Optionele cookies
              voor voorkeuren, statistieken en marketing zetten we alleen aan met uw toestemming.
            </p>
          </div>
          <div class="cookie-banner__actions">
            <button type="button" class="btn btn--primary btn--sm" data-cookie-accept-all>
              Alles accepteren
            </button>
            <button type="button" class="btn btn--secondary btn--sm" data-cookie-necessary>
              Alleen noodzakelijk
            </button>
            <button type="button" class="cookie-banner__link" data-cookie-open-settings>
              Voorkeuren aanpassen
            </button>
          </div>
        </div>
      </div>

      <div class="cookie-overlay" id="cookie-overlay" hidden></div>

      <div
        class="cookie-panel"
        id="cookie-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-panel-title"
        hidden
      >
        <div class="cookie-panel__header">
          <h2 id="cookie-panel-title">Cookie-instellingen</h2>
          <button type="button" class="cookie-panel__close" data-cookie-close aria-label="Sluiten">
            ×
          </button>
        </div>
        <p class="cookie-panel__lead">
          Kies welke cookiecategorieën u wilt toestaan. Noodzakelijke cookies blijven altijd actief.
        </p>
        <ul class="cookie-panel__list">
          ${CATEGORIES.map(
            (cat) => `
            <li class="cookie-panel__item">
              <div class="cookie-panel__item-top">
                <span class="cookie-panel__item-title">${cat.title}</span>
                <label class="cookie-switch">
                  <input
                    type="checkbox"
                    data-cookie-cat="${cat.id}"
                    ${cat.locked ? 'checked disabled' : ''}
                  />
                  <span class="cookie-switch__ui" aria-hidden="true"></span>
                  <span class="visually-hidden">${cat.title}</span>
                </label>
              </div>
              <p>${cat.text}</p>
            </li>`
          ).join('')}
        </ul>
        <div class="cookie-panel__footer">
          <button type="button" class="btn btn--secondary btn--sm" data-cookie-close>
            Terug
          </button>
          <button type="button" class="btn btn--primary btn--sm" data-cookie-save>
            Voorkeuren opslaan
          </button>
        </div>
      </div>
    </div>
  `
}

export function initCookieConsent() {
  const root = document.getElementById('cookie-root')
  if (!root) return

  const banner = document.getElementById('cookie-banner')
  const panel = document.getElementById('cookie-panel')
  const overlay = document.getElementById('cookie-overlay')

  const show = (el) => {
    root.hidden = false
    if (el) el.hidden = false
  }

  const hide = (el) => {
    if (el) el.hidden = true
  }

  const syncToggles = () => {
    const consent = getConsent()
    panel.querySelectorAll('[data-cookie-cat]').forEach((input) => {
      const key = input.dataset.cookieCat
      if (key === 'necessary') {
        input.checked = true
        return
      }
      input.checked = Boolean(consent[key])
    })
  }

  const openSettings = () => {
    hide(banner)
    show(overlay)
    show(panel)
    syncToggles()
    panel.querySelector('[data-cookie-save]')?.focus()
  }

  const closeSettings = ({ restoreBanner = false } = {}) => {
    hide(panel)
    hide(overlay)
    if (restoreBanner && !getConsent().decided) {
      show(banner)
    } else if (getConsent().decided) {
      hide(banner)
      root.hidden = true
    }
  }

  const finish = () => {
    hide(banner)
    hide(panel)
    hide(overlay)
    root.hidden = true
  }

  root.querySelector('[data-cookie-accept-all]')?.addEventListener('click', () => {
    acceptAll()
    finish()
  })

  root.querySelector('[data-cookie-necessary]')?.addEventListener('click', () => {
    acceptNecessaryOnly()
    finish()
  })

  root.querySelectorAll('[data-cookie-open-settings]').forEach((btn) => {
    btn.addEventListener('click', openSettings)
  })

  root.querySelectorAll('[data-cookie-close]').forEach((btn) => {
    btn.addEventListener('click', () => closeSettings({ restoreBanner: !getConsent().decided }))
  })

  overlay?.addEventListener('click', () => closeSettings({ restoreBanner: !getConsent().decided }))

  root.querySelector('[data-cookie-save]')?.addEventListener('click', () => {
    const prefs = {}
    panel.querySelectorAll('[data-cookie-cat]').forEach((input) => {
      const key = input.dataset.cookieCat
      if (key === 'necessary') return
      prefs[key] = input.checked
    })
    saveConsent(prefs)
    finish()
  })

  document.querySelectorAll('[data-open-cookie-settings]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault()
      root.hidden = false
      openSettings()
    })
  })

  window.addEventListener('dmr:open-cookie-settings', () => {
    root.hidden = false
    openSettings()
  })

  if (!getConsent().decided) {
    show(banner)
  } else {
    root.hidden = true
  }
}
