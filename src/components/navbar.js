import { site, phoneHref, phoneLabel } from '../config/site.js'
import { icons } from './icons.js'
import { Button } from './ui.js'

const navItems = [
  { label: 'Home', href: '#top', active: true },
  { label: 'Metaal inkoop', href: '#inkoop' },
  { label: 'Recycling', href: '#recycling' },
  { label: 'Demontage & sloop', href: '#demontage' },
  { label: 'Materialen', href: '#materialen' },
  { label: 'Werkgebied', href: '#werkgebied' },
  { label: 'Over ons', href: '#over-ons' },
  { label: 'Contact', href: '#contact' },
]

function navLinks(className = 'nav__list') {
  return `
    <ul class="${className}">
      ${navItems
        .map(
          (item) => `
        <li>
          <a class="nav__link${item.active ? ' is-active' : ''}" href="${item.href}">${item.label}</a>
        </li>`
        )
        .join('')}
    </ul>
  `
}

export function Navbar() {
  return `
    <header class="site-header" id="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="#top" aria-label="${site.name} — naar home">
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
          ${navLinks()}
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
          <a class="brand brand--mobile" href="#top">
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
          ${navLinks('mobile-menu__list')}
        </nav>
        <div class="mobile-menu__cta">
          ${Button({
            href: '/#aanvraag',
            label: 'Aanvraag',
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
        </div>
      </div>
    </div>
  `
}
