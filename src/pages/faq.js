import './../style.css'
import { mountPage } from '../js/page.js'
import { FaqFull } from '../components/faq.js'
import { faqs } from '../config/content.js'

mountPage({
  pageId: 'faq',
  title: 'Veelgestelde Vragen | Duurzaam Metaal Recycling',
  description:
    'Antwoorden over metaal inkoop, recycling, demontage, kabels, transformatoren, ophalen en foto’s sturen.',
  content: `
    ${FaqFull()}
  `,
})

const faqSchema = document.createElement('script')
faqSchema.type = 'application/ld+json'
faqSchema.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
})
document.head.appendChild(faqSchema)
