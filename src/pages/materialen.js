import './../style.css'
import { mountPage } from '../js/page.js'
import { materialGroups } from '../config/content.js'
import { Button } from '../components/ui.js'
import { CTASection } from '../components/contact.js'
import { PageHero, BandCta } from '../components/page-sections.js'
import { WorkPhoto } from '../components/media.js'

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
    'Overzicht van metalen, kabels, machines, transformatoren en constructies. Staat uw materiaal er niet tussen? Neem contact op.',
  content: `
    ${PageHero({
      label: 'Materialen',
      title: 'Materialen &amp; objecten',
      text: 'Wij verwerken veel verschillende metaalsoorten, onderdelen en objecten. De voorbeelden hieronder zijn niet volledig.',
      primaryCta: {
        href: '/contact.html?type=Ander%20verzoek',
        label: 'Stuur uw verzoek',
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
      text: 'Wij beoordelen ook andere recycling-, demontage- en afvoerverzoeken.',
      primaryCta: {
        href: '/contact.html?type=Ander%20verzoek',
        label: 'Stuur uw verzoek',
      },
    })}

    ${CTASection()}
  `,
})

const search = document.getElementById('material-search')
search?.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase()
  document.querySelectorAll('[data-material-group]').forEach((card) => {
    card.hidden = Boolean(q) && !card.dataset.search.includes(q)
  })
})
