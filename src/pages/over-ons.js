import './../style.css'
import { mountPage } from '../js/page.js'
import { icons } from '../components/icons.js'
import { PageHero, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'

const values = [
  'Praktische aanpak',
  'Duidelijke beoordeling',
  'Materiaal scheiden',
  'Flexibel in verzoeken',
  'Particulier & zakelijk',
]

const services = [
  { label: 'Metaal inkoop', href: '/metaal-inkoop.html' },
  { label: 'Recycling', href: '/recycling.html' },
  { label: 'Demontage', href: '/demontage.html' },
  { label: 'Brand- en snijwerk', href: '/demontage.html#brand-snijwerk' },
  { label: 'Kabels & transformatoren', href: '/materialen.html' },
  { label: 'Machines', href: '/demontage.html' },
]

mountPage({
  pageId: 'over-ons',
  title: 'Over ons | Duurzaam Metaal Recycling',
  description:
    'Duurzaam Metaal Recycling richt zich op metaal inkoop, recycling, demontage en het scheiden van waardevolle materialen voor particulieren en bedrijven.',
  content: `
    ${PageHero({
      label: 'Over ons',
      title: 'Praktisch in metaal recycling',
      text: 'Metaal inkoop, recycling, demontage en het scheiden van waardevolle materialen voor particulieren en bedrijven.',
      primaryCta: {
        href: '/contact.html',
        label: 'Contact',
      },
    })}

    <section class="section editorial-split">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Wie wij zijn</h2>
          <p>
            Wij kopen metalen in, demonteren machines en installaties,
            en scheiden materialen voor recycling. Ook als uw object
            niet letterlijk op de website staat.
          </p>
          <p>
            Vanuit Foxhol werken we in de regio en daarbuiten,
            afhankelijk van de opdracht.
          </p>
          <a class="text-link" href="/werkgebied.html">
            Werkgebied ${icons.arrow}
          </a>
        </div>
        <div class="editorial-split__media">
          ${WorkPhoto({
            imageKey: 'snijBranden',
            sizes: '(max-width: 900px) 100vw, 46vw',
            aspect: '4 / 5',
          })}
        </div>
      </div>
    </section>

    <section class="section section--muted values-band">
      <div class="container">
        <h2 class="values-band__title">Waar wij voor staan</h2>
        <ul class="values-band__list">
          ${values.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="section about-services">
      <div class="container about-services__inner">
        <h2>Wat we doen</h2>
        <ul class="about-services__list">
          ${services
            .map(
              (item) =>
                `<li><a href="${item.href}">${item.label}</a></li>`
            )
            .join('')}
        </ul>
      </div>
    </section>

    ${BandCta({
      title: 'Een aanvraag bespreken?',
      text: 'Stuur een korte omschrijving en eventueel foto’s.',
      primaryCta: {
        href: '/contact.html',
        label: 'Contact',
      },
    })}
  `,
})
