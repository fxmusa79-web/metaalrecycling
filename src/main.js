import './style.css'
import { TopBar, Navbar } from './components/header.js'
import { Footer, StickyContactBar } from './components/footer.js'
import { Hero } from './components/hero.js'
import { Benefits } from './components/benefits.js'
import { ProcessCategories } from './components/process-categories.js'
import { Services } from './components/services.js'
import { WorkPractice } from './components/work-practice.js'
import { RequestSelector } from './components/request-selector.js'
import { Demontage } from './components/demontage.js'
import { RecyclingTimeline } from './components/timeline.js'
import { Audiences } from './components/audiences.js'
import { WorkArea } from './components/work-area.js'
import { FaqPreview } from './components/faq.js'
import { CTASection } from './components/contact.js'
import { initNavigation } from './js/navigation.js'
import { initContactForm } from './js/contact-form.js'
import { initRequestSelector } from './js/request-selector.js'
import { initFaq } from './js/faq.js'
import { initStickyBar } from './js/sticky-bar.js'
import { initAnimations } from './js/animations.js'
import { site } from './config/site.js'

document.title =
  'Duurzaam Metaal Recycling | Metaal Inkoop, Recycling & Demontage'

document.body.classList.add('page-home')

document.querySelector('#app').innerHTML = `
  ${TopBar()}
  ${Navbar({ pageId: 'home' })}
  <main>
    ${Hero()}
    ${Benefits()}
    ${ProcessCategories()}
    ${Services()}
    ${WorkPractice()}
    ${RequestSelector()}
    ${Demontage()}
    ${RecyclingTimeline()}
    ${Audiences()}
    ${WorkArea()}
    ${FaqPreview()}
    ${CTASection()}
  </main>
  ${Footer()}
  ${StickyContactBar()}
`

const schema = document.createElement('script')
schema.type = 'application/ld+json'
schema.textContent = JSON.stringify({
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
})
document.head.appendChild(schema)

initNavigation()
initRequestSelector()
initContactForm()
initFaq()
initStickyBar()
initAnimations()
