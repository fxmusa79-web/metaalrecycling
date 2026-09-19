import { faqs } from '../config/content.js'
import { BandCta, PageHero } from './page-sections.js'
import { icons } from './icons.js'

/** Homepage: only the questions that unblock contact */
const homeQuestions = [
  'Welke metalen kopen jullie in?',
  'Kunnen particulieren ook metaal aanbieden?',
  'Kunnen jullie machines demonteren?',
]

const filters = [
  { id: 'all', label: 'Alles' },
  { id: 'inkoop', label: 'Inkoop' },
  { id: 'recycling', label: 'Recycling' },
  { id: 'demontage', label: 'Demontage' },
  { id: 'ophalen', label: 'Ophalen' },
  { id: 'overig', label: 'Overig' },
]

export function FaqPreview({ limit = 3 } = {}) {
  const items = homeQuestions
    .map((q) => faqs.find((f) => f.q === q))
    .filter(Boolean)
    .slice(0, limit)

  return `
    <section class="section section--muted faq-section" id="faq-preview">
      <div class="container">
        <div class="faq-section__intro">
          <h2>Veelgestelde vragen</h2>
        </div>
        <div class="faq-list" data-faq>
          ${items
            .map(
              (item, index) => `
            <div class="faq-item">
              <button
                class="faq-item__trigger"
                type="button"
                aria-expanded="false"
                aria-controls="faq-panel-${index}"
                id="faq-trigger-${index}"
              >
                <span>${item.q}</span>
                <span class="faq-item__icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-item__panel" id="faq-panel-${index}" role="region" aria-labelledby="faq-trigger-${index}" hidden>
                <p>${item.a}</p>
              </div>
            </div>`
            )
            .join('')}
        </div>
        <div class="section-actions">
          <a class="text-link" href="/faq.html">Alle vragen ${icons.arrow}</a>
        </div>
      </div>
    </section>
  `
}

export function FaqFull() {
  return `
    ${PageHero({
      label: 'FAQ',
      title: 'Veelgestelde vragen',
      text: 'Antwoorden over inkoop, recycling, demontage en aanvragen.',
      primaryCta: {
        href: '/contact.html',
        label: 'Contact',
      },
      secondaryCta: {
        href: '/#aanvraag',
        label: 'Aanvraag starten',
      },
    })}

    <section class="section section--muted faq-page">
      <div class="container narrow">
        <div class="faq-filters" role="tablist" aria-label="Filter vragen">
          ${filters
            .map(
              (f, i) => `
            <button
              class="faq-filter${i === 0 ? ' is-active' : ''}"
              type="button"
              data-faq-filter="${f.id}"
              role="tab"
              aria-selected="${i === 0 ? 'true' : 'false'}"
            >${f.label}</button>`
            )
            .join('')}
        </div>

        <div class="faq-list" data-faq>
          ${faqs
            .map(
              (item, index) => `
            <div class="faq-item" data-faq-cat="${item.cat || 'overig'}">
              <button
                class="faq-item__trigger"
                type="button"
                aria-expanded="false"
                aria-controls="faq-full-${index}"
                id="faq-full-trigger-${index}"
              >
                <span>${item.q}</span>
                <span class="faq-item__icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-item__panel" id="faq-full-${index}" role="region" aria-labelledby="faq-full-trigger-${index}" hidden>
                <p>${item.a}</p>
              </div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    ${BandCta({
      title: 'Vraag niet gevonden?',
      text: 'Neem contact op — wij helpen u verder.',
      primaryCta: {
        href: '/contact.html',
        label: 'Contact',
      },
      secondaryCta: {
        href: '/#aanvraag',
        label: 'Aanvraag starten',
        variant: 'ghost',
      },
    })}
  `
}
