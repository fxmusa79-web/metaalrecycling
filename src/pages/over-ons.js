import './../style.css'
import { mountPage } from '../js/page.js'
import { CTASection } from '../components/contact.js'
import { Button } from '../components/ui.js'
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
  'Metaal inkoop',
  'Demontage',
  'Recycling',
  'Machines',
  'Kabels',
  'Transformatoren',
  'Brand- en snijwerk',
]

mountPage({
  pageId: 'over-ons',
  title: 'Over ons | Duurzaam Metaal Recycling',
  description:
    'Duurzaam Metaal Recycling richt zich op metaal inkoop, recycling, demontage en het scheiden van waardevolle materialen voor particulieren en bedrijven.',
  content: `
    ${PageHero({
      label: 'Over ons',
      title: 'Praktisch in metaal recycling en demontage',
      text: 'Duurzaam Metaal Recycling richt zich op metaal inkoop, recycling, demontage en het scheiden van waardevolle materialen.',
      primaryCta: {
        href: '/contact.html',
        label: 'Neem contact op',
      },
    })}

    <section class="section editorial-split">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Wie wij zijn</h2>
          <p>
            Wij kopen metalen in, demonteren machines en installaties, en scheiden materialen
            voor verdere recycling. Particulieren en bedrijven kunnen contact opnemen voor
            een beoordeling — ook als het materiaal of object niet letterlijk op de website staat.
          </p>
          <p>
            Vanuit Foxhol werken we voor opdrachten in de regio en daarbuiten,
            afhankelijk van de situatie.
          </p>
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
          ${services.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </section>

    ${BandCta({
      title: 'Een aanvraag bespreken?',
      text: 'Stuur foto’s en een korte omschrijving.',
      primaryCta: {
        href: '/contact.html',
        label: 'Neem contact op',
      },
    })}

    ${CTASection()}
  `,
})
