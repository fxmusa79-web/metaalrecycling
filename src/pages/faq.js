import './../style.css'
import { mountPage } from '../js/page.js'
import { FaqFull } from '../components/faq.js'

mountPage({
  pageId: 'faq',
  title: 'Veelgestelde vragen | Duurzaam Metaal Recycling',
  description:
    'Antwoorden over metaal inkoop, recycling, demontage, kabels, transformatoren, ophalen en foto’s sturen.',
  content: `
    ${FaqFull()}
  `,
})
