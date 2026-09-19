import './../style.css'
import { mountPage } from '../js/page.js'
import { materialGroups } from '../config/content.js'
import { PageHero, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'
import { subpageHeroes } from '../config/media.js'

const heroBg = subpageHeroes.materialen

const featured = {
  kabels: 'kabel',
  trafos: 'transformator',
  machines: 'windmolenRing',
}

const aspects = {
  kabels: '4 / 5',
  trafos: '1 / 1',
  machines: '5 / 4',
}

mountPage({
  pageId: 'materialen',
  title: 'Materialen & Recycling | Duurzaam Metaal Recycling',
  description:
    'Wat kunnen wij verwerken? Overzicht van metalen, kabels, machines, transformatoren en constructies. Staat uw materiaal er niet tussen? Neem contact op.',
  content: `
    ${PageHero({
      label: 'Materialen',
      title: 'Wat kunnen wij verwerken?',
      text: 'Van losse metalen tot kabels, machines, transformatoren en constructies. De voorbeelden hieronder zijn ter illustratie — geen volledige lijst.',
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
        <label class="material-filter material-filter--clean" for="material-search">
          <span class="visually-hidden">Zoek materiaal</span>
          <input id="material-search" type="search" placeholder="Zoek materiaal…" />
        </label>

        <div class="materials-editorial" id="materials-list">
          ${materialGroups
            .map((group) => {
              const imageKey = featured[group.id]
              const featuredClass = imageKey ? ' material-entry--featured' : ''
              return `
              <article
                class="material-entry${featuredClass} material-entry--${group.id}"
                data-material-group
                data-search="${(group.title + ' ' + group.examples.join(' ')).toLowerCase()}"
              >
                ${
                  imageKey
                    ? `<div class="material-entry__media">${WorkPhoto({
                        imageKey,
                        aspect: aspects[group.id] || '4 / 3',
                        sizes: '(max-width: 900px) 100vw, 42vw',
                      })}</div>`
                    : ''
                }
                <div class="material-entry__body">
                  <h2>${group.title}</h2>
                  <p>${group.text}</p>
                  <ul class="material-entry__examples">
                    ${group.examples
                      .slice(0, 5)
                      .map((item) => `<li>${item}</li>`)
                      .join('')}
                  </ul>
                </div>
              </article>`
            })
            .join('')}
        </div>
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

const search = document.getElementById('material-search')
search?.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase()
  document.querySelectorAll('[data-material-group]').forEach((card) => {
    card.hidden = Boolean(q) && !card.dataset.search.includes(q)
  })
})
