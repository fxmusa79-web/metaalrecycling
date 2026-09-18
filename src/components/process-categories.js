import { processCategories } from '../config/content.js'
import { Button } from './ui.js'

export function ProcessCategories() {
  const cats = processCategories.filter((c) => c.id !== 'overig')

  return `
    <section class="section material-matrix" id="verwerken">
      <div class="container material-matrix__layout">
        <div class="material-matrix__intro">
          <h2 class="material-matrix__title">Wat kunnen wij verwerken?</h2>
          <p class="material-matrix__text">
            Van losse metalen tot machines, kabels en zware installaties.
            De voorbeelden hieronder zijn ter illustratie — geen volledige lijst.
          </p>
          ${Button({
            href: '/materialen.html',
            label: 'Bekijk materialen',
            variant: 'secondary',
            size: 'md',
          })}
        </div>

        <div class="material-matrix__grid">
          ${cats
            .map(
              (cat) => `
            <article class="matrix-block matrix-block--${cat.id}" id="cat-${cat.id}">
              <h3>${cat.title}</h3>
              <ul>
                ${cat.examples
                  .slice(0, cat.id === 'metalen' || cat.id === 'constructies' ? 6 : 4)
                  .map((item) => `<li>${item}</li>`)
                  .join('')}
              </ul>
            </article>`
            )
            .join('')}
        </div>
      </div>

      <div class="material-matrix__band">
        <div class="container material-matrix__band-inner">
          <div>
            <h3>Ander materiaal of object?</h3>
            <p>Neem contact op voor een beoordeling.</p>
          </div>
          ${Button({
            href: '/contact.html?type=Ander%20verzoek',
            label: 'Stuur uw verzoek',
            variant: 'primary',
            size: 'md',
          })}
        </div>
      </div>
    </section>
  `
}
