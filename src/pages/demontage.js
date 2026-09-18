import './../style.css'
import { mountPage } from '../js/page.js'
import { Button } from '../components/ui.js'
import { phoneHref } from '../config/site.js'
import { icons } from '../components/icons.js'
import { CTASection } from '../components/contact.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'

const categories = [
  'Machines',
  'Installaties',
  'Staalconstructies',
  'Leidingen',
  'Frames',
  'Industriële apparatuur',
]

const snijItems = [
  'Machines uit elkaar branden',
  'Constructiedelen doorsnijden',
  'Staal losmaken',
  'Onderdelen scheiden',
]

mountPage({
  pageId: 'demontage',
  title: 'Demontage & Sloop van Metaal | Duurzaam Metaal Recycling',
  description:
    'Demontage en sloop van machines, constructies en installaties, inclusief brand- en snijwerk waar nodig.',
  content: `
    ${PageHero({
      label: 'Demontage &amp; sloop',
      title: 'Demontage &amp; sloop van metalen installaties',
      text: 'Wij demonteren machines, constructies en installaties en scheiden metalen onderdelen voor verdere verwerking. Waar nodig voeren we professioneel brand- en snijwerk uit.',
      tone: 'dark',
      primaryCta: {
        href: '/contact.html?type=Demontage%20%26%20sloop',
        label: 'Demontage aanvragen',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel voor overleg',
        icon: icons.phone,
      },
    })}

    <section class="section editorial-split" id="wat-wij-demonteren">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Wat wij demonteren</h2>
          <ul class="plain-list">
            ${categories.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          ${Button({
            href: '/contact.html?type=Demontage%20%26%20sloop',
            label: 'Demontage aanvragen',
            variant: 'primary',
            size: 'md',
          })}
        </div>
        <div class="editorial-split__media">
          ${WorkPhoto({
            imageKey: 'transformator2',
            sizes: '(max-width: 900px) 100vw, 48vw',
            aspect: '3 / 4',
          })}
        </div>
      </div>
    </section>

    <section class="section demontage-feature" id="brand-snijwerk">
      <div class="container demontage-feature__grid">
        <div class="demontage-feature__media">
          ${WorkPhoto({
            imageKey: 'snijBranden',
            sizes: '(max-width: 900px) 100vw, 48vw',
            aspect: '4 / 5',
          })}
        </div>
        <div class="demontage-feature__copy">
          <h2>Brand- en snijwerk</h2>
          <p>
            Voor zware metalen constructies en machines voeren wij brand- en snijwerk uit
            om onderdelen gecontroleerd los te maken en te scheiden.
          </p>
          <ul class="check-list">
            ${snijItems
              .map(
                (item) => `
              <li>
                <span class="check-list__icon">${icons.check}</span>
                <span>${item}</span>
              </li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    </section>

    <section class="section editorial-split editorial-split--reverse" id="industriële-onderdelen">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Grote industriële onderdelen</h2>
          <p>
            Ook samengestelde industriële onderdelen kunnen worden gedemonteerd
            voor materiaalterugwinning.
          </p>
          ${Button({
            href: '/contact.html?type=Machine%20%2F%20installatie',
            label: 'Object laten beoordelen',
            variant: 'secondary',
            size: 'md',
          })}
        </div>
        <div class="editorial-split__media">
          ${WorkPhoto({
            imageKey: 'windmolenRing',
            sizes: '(max-width: 900px) 100vw, 48vw',
            aspect: '5 / 4',
          })}
        </div>
      </div>
    </section>

    ${ProcessLine({
      id: 'proces',
      title: 'Van beoordeling tot recycling',
      steps: [
        { title: 'Beoordeling', text: 'Foto’s, bereikbaarheid en samenstelling.' },
        { title: 'Planning', text: 'Demontage, snijwerk en logistiek afstemmen.' },
        { title: 'Demontage', text: 'Gecontroleerd losmaken op locatie.' },
        { title: 'Scheiding', text: 'Metalen en onderdelen sorteren.' },
        { title: 'Afvoer / recycling', text: 'Doorzetten naar verdere verwerking.' },
      ],
    })}

    ${BandCta({
      title: 'Demontageproject bespreken?',
      text: 'Stuur een korte omschrijving en eventueel foto’s.',
      primaryCta: {
        href: '/contact.html?type=Demontage%20%26%20sloop',
        label: 'Demontage aanvragen',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel 06 48 66 71 82',
        icon: icons.phone,
      },
    })}

    ${CTASection()}
  `,
})
