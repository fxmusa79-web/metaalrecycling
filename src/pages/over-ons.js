import './../style.css'
import { mountPage } from '../js/page.js'
import { phoneHref } from '../config/site.js'
import { icons } from '../components/icons.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'

const values = [
  {
    title: 'Praktische aanpak',
    text: 'Korte lijnen, duidelijke afspraken en realistische beoordeling van wat mogelijk is.',
  },
  {
    title: 'Duidelijke beoordeling',
    text: 'Op basis van omschrijving en foto’s geven we een eerste indicatie — zonder loze beloftes.',
  },
  {
    title: 'Materiaal scheiden',
    text: 'We demonteren en scheiden metalen zodat stromen klaar zijn voor verdere recycling.',
  },
  {
    title: 'Flexibel in verzoeken',
    text: 'Ook afwijkende objecten of partijen beoordelen we graag op aanvraag.',
  },
  {
    title: 'Particulier & zakelijk',
    text: 'Van eenmalige partijen tot terugkerende stromen en demontageprojecten.',
  },
]

const pillars = [
  {
    title: 'Metaal inkoop',
    text: 'Ferro- en non-ferrometalen van particulieren, bedrijven en industrie.',
    href: '/metaal-inkoop.html',
  },
  {
    title: 'Recycling',
    text: 'Sorteren, scheiden en klaarmaken van metalen voor hergebruik.',
    href: '/recycling.html',
  },
  {
    title: 'Demontage & sloop',
    text: 'Machines, constructies en installaties gecontroleerd demonteren.',
    href: '/demontage.html',
  },
  {
    title: 'Kabels & transformatoren',
    text: 'Kabelpartijen, trafo’s en samengestelde objecten verwerken.',
    href: '/materialen.html',
  },
]

mountPage({
  pageId: 'over-ons',
  title: 'Over ons | Duurzaam Metaal Recycling',
  description:
    'Duurzaam Metaal Recycling in Foxhol: metaal inkoop, recycling, demontage en materiaalscheiding voor particulieren en bedrijven in Groningen en daarbuiten.',
  content: `
    ${PageHero({
      label: 'Over ons',
      title: 'Praktisch in metaal recycling',
      text: 'Vanuit Foxhol verzorgen we metaal inkoop, recycling, demontage en het scheiden van waardevolle materialen — voor particulieren en bedrijven.',
      primaryCta: {
        href: '/contact.html',
        label: 'Contact',
      },
      secondaryCta: {
        href: '/#aanvraag',
        label: 'Aanvraag starten',
      },
    })}

    <section class="section editorial-split">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <p class="section-header__eyebrow">Wie wij zijn</p>
          <h2>Metaal inkoop, demontage en recycling vanuit Foxhol</h2>
          <p>
            Duurzaam Metaal Recycling koopt metalen in, demonteren we machines
            en installaties, en scheiden we materialen voor verdere verwerking.
            Ook als uw object of partij niet letterlijk op de website staat —
            we beoordelen graag wat mogelijk is.
          </p>
          <p>
            We werken voor particulieren en bedrijven in heel Groningen en
            daarbuiten, afhankelijk van de opdracht. Duidelijke communicatie
            en een praktische werkwijze staan centraal.
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

    <section class="section section--muted about-pillars">
      <div class="container">
        <div class="about-pillars__intro">
          <h2>Wat we doen</h2>
          <p>Onze kernactiviteiten — van inkoop tot demontage en recycling.</p>
        </div>
        <ul class="about-pillars__grid">
          ${pillars
            .map(
              (item) => `
            <li class="about-pillars__card">
              <h3>${item.title}</h3>
              <p>${item.text}</p>
              <a class="text-link" href="${item.href}">Meer ${icons.arrow}</a>
            </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>

    ${ProcessLine({
      id: 'werkwijze',
      title: 'Hoe we werken',
      text: 'Van eerste contact tot verwerking — kort en overzichtelijk.',
      steps: [
        { title: 'Aanmelden', text: 'Omschrijving en eventueel foto’s.' },
        { title: 'Beoordelen', text: 'Mogelijkheden en eerste indicatie.' },
        { title: 'Uitvoeren', text: 'Ophalen, demontage of inkoop.' },
        { title: 'Scheiden', text: 'Materialen gesorteerd voor recycling.' },
      ],
    })}

    <section class="section values-band" id="waarden">
      <div class="container">
        <h2 class="values-band__title">Waar wij voor staan</h2>
        <ul class="values-band__track" data-values-scroll>
          ${values
            .map(
              (item) => `
            <li class="values-band__card">
              <strong>${item.title}</strong>
              <p>${item.text}</p>
            </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>

    <section class="section section--muted about-audiences">
      <div class="container about-audiences__grid">
        <article class="about-audiences__panel">
          <p class="section-header__eyebrow">Particulier</p>
          <h2>Metaal of een object over?</h2>
          <p>
            Kabels, onderdelen, machines of gemengde partijen. Stuur foto’s
            mee voor een snelle eerste beoordeling.
          </p>
          <a class="btn btn--primary btn--sm" href="/contact.html?type=Metaal%20verkopen">
            Metaal verkopen
          </a>
        </article>
        <article class="about-audiences__panel">
          <p class="section-header__eyebrow">Zakelijk</p>
          <h2>Terugkerende stromen of demontage?</h2>
          <p>
            Voor bedrijven met productieresten, kabelpartijen of
            demontageprojecten stemmen we af op de opdracht.
          </p>
          <a class="btn btn--primary btn--sm" href="/contact.html">
            Zakelijk contact
          </a>
        </article>
      </div>
    </section>

    ${BandCta({
      title: 'Een aanvraag bespreken?',
      text: 'Stuur een korte omschrijving en eventueel foto’s — we reageren met wat mogelijk is.',
      primaryCta: {
        href: '/contact.html',
        label: 'Contact',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel direct',
        variant: 'ghost',
      },
    })}
  `,
})
