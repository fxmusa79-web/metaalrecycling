import './../style.css'
import { mountPage } from '../js/page.js'
import { Button } from '../components/ui.js'
import { CTASection } from '../components/contact.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'

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
    image: 'kabel',
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
      title: 'Metaal verkopen aan Duurzaam Metaal Recycling',
      text: 'Wij kopen verschillende ferro- en non-ferrometalen in van particulieren, bedrijven en industrie. Stuur foto’s en een korte omschrijving voor een eerste beoordeling.',
      primaryCta: {
        href: '/contact.html?type=Metaal%20aanbieden',
        label: 'Metaal aanbieden',
      },
      secondaryCta: {
        href: '/materialen.html',
        label: 'Bekijk materialen',
      },
    })}

    <section class="section inkoop-cats" id="metalen">
      <div class="container">
        <div class="inkoop-cats__intro">
          <h2>Welke metalen kopen wij in?</h2>
          <p>
            De voorbeelden op deze pagina zijn niet volledig. Heeft u een andere partij of object?
            Neem contact op voor een beoordeling.
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
      title: 'Zo werkt metaal aanbieden',
      steps: [
        { title: 'Stuur foto’s en omschrijving', text: 'Beschrijf de partij en voeg foto’s toe.' },
        { title: 'Wij beoordelen de partij', text: 'U krijgt een eerste indicatie of voorstel.' },
        { title: 'Afspraak / ophalen / verwerking', text: 'Afhankelijk van locatie en hoeveelheid.' },
      ],
    })}

    <section class="section audiences-section" id="particulier-zakelijk">
      <div class="audiences-split">
        <article class="audience-panel audience-panel--private">
          <div class="audience-panel__inner">
            <p class="audience-panel__label">Particulier</p>
            <h2 class="audience-panel__title">Metaal over?</h2>
            <p>
              Kabels, onderdelen, oude machines of ander metaal? Stuur foto’s mee voor een eerste beoordeling.
            </p>
            ${Button({
              href: '/contact.html?type=Metaal%20aanbieden',
              label: 'Metaal aanbieden',
              variant: 'primary',
              size: 'md',
            })}
          </div>
        </article>
        <article class="audience-panel audience-panel--business">
          <div class="audience-panel__inner">
            <p class="audience-panel__label">Zakelijk</p>
            <h2 class="audience-panel__title">Terugkerende partijen?</h2>
            <p>
              Voor bedrijven verwerken we productieresten, kabelpartijen, machines en industriële materialen.
            </p>
            ${Button({
              href: '/contact.html?type=Recycling',
              label: 'Zakelijke aanvraag',
              variant: 'secondary',
              size: 'md',
            })}
          </div>
        </article>
      </div>
    </section>

    ${BandCta({
      title: 'Partij metaal aanbieden?',
      text: 'Stuur foto’s en een korte omschrijving.',
      primaryCta: {
        href: '/contact.html?type=Metaal%20aanbieden',
        label: 'Stuur foto’s',
      },
    })}

    ${CTASection()}
  `,
})
