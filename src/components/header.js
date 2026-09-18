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

export function Navbar({ pageId = 'home' } = {}) {
  return `
    <header class="site-header" id="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="/" aria-label="${site.name} — naar home">
          <img
            class="brand__logo"
            src="${site.assets.logoHeader}"
            alt="${site.name}"
            width="480"
            height="96"
            decoding="async"
          />
        </a>

        <nav class="nav nav--desktop" aria-label="Hoofdnavigatie">
          ${navLinks(pageId)}
        </nav>

        <div class="site-header__actions">
          ${Button({
            href: '/contact.html?type=Metaal%20aanbieden',
            label: 'Metaal aanbieden',
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
          <a class="brand brand--mobile" href="/">
            <img
              class="brand__logo brand__logo--mobile"
              src="${site.assets.logoHeader}"
              alt="${site.name}"
              width="360"
              height="72"
              decoding="async"
            />
          </a>
          <button class="nav-toggle nav-toggle--close" type="button" aria-label="Menu sluiten">
            ${icons.close}
          </button>
        </div>
        <nav aria-label="Mobiel menu">
          ${navLinks(pageId, 'mobile-menu__list', { mobile: true })}
        </nav>
        <div class="mobile-menu__cta">
          ${Button({
            href: '/contact.html?type=Metaal%20aanbieden',
            label: 'Metaal aanbieden',
            variant: 'primary',
            size: 'lg',
          })}
          ${Button({
            href: phoneHref(),
            label: phoneLabel(),
            variant: 'secondary',
            size: 'lg',
            icon: icons.phone,
          })}
          ${Button({
            href: emailHref(),
            label: emailLabel(),
            variant: 'secondary',
            size: 'lg',
            icon: icons.mail,
          })}
        </div>
      </div>
    </div>
  `
}
