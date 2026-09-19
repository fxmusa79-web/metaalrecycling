import './../style.css'
import { mountPage } from '../js/page.js'
import { PageHero, ProcessLine, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'
import { RecycleMotif } from '../components/recycle-motif.js'
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
  title: 'Metaal Recycling Groningen | Duurzaam Metaal Recycling',
  description:
    'Metaal recycling in de praktijk: demontage, sorteren, scheiden en klaarmaken voor recyclingstromen. Ook kabels, transformatoren en machines.',
  content: `
    ${PageHero({
      label: 'Recycling',
      title: 'Metaal recycling &amp; hergebruik',
      text: 'We sorteren, demonteren en scheiden metalen zodat materiaalstromen klaar zijn voor verdere recycling. Ook samengestelde objecten beoordelen we op wat er terug te winnen is.',
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

    <section class="section editorial-split has-recycle-motif" id="meer-dan-los">
      ${RecycleMotif({ className: 'recycle-motif--recycling' })}
      <div class="container editorial-split__grid">
        <div class="editorial-split__copy">
          <h2>Van object naar materiaalstroom</h2>
          <p>
            Machines, kabels, transformatoren en installaties bestaan vaak uit
            meerdere materialen. Door eerst te demonteren en te scheiden,
            kunnen metaalstromen apart worden verwerkt.
          </p>
          <p>
            In de praktijk betekent dat: beoordelen wat erin zit, gecontroleerd
            uit elkaar halen, sorteren op type en klaarmaken voor recycling of
            hergebruik. Niet elk object levert dezelfde stromen op — daarom
            kijken we per partij wat realistisch is.
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
      title: 'Wat er met het materiaal gebeurt',
      text: 'Van beoordeling tot gescheiden metaalstromen.',
      steps: [
        { title: 'Beoordelen', text: 'Samenstelling en mogelijkheden.' },
        { title: 'Demonteren', text: 'Objecten gecontroleerd uit elkaar.' },
        { title: 'Sorteren', text: 'Materialen op type ordenen.' },
        { title: 'Scheiden', text: 'Metaalstromen apart houden.' },
        { title: 'Doorzetten', text: 'Naar recycling of hergebruik.' },
      ],
    })}

    <section class="section section--muted recycle-cats">
      <div class="container">
        <div class="recycle-cats__intro">
          <h2>Wat verwerken wij?</h2>
          <p>
            Onder andere kabels, transformatoren, machines, constructies en
            gemengde metalen objecten. Staat uw materiaal er niet tussen?
            Stuur foto’s mee voor een beoordeling.
          </p>
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
      title: 'Recyclingverzoek bespreken?',
      text: 'Stuur een korte omschrijving en eventueel foto’s.',
      primaryCta: {
        href: '/contact.html?type=Recycling',
        label: 'Contact',
      },
    })}
  `,
})
