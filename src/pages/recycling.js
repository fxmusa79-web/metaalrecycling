import './../style.css'
import { mountPage } from '../js/page.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'
import { subpageHeroes } from '../config/media.js'

const heroBg = subpageHeroes.recycling

const categories = [
  'Kabels',
  'Transformatoren',
  'Machines',
  'Constructies',
  'Ferro',
  'Non-ferro',
  'Samengestelde objecten',
]

mountPage({
  pageId: 'recycling',
  title: 'Metaal Recycling | Duurzaam Metaal Recycling',
  description:
    'Metaal recycling met demontage, sortering en scheiding. Ook samengestelde objecten beoordelen wij op verwerkingsmogelijkheden.',
  content: `
    ${PageHero({
      label: 'Recycling',
      title: 'Metaal recycling &amp; hergebruik',
      text: 'Metalen sorteren, scheiden en klaarmaken voor recycling. Ook samengestelde objecten beoordelen we op materiaal en verwerking.',
      backgroundImage: heroBg.src,
      backgroundPosition: heroBg.position,
      backgroundPositionMobile: heroBg.positionMobile,
      primaryCta: {
        href: '/contact.html?type=Recycling',
        label: 'Contact',
      },
      secondaryCta: {
        href: '/materialen.html',
        label: 'Materialen',
      },
    })}

    <section class="section editorial-split" id="meer-dan-los">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Meer dan los metaal</h2>
          <p>
            Machines, kabels, transformatoren en installaties bestaan vaak uit
            meerdere materialen. Door eerst te demonteren en te scheiden,
            kunnen metaalstromen apart worden verwerkt.
          </p>
        </div>
        <div class="editorial-split__media">
          ${WorkPhoto({
            imageKey: 'kabel',
            sizes: '(max-width: 900px) 100vw, 46vw',
            aspect: '4 / 5',
          })}
        </div>
      </div>
    </section>

    ${ProcessLine({
      id: 'proces',
      title: 'Van object naar materiaalstroom',
      text: 'Van beoordeling tot gescheiden metaalstromen.',
      steps: [
        { title: 'Beoordelen', text: 'Samenstelling en mogelijkheden.' },
        { title: 'Demonteren', text: 'Objecten gecontroleerd uit elkaar.' },
        { title: 'Sorteren', text: 'Materialen op type ordenen.' },
        { title: 'Scheiden', text: 'Metaalstromen apart houden.' },
        { title: 'Verwerken', text: 'Doorzetten naar recycling.' },
      ],
    })}

    <section class="section section--muted recycle-cats">
      <div class="container">
        <div class="recycle-cats__intro">
          <h2>Wat verwerken wij?</h2>
          <p>Onder andere deze stromen en objecten.</p>
        </div>
        <ul class="recycle-cats__list">
          ${categories.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <div class="recycle-visuals">
          <figure class="recycle-visual">
            ${WorkPhoto({
              imageKey: 'transformator',
              sizes: '(max-width: 900px) 100vw, 40vw',
              aspect: '1 / 1',
            })}
            <figcaption>Transformatoren</figcaption>
          </figure>
          <figure class="recycle-visual">
            ${WorkPhoto({
              imageKey: 'windmolenRing',
              sizes: '(max-width: 900px) 100vw, 50vw',
              aspect: '5 / 4',
            })}
            <figcaption>Industriële onderdelen</figcaption>
          </figure>
        </div>
      </div>
    </section>

    ${BandCta({
      title: 'Ander recyclingverzoek?',
      text: 'Staat uw materiaal er niet tussen? Neem contact op.',
      primaryCta: {
        href: '/contact.html?type=Recycling',
        label: 'Contact',
      },
    })}
  `,
})
