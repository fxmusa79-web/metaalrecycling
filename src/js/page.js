import { TopBar, Navbar } from '../components/header.js'
import { Footer, StickyContactBar, WhatsAppFloat } from '../components/footer.js'
import { CookieConsentMarkup, initCookieConsent } from '../components/cookie-consent.js'
import { site, applyHeaderLogoVariant } from '../config/site.js'
import { initNavigation } from './navigation.js'
import { initStickyBar } from './sticky-bar.js'
import { initFaq } from './faq.js'
import { initAnimations } from './animations.js'
import { initConsentApi } from './consent.js'
import { initWorkArea } from './work-area.js'

if (import.meta.env.PROD) {
  console.info('[DMR]', typeof __DMR_BUILD__ !== 'undefined' ? __DMR_BUILD__ : {})
}

export function mountPage({ pageId, title, description, content }) {
  document.title = title
  document.body.classList.add('page-sub', `page-${pageId}`)
  applyHeaderLogoVariant()
  initConsentApi()

  let desc = document.querySelector('meta[name="description"]')
  if (!desc) {
    desc = document.createElement('meta')
    desc.setAttribute('name', 'description')
    document.head.appendChild(desc)
  }
  desc.setAttribute('content', description)

  const pathMap = {
    home: '/',
    'metaal-inkoop': '/metaal-inkoop.html',
    recycling: '/recycling.html',
    demontage: '/demontage.html',
    materialen: '/materialen.html',
    werkgebied: '/werkgebied.html',
    'over-ons': '/over-ons.html',
    contact: '/contact.html',
    faq: '/faq.html',
  }
  const canonicalPath = pathMap[pageId] || '/'
  const canonicalUrl = `${site.url}${canonicalPath === '/' ? '/' : canonicalPath}`

  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)

  const setOg = (property, contentValue) => {
    let el = document.querySelector(`meta[property="${property}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', property)
      document.head.appendChild(el)
    }
    el.setAttribute('content', contentValue)
  }

  setOg('og:type', 'website')
  setOg('og:locale', 'nl_NL')
  setOg('og:site_name', site.name)
  setOg('og:url', canonicalUrl)
  setOg('og:title', title)
  setOg('og:description', description)
  setOg('og:image', `${site.url}/images/logo.png`)

  document.querySelector('#app').innerHTML = `
    ${TopBar()}
    ${Navbar({ pageId })}
    <main>
      ${content}
    </main>
    ${Footer()}
    ${StickyContactBar()}
    ${WhatsAppFloat()}
    ${CookieConsentMarkup()}
  `

  const existing = document.getElementById('local-business-schema')
  existing?.remove()
  const schema = document.createElement('script')
  schema.id = 'local-business-schema'
  schema.type = 'application/ld+json'
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: '+31648667182',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Gerrit Imbosstraat 60',
      postalCode: '9607 PE',
      addressLocality: 'Foxhol',
      addressCountry: 'NL',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Groningen',
    },
  })
  document.head.appendChild(schema)

  initNavigation()
  initStickyBar()
  initFaq()
  initWorkArea()
  initCookieConsent()
  initAnimations()
}
