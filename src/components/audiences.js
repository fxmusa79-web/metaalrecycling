import { Button } from './ui.js'
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
              Heeft u kabels, metalen onderdelen, oude machines of ander materiaal?
              Stuur foto’s mee voor een eerste beoordeling.
            </p>
            ${Button({
              href: '/contact.html?type=Metaal%20aanbieden',
              label: 'Metaal aanbieden',
              variant: 'primary',
              size: 'md',
            })}
          </div>
        </article>

        <article class="audience-panel audience-panel--business reveal" id="zakelijk">
          <div class="audience-panel__inner">
            <p class="audience-panel__label">Zakelijk</p>
            <h2 class="audience-panel__title">Terugkerende metaalstromen?</h2>
            <p>
              Voor bedrijven verwerken we onder andere machines, kabelpartijen,
              productieresten en industriële installaties.
            </p>
            <ul class="audience-panel__list">
              <li>${icons.check}<span>Terugkerende partijen</span></li>
              <li>${icons.check}<span>Productieresten</span></li>
              <li>${icons.check}<span>Demontageprojecten</span></li>
            </ul>
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
  `
}
