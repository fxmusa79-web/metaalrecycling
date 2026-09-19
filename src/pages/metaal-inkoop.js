import './../style.css'
import { mountPage } from '../js/page.js'
import { icons } from '../components/icons.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'
import { subpageHeroes } from '../config/media.js'

const heroBg = subpageHeroes['metaal-inkoop']

const offerCategories = [
  {
    id: 'ferro',
    imageKey: 'ferro',
    title: 'Ferro metalen',
    text: 'Staal, ijzer en constructiemateriaal uit onder andere frames, machines en installaties.',
    items: ['Staal', 'IJzer', 'Constructiestaal', 'Gemengd ferro'],
    aspect: '5 / 4',
  },
  {
    id: 'nonferro',
    imageKey: 'nonFerro',
    title: 'Non-ferro metalen',
    text: 'Koper, aluminium, RVS, messing, lood en zink worden beoordeeld op soort en kwaliteit.',
    items: ['Koper', 'Aluminium', 'RVS', 'Messing', 'Lood', 'Zink'],
    aspect: '16 / 10',
  },
  {
    id: 'kabels',
    imageKey: 'kabels',
    title: 'Kabels',
    text: 'Kabelpartijen en elektrische leidingen met terugwinbare metalen.',
    items: ['Koperkabel', 'Aluminiumkabel', 'Gemengde kabelpartijen'],
    aspect: '4 / 5',
  },
  {
    id: 'motoren',
    imageKey: 'motoren',
    title: 'Elektromotoren',
    text: 'Elektromotoren en elektrische onderdelen met metaalhoudende componenten.',
    items: ['Elektromotoren', 'Motoronderdelen', 'Elektrische componenten'],
    aspect: '4 / 5',
  },
  {
    id: 'machines',
    imageKey: 'machines',
    title: 'Machines &amp; installaties',
    text: 'Complete machines of onderdelen die kunnen worden gedemonteerd en gescheiden.',
    items: ['Industriële machines', 'Machineonderdelen', 'Frames', 'Installaties'],
    aspect: '16 / 10',
  },
]

mountPage({
  pageId: 'metaal-inkoop',
  title: 'Metaal Verkopen & Metaal Inkoop Groningen | Duurzaam Metaal Recycling',
  description:
    'Metaal verkopen als particulier of bedrijf? Ferro- en non-ferro, kabels, motoren en machines. Foto’s helpen bij de eerste beoordeling.',
  content: `
    ${PageHero({
      label: 'Metaal inkoop',
      title: 'Metaal verkopen',
      text: 'Particulieren en bedrijven kunnen ferro- en non-ferrometalen, kabels, motoren en machines aanbieden. Niet alles wordt automatisch aangenomen — stuur foto’s mee voor een eerste beoordeling.',
      backgroundImage: heroBg.src,
      backgroundPosition: heroBg.position,
      backgroundPositionMobile: heroBg.positionMobile,
      primaryCta: {
        href: '/contact.html?type=Metaal%20verkopen',
        label: 'Metaal verkopen',
      },
      secondaryCta: {
        href: '/materialen.html',
        label: 'Materialen',
      },
    })}

    <section class="section inkoop-cats" id="metalen">
      <div class="container">
        <div class="inkoop-cats__intro">
          <h2>Wat kunt u aanbieden?</h2>
          <p>
            Voorbeelden ter illustratie — geen volledige lijst.
            Andere partijen? Neem contact op.
          </p>
        </div>

        <div class="inkoop-visual">
          ${offerCategories
            .map(
              (cat, index) => `
            <article
              class="inkoop-offer inkoop-offer--${cat.id}${index % 2 === 1 ? ' inkoop-offer--reverse' : ''}"
              id="inkoop-${cat.id}"
            >
              <div class="inkoop-offer__media">
                ${WorkPhoto({
                  imageKey: cat.imageKey,
                  aspect: cat.aspect,
                  sizes: '(max-width: 899px) 100vw, 44vw',
                })}
              </div>
              <div class="inkoop-offer__body">
                <h3>${cat.title}</h3>
                <p>${cat.text}</p>
                <ul class="inkoop-offer__items">
                  ${cat.items.map((item) => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>

    ${ProcessLine({
      title: 'Zo werkt aanbieden',
      steps: [
        { title: 'Foto’s en omschrijving', text: 'Korte beschrijving van de partij.' },
        { title: 'Beoordeling', text: 'U krijgt een eerste indicatie.' },
        { title: 'Afspraak of ophalen', text: 'Afhankelijk van locatie en hoeveelheid.' },
      ],
    })}

    <section class="section audiences-section" id="particulier-zakelijk">
      <div class="audiences-split">
        <article class="audience-panel audience-panel--private">
          <div class="audience-panel__inner">
            <p class="audience-panel__label">Particulier</p>
            <h2 class="audience-panel__title">Metaal over?</h2>
            <p>
              Kabels, onderdelen of machines.
              Stuur foto’s mee voor een snelle beoordeling.
            </p>
            <a class="text-link" href="/contact.html?type=Metaal%20verkopen">
              Metaal verkopen ${icons.arrow}
            </a>
          </div>
        </article>
        <article class="audience-panel audience-panel--business">
          <div class="audience-panel__inner">
            <p class="audience-panel__label">Zakelijk</p>
            <h2 class="audience-panel__title">Terugkerende partijen?</h2>
            <p>
              Productieresten, kabelpartijen, machines
              en industriële materialen.
            </p>
            <a class="text-link text-link--on-dark" href="/contact.html?type=Recycling">
              Zakelijk contact ${icons.arrow}
            </a>
          </div>
        </article>
      </div>
    </section>

    ${BandCta({
      title: 'Partij metaal verkopen?',
      text: 'Stuur een korte omschrijving en eventueel foto’s.',
      primaryCta: {
        href: '/contact.html?type=Metaal%20verkopen',
        label: 'Contact',
      },
    })}
  `,
})
