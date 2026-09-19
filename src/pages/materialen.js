import './../style.css'
import { mountPage } from '../js/page.js'
import { icons } from '../components/icons.js'
import { PageHero, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'
import { subpageHeroes } from '../config/media.js'

const heroBg = subpageHeroes.materialen

/**
 * Visual material catalog — each category uses a dedicated real photo.
 */
const catalog = [
  {
    id: 'ferro',
    imageKey: 'ferro',
    title: 'Ferro',
    text: 'Staal, ijzer en constructiemateriaal uit onder andere frames, machines en installaties.',
    examples: ['Staal', 'IJzer', 'Constructiestaal', 'Gemengd ferro'],
    aspect: '5 / 4',
    href: '/metaal-inkoop.html#metalen',
    link: 'Metaal verkopen',
  },
  {
    id: 'nonferro',
    imageKey: 'nonFerro',
    title: 'Non-ferro',
    text: 'Koper, aluminium, RVS, messing, lood en zink — beoordeeld op soort en kwaliteit.',
    examples: ['Koper', 'Aluminium', 'RVS', 'Messing', 'Lood', 'Zink'],
    aspect: '16 / 10',
    href: '/metaal-inkoop.html#metalen',
    link: 'Metaal verkopen',
  },
  {
    id: 'kabels',
    imageKey: 'kabels',
    title: 'Kabels',
    text: 'Kabelpartijen en elektrische leidingen met terugwinbare metalen.',
    examples: ['Koperkabel', 'Aluminiumkabel', 'Gemengde kabelpartijen'],
    aspect: '4 / 5',
    href: '/contact.html?type=Kabels%20%2F%20transformator',
    link: 'Kabels aanbieden',
  },
  {
    id: 'motoren',
    imageKey: 'motoren',
    title: 'Motoren',
    text: 'Elektromotoren en elektrische onderdelen met metaalhoudende componenten.',
    examples: ['Elektromotoren', 'Elektrische componenten', 'Motoronderdelen'],
    aspect: '4 / 5',
    href: '/contact.html?type=Machine%20%2F%20installatie',
    link: 'Motoren aanbieden',
  },
  {
    id: 'machines',
    imageKey: 'machines',
    title: 'Machines',
    text: 'Complete machines of onderdelen die kunnen worden gedemonteerd en gescheiden.',
    examples: [
      'Industriële machines',
      'Productiemachines',
      'Machineframes',
      'Metalen installaties',
    ],
    aspect: '16 / 10',
    href: '/demontage.html',
    link: 'Demontage bekijken',
  },
]

mountPage({
  pageId: 'materialen',
  title: 'Metalen, Kabels, Machines & Transformatoren | Duurzaam Metaal Recycling',
  description:
    'Overzicht van ferro, non-ferro, kabels, motoren en machines die wij kunnen beoordelen. Geen volledige lijst — stuur foto’s bij twijfel.',
  content: `
    ${PageHero({
      label: 'Materialen',
      title: 'Wat kunnen wij verwerken?',
      text: 'Van ferro en non-ferro tot kabels, motoren en machines. De voorbeelden hieronder zijn ter illustratie — geen volledige lijst.',
      backgroundImage: heroBg.src,
      backgroundPosition: heroBg.position,
      backgroundPositionMobile: heroBg.positionMobile,
      primaryCta: {
        href: '/contact.html?type=Ander%20verzoek',
        label: 'Contact',
      },
      secondaryCta: {
        href: '/#aanvraag',
        label: 'Aanvraag starten',
      },
    })}

    <section class="section materials-catalog">
      <div class="container">
        <div class="materials-catalog__intro">
          <h2>Materialen &amp; objecten</h2>
          <p>
            Elk type partij beoordelen we apart. Stuur foto’s mee voor een
            snellere eerste indicatie.
          </p>
        </div>

        <div class="materials-visual" id="materials-list">
          ${catalog
            .map(
              (item, index) => `
            <article
              class="material-panel material-panel--${item.id}${index % 2 === 1 ? ' material-panel--reverse' : ''}"
              id="${item.id}"
              data-material-group
            >
              <div class="material-panel__media">
                ${WorkPhoto({
                  imageKey: item.imageKey,
                  aspect: item.aspect,
                  sizes: '(max-width: 899px) 100vw, 46vw',
                })}
              </div>
              <div class="material-panel__body">
                <h2>${item.title}</h2>
                <p>${item.text}</p>
                <ul class="material-panel__examples">
                  ${item.examples.map((ex) => `<li>${ex}</li>`).join('')}
                </ul>
                <a class="text-link" href="${item.href}">
                  ${item.link} ${icons.arrow}
                </a>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="section section--muted materials-note">
      <div class="container materials-note__inner">
        <div>
          <h2>Transformatoren &amp; overige partijen</h2>
          <p>
            Ook transformatoren, constructies en gemengde industriële partijen
            beoordelen we op aanvraag. Staat uw materiaal er niet tussen?
            Stuur een korte omschrijving en foto’s.
          </p>
        </div>
        <a class="btn btn--primary btn--sm" href="/contact.html?type=Ander%20verzoek">
          Aanvraag sturen
        </a>
      </div>
    </section>

    ${BandCta({
      title: 'Staat uw materiaal er niet tussen?',
      text: 'Wij beoordelen ook andere recycling- en demontageverzoeken.',
      primaryCta: {
        href: '/contact.html?type=Ander%20verzoek',
        label: 'Contact',
      },
    })}
  `,
})
