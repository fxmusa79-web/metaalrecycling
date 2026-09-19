import '../style.css'
import { mountPage } from '../js/page.js'
import { phoneHref } from '../config/site.js'
import { ContactInfo, ContactForm } from '../components/contact.js'
import { initContactForm } from '../js/contact-form.js'
import { PageHero } from '../components/page-sections.js'

mountPage({
  pageId: 'contact',
  title: 'Contact | Duurzaam Metaal Recycling',
  description:
    'Neem contact op met Duurzaam Metaal Recycling in Foxhol voor metaal inkoop, recycling, demontage of een ander verzoek.',
  content: `
    ${PageHero({
      label: 'Contact',
      title: 'Neem contact op',
      text: 'Bel, mail of stuur een verzoek met foto’s. Ook andere recycling- en demontageverzoeken beoordelen wij.',
      primaryCta: {
        href: '#contact-form',
        label: 'Stuur aanvraag',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel direct',
      },
    })}

    <section class="section contact-page-section" id="contact-form">
      <div class="container contact-page">
        ${ContactInfo()}
        ${ContactForm()}
      </div>
    </section>
  `,
})

initContactForm()
