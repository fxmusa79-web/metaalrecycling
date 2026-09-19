import { icons } from './icons.js'

export function Audiences() {
  return `
    <section class="section audiences-section" id="klanten">
      <div class="audiences-split">
        <article class="audience-panel audience-panel--private reveal">
          <div class="audience-panel__inner">
            <p class="audience-panel__label">Particulier</p>
            <h2 class="audience-panel__title">Metaal over?</h2>
            <p>
              Kabels, onderdelen, machines of ander metaal.
              Stuur foto’s mee voor een snelle beoordeling.
            </p>
            <a class="text-link" href="/contact.html?type=Metaal%20verkopen">
              Metaal verkopen ${icons.arrow}
            </a>
          </div>
        </article>

        <article class="audience-panel audience-panel--business reveal" id="zakelijk">
          <div class="audience-panel__inner">
            <p class="audience-panel__label">Zakelijk</p>
            <h2 class="audience-panel__title">Terugkerende stromen?</h2>
            <p>
              Voor bedrijven met metaalpartijen, productieresten
              of demontageprojecten.
            </p>
            <a class="text-link text-link--on-dark" href="/contact.html?type=Recycling">
              Zakelijk contact ${icons.arrow}
            </a>
          </div>
        </article>
      </div>
    </section>
  `
}
