import '../style.css'
import { mountPage } from '../js/page.js'
import { ContactInfo, ContactForm } from '../components/contact.js'
import { initContactForm } from '../js/contact-form.js'

mountPage({
  pageId: 'contact',
  title: 'Contact | Duurzaam Metaal Recycling',
  description:
    'Neem contact op met Duurzaam Metaal Recycling in Foxhol voor metaal inkoop, recycling, demontage of een ander verzoek.',
  content: `
    <section class="section contact-page-section">
      <div class="container contact-page">
        ${ContactInfo()}
        ${ContactForm()}
      </div>
    </section>
  `,
})

initContactForm()
