import './../style.css'
import { mountPage } from '../js/page.js'
import { phoneHref } from '../config/site.js'
import { icons } from '../components/icons.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'
import { subpageHeroes } from '../config/media.js'

const heroBg = subpageHeroes.demontage

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
      title: 'Demontage van metalen installaties',
      text: 'Wij demonteren machines, constructies en installaties en scheiden metalen voor verdere verwerking. Waar nodig doen we brand- en snijwerk.',
      backgroundImage: heroBg.src,
      backgroundPosition: heroBg.position,
      backgroundPositionMobile: heroBg.positionMobile,
      primaryCta: {
        href: '/contact.html?type=Demontage%20%26%20sloop',
        label: 'Demontage aanvragen',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel voor overleg',
        variant: 'ghost',
      },
    })}

    <section class="section editorial-split" id="wat-wij-demonteren">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Wat wij demonteren</h2>
          <ul class="plain-list">
            ${categories.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <a class="text-link" href="/contact.html?type=Demontage%20%26%20sloop">
            Demontage aanvragen ${icons.arrow}
          </a>
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
            Voor zware constructies en machines snijden we onderdelen
            gecontroleerd los voor demontage en scheiding.
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
            Ook samengestelde industriële onderdelen demonteren we
            voor materiaalterugwinning.
          </p>
          <a class="text-link" href="/contact.html?type=Machine%20%2F%20installatie">
            Object laten beoordelen ${icons.arrow}
          </a>
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
        { title: 'Planning', text: 'Demontage, snijwerk en logistiek.' },
        { title: 'Demontage', text: 'Gecontroleerd losmaken op locatie.' },
        { title: 'Scheiding', text: 'Metalen en onderdelen sorteren.' },
        { title: 'Recycling', text: 'Doorzetten naar verdere verwerking.' },
      ],
    })}

    ${BandCta({
      title: 'Demontageproject bespreken?',
      text: 'Stuur een korte omschrijving en eventueel foto’s.',
      primaryCta: {
        href: '/contact.html?type=Demontage%20%26%20sloop',
        label: 'Contact',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel 06 48 66 71 82',
        variant: 'ghost',
      },
    })}
  `,
})
