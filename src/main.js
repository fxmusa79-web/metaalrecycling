import './style.css'
import { TopBar, Navbar } from './components/header.js'
import { Footer, StickyContactBar, WhatsAppFloat } from './components/footer.js'
import { CookieConsentMarkup, initCookieConsent } from './components/cookie-consent.js'
import { Hero } from './components/hero.js'
import { Benefits } from './components/benefits.js'
import { ProcessCategories } from './components/process-categories.js'
import { Services } from './components/services.js'
import { WorkPractice } from './components/work-practice.js'
import { RecyclingTimeline } from './components/timeline.js'
import { Audiences } from './components/audiences.js'
import { WorkArea } from './components/work-area.js'
import { GoogleTrust } from './components/google-trust.js'
import { FaqPreview } from './components/faq.js'
import { RequestSelector } from './components/request-selector.js'
import { CTASection } from './components/contact.js'
import { initNavigation } from './js/navigation.js'
import { initFaq } from './js/faq.js'
import { initStickyBar } from './js/sticky-bar.js'
import { initAnimations } from './js/animations.js'
import { initRequestSelector } from './js/request-selector.js'
import { initWorkArea } from './js/work-area.js'
import { initUspRail } from './js/usp-rail.js'
import { initProcessCycle } from './js/process-cycle.js'
import { initConsentApi } from './js/consent.js'
import { site, applyHeaderLogoVariant } from './config/site.js'

if (import.meta.env.PROD) {
  // Lightweight deploy fingerprint — not shown in UI
  console.info('[DMR]', typeof __DMR_BUILD__ !== 'undefined' ? __DMR_BUILD__ : {})
}

document.title =
  'Metaal Inkoop, Recycling & Demontage Groningen | Duurzaam Metaal Recycling'

document.body.classList.add('page-home')
applyHeaderLogoVariant()
initConsentApi()

document.querySelector('#app').innerHTML = `
  ${TopBar()}
  ${Navbar({ pageId: 'home' })}
  <main>
    ${Hero()}
    ${Benefits()}
    ${ProcessCategories()}
    ${Services()}
    ${WorkPractice()}
    ${RecyclingTimeline()}
    ${Audiences()}
    ${WorkArea()}
    ${GoogleTrust()}
    ${FaqPreview()}
    ${RequestSelector()}
    ${CTASection()}
  </main>
  ${Footer()}
  ${StickyContactBar()}
  ${WhatsAppFloat()}
  ${CookieConsentMarkup()}
`

const schema = document.createElement('script')
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
  description: site.description,
  sameAs: [site.googleProfileUrl],
})
document.head.appendChild(schema)

initNavigation()
initFaq()
initStickyBar()
initWorkArea()
initRequestSelector()
initUspRail()
initProcessCycle()
initCookieConsent()
initAnimations()
