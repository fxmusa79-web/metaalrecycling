import {
  site,
  phoneHref,
  emailHref,
  phoneLabel,
  emailLabel,
  mapsHref,
} from '../config/site.js'
import { icons } from './icons.js'
import { Button } from './ui.js'

export function Footer() {
  const year = new Date().getFullYear()
  const addressHtml = site.addressLines
    .map((line, index) =>
      index === 0
        ? `<a class="site-footer__address" href="${mapsHref()}" target="_blank" rel="noopener noreferrer">${line}</a>`
        : `<span>${line}</span>`
    )
    .join('<br />')

  return `
    <footer class="site-footer">
      <div class="container site-footer__cta-bar">
        <div>
          <h2 class="site-footer__cta-title">Metaal aanbieden of een project bespreken?</h2>
          <p>Stuur foto’s en een korte omschrijving voor een snellere beoordeling.</p>
        </div>
        ${Button({
          href: '/contact.html?type=Metaal%20aanbieden',
          label: 'Stuur een aanvraag',
          variant: 'primary',
          size: 'md',
        })}
      </div>

      <div class="container site-footer__grid">
        <div class="site-footer__brand">
          <a class="brand" href="/">
            <img
              class="brand__logo brand__logo--footer"
              src="${site.assets.logoHeader}"
              alt="${site.name}"
              width="400"
              height="80"
              loading="lazy"
              decoding="async"
            />
          </a>
          <p>
            Duurzaam Metaal Recycling is gespecialiseerd in metaal inkoop, recycling,
            demontage en het verwerken van uiteenlopende metalen materialen en objecten.
          </p>
        </div>

        <div>
          <h3 class="site-footer__heading">Diensten</h3>
          <ul class="site-footer__links">
            <li><a href="/metaal-inkoop.html">Metaal inkoop</a></li>
            <li><a href="/recycling.html">Recycling</a></li>
            <li><a href="/demontage.html">Demontage &amp; sloop</a></li>
            <li><a href="/demontage.html#brand-snijwerk">Brand- en snijwerk</a></li>
            <li><a href="/demontage.html">Machines</a></li>
            <li><a href="/materialen.html">Kabels &amp; transformatoren</a></li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__heading">Informatie</h3>
          <ul class="site-footer__links">
            <li><a href="/materialen.html">Materialen</a></li>
            <li><a href="/werkgebied.html">Werkgebied</a></li>
            <li><a href="/over-ons.html">Over ons</a></li>
            <li><a href="/faq.html">FAQ</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 class="site-footer__heading">Contact</h3>
          <div class="site-footer__contact-block">
            <p class="site-footer__company">${site.name}</p>
            <p class="site-footer__address-block">${addressHtml}</p>
            <ul class="site-footer__contact">
              <li>
                <a href="${phoneHref()}">${icons.phone}<span>${phoneLabel()}</span></a>
              </li>
              <li>
                <a href="${emailHref()}">${icons.mail}<span>${emailLabel()}</span></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="site-footer__bottom">
        <div class="container site-footer__bottom-inner">
          <p>© ${year} DuurzaamMetaalRecycling.nl</p>
          <ul class="site-footer__legal">
            <li><a href="/contact.html">Privacybeleid</a></li>
            <li><a href="/contact.html">Cookiebeleid</a></li>
            <li><a href="/contact.html">Algemene voorwaarden</a></li>
            <li><a href="/contact.html">Disclaimer</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `
}

export function StickyContactBar() {
  return `
    <div class="sticky-bar" id="sticky-bar" hidden>
      <a class="sticky-bar__btn" href="${phoneHref()}">${icons.phone}<span>Bel direct</span></a>
      <a class="sticky-bar__btn sticky-bar__btn--primary" href="/contact.html">${icons.mail}<span>Aanvraag</span></a>
      <button class="sticky-bar__close" type="button" aria-label="Sluit contactbalk">${icons.close}</button>
    </div>
  `
}

export function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gerrit Imbosstraat 60',
      postalCode: '9607 PE',
      addressLocality: 'Foxhol',
      addressCountry: 'NL',
    },
  }

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}
