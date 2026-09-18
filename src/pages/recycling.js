import './../style.css'
import { mountPage } from '../js/page.js'
import { CTASection } from '../components/contact.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'

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
      text: 'Metalen worden gesorteerd, gescheiden en klaargemaakt voor recycling. Ook samengestelde objecten beoordelen wij op materiaal en verwerking.',
      primaryCta: {
        href: '/contact.html?type=Recycling',
        label: 'Stuur uw verzoek',
      },
      secondaryCta: {
        href: '/materialen.html',
        label: 'Bekijk materialen',
      },
    })}

    <section class="section editorial-split" id="meer-dan-los">
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Meer dan alleen los metaal</h2>
          <p>
            Veel machines, kabels, transformatoren en installaties bestaan uit meerdere materialen.
            Door deze eerst te demonteren en te scheiden kunnen verschillende metaalstromen
            afzonderlijk worden verwerkt.
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
      text: 'Van eerste beoordeling tot gescheiden metaalstromen.',
      steps: [
        { title: 'Beoordelen', text: 'Samenstelling en mogelijkheden bekijken.' },
        { title: 'Demonteren', text: 'Objecten gecontroleerd uit elkaar halen.' },
        { title: 'Sorteren', text: 'Materialen op type ordenen.' },
        { title: 'Scheiden', text: 'Metaalstromen apart houden.' },
        { title: 'Verwerken', text: 'Doorzetten naar recycling.' },
      ],
    })}

    <section class="section section--muted recycle-cats">
      <div class="container">
        <div class="recycle-cats__intro">
          <h2>Wat verwerken wij onder andere?</h2>
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
      text: 'Staat uw materiaal of object er niet tussen? Neem contact op voor een beoordeling.',
      primaryCta: {
        href: '/contact.html?type=Recycling',
        label: 'Stuur uw verzoek',
      },
    })}

    ${CTASection()}
  `,
})
