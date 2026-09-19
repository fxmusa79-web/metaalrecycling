import {
  site,
  navigation,
  moreNav,
  phoneHref,
  emailHref,
  phoneLabel,
  emailLabel,
  isActivePage,
} from '../config/site.js'
import { icons } from './icons.js'
import { Button } from './ui.js'

function navLinks(pageId, className = 'nav__list', { mobile = false } = {}) {
  const items = navigation
    .map((item) => {
      const active = isActivePage(pageId, item.id)
      return `
        <li>
          <a class="nav__link${active ? ' is-active' : ''}" href="${item.href}"${active ? ' aria-current="page"' : ''}>${item.label}</a>
        </li>`
    })
    .join('')

  const moreItems = moreNav
    .map(
      (item) => `
      <li>
        <a class="nav__link${isActivePage(pageId, item.id) ? ' is-active' : ''}" href="${item.href}">${item.label}</a>
      </li>`
    )
    .join('')

  // Mobile: include FAQ. Desktop: keep primary nav only (no “Meer”).
  if (mobile) {
    return `
      <ul class="${className}">
        ${items}
        ${moreItems}
      </ul>
    `
  }

  return `
    <ul class="${className}">
      ${items}
    </ul>
  `
}

export function TopBar() {
  return `
    <div class="topbar">
      <div class="container topbar__inner">
        <p class="topbar__trust">${site.trustLine}</p>
        <div class="topbar__contacts">
          <a class="topbar__link" href="${phoneHref()}">
            ${icons.phone}
            <span>${phoneLabel()}</span>
          </a>
          <a class="topbar__link topbar__link--email" href="${emailHref()}">
            ${icons.mail}
            <span class="topbar__email-full">${emailLabel()}</span>
            <span class="topbar__email-short">E-mail</span>
          </a>
        </div>
      </div>
    </div>
  `
}

/**
 * Brand mark markup.
 * Standard PNG is the active header logo.
 * Round emblem stays in the DOM (hidden) for reversible HEADER_ROUND_LOGO toggle.
 */
function BrandMark({ mobile = false } = {}) {
  const standardClass = mobile
    ? 'brand__logo site-logo-standard brand__logo--wordmark brand__logo--mobile'
    : 'brand__logo site-logo-standard brand__logo--wordmark'
  const roundClass = mobile
    ? 'brand__logo brand__logo--round brand__logo--round-mobile'
    : 'brand__logo brand__logo--round'
  const brandClass = mobile ? 'brand brand--mobile' : 'brand'

  return `
    <a class="${brandClass}" href="/" aria-label="${site.name} — naar home">
      <img
        class="${standardClass}"
        src="${site.assets.logoHeader}"
        alt="${site.name}"
        width="2172"
        height="724"
        decoding="async"
      />
      <!-- Round emblem: inactive unless HEADER_ROUND_LOGO === true -->
      <img
        class="${roundClass}"
        src="${site.assets.logoRound}"
        alt=""
        width="512"
        height="512"
        decoding="async"
        aria-hidden="true"
      />
    </a>
  `
}

export function Navbar({ pageId = 'home' } = {}) {
  return `
    <header class="site-header" id="site-header">
      <div class="container site-header__inner">
        ${BrandMark()}

        <nav class="nav nav--desktop" aria-label="Hoofdnavigatie">
          ${navLinks(pageId)}
        </nav>

        <div class="site-header__actions">
          ${Button({
            href: '/#aanvraag',
            label: 'Aanvraag',
            variant: 'primary',
            size: 'sm',
          })}
          <button
            class="nav-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Menu openen"
          >
            ${icons.menu}
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu" hidden>
      <div class="mobile-menu__panel">
        <div class="mobile-menu__top">
          ${BrandMark({ mobile: true })}
          <button class="nav-toggle nav-toggle--close" type="button" aria-label="Menu sluiten">
            ${icons.close}
          </button>
        </div>
        <nav aria-label="Mobiel menu">
          ${navLinks(pageId, 'mobile-menu__list', { mobile: true })}
        </nav>
        <div class="mobile-menu__cta">
          ${Button({
            href: '/#aanvraag',
            label: 'Aanvraag',
            variant: 'primary',
            size: 'lg',
          })}
          <a class="text-link" href="${phoneHref()}">${icons.phone}<span>${phoneLabel()}</span></a>
          <a class="text-link" href="${emailHref()}">${icons.mail}<span>${emailLabel()}</span></a>
        </div>
      </div>
    </div>
  `
}
