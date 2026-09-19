import './../style.css'
import { mountPage } from '../js/page.js'
import { icons } from '../components/icons.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'
import { subpageHeroes } from '../config/media.js'

const heroBg = subpageHeroes['metaal-inkoop']

const categories = [
  {
    id: 'nonferro',
    title: 'Non-ferro',
    size: 'large',
    items: ['Koper', 'Aluminium', 'RVS', 'Messing', 'Lood', 'Zink'],
  },
  {
    id: 'ferro',
    title: 'Ferro',
    size: 'medium',
    items: ['Staal', 'IJzer', 'Constructiestaal', 'Gemengd ferro'],
  },
  {
    id: 'kabels',
    title: 'Kabels',
    size: 'medium',
    items: ['Koperkabel', 'Aluminiumkabel', 'Kabelpartijen'],
    image: 'kabelPremium',
  },
  {
    id: 'machines',
    title: 'Machines',
    size: 'medium',
    items: ['Industriële machines', 'Machineonderdelen', 'Frames'],
  },
  {
    id: 'trafos',
    title: 'Transformatoren',
    size: 'medium',
    items: ['Transformatoren', 'Trafo-onderdelen', 'Aansluitmateriaal'],
  },
  {
    id: 'gemengd',
    title: 'Gemengde partijen',
    size: 'large',
    items: ['Gemengd metaal', 'Productieresten', 'Speciale objecten'],
  },
]

mountPage({
  pageId: 'metaal-inkoop',
  title: 'Metaal Inkoop | Duurzaam Metaal Recycling',
  description:
    'Metaal verkopen als particulier of bedrijf? Duurzaam Metaal Recycling koopt ferro- en non-ferrometalen in. Stuur foto’s voor een eerste beoordeling.',
  content: `
    ${PageHero({
      label: 'Metaal inkoop',
      title: 'Metaal verkopen',
      text: 'Wij kopen ferro- en non-ferrometalen in van particulieren, bedrijven en industrie. Stuur foto’s mee voor een snelle eerste beoordeling.',
      backgroundImage: heroBg.src,
      backgroundPosition: heroBg.position,
      backgroundPositionMobile: heroBg.positionMobile,
      primaryCta: {
        href: '/contact.html?type=Metaal%20aanbieden',
        label: 'Metaal aanbieden',
      },
      secondaryCta: {
        href: '/materialen.html',
        label: 'Materialen',
        asLink: true,
      },
    })}

    <section class="section inkoop-cats" id="metalen">
      <div class="container">
        <div class="inkoop-cats__intro">
          <h2>Welke metalen kopen wij in?</h2>
          <p>
            Voorbeelden ter illustratie — geen volledige lijst.
            Andere partijen? Neem contact op.
          </p>
        </div>

        <div class="inkoop-matrix">
          ${categories
            .map(
              (cat) => `
            <article class="inkoop-block inkoop-block--${cat.size} inkoop-block--${cat.id}">
              ${
                cat.image
                  ? `<div class="inkoop-block__media">${WorkPhoto({
                      imageKey: cat.image,
                      sizes: '(max-width: 900px) 100vw, 40vw',
                      aspect: '4 / 5',
                    })}</div>`
                  : ''
              }
              <div class="inkoop-block__body">
                <h3>${cat.title}</h3>
                <ul>
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
            <a class="text-link" href="/contact.html?type=Metaal%20aanbieden">
              Metaal aanbieden ${icons.arrow}
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
      title: 'Partij metaal aanbieden?',
      text: 'Stuur een korte omschrijving en eventueel foto’s.',
      primaryCta: {
        href: '/contact.html?type=Metaal%20aanbieden',
        label: 'Contact',
      },
    })}
  `,
})
