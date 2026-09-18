import { icons } from './icons.js'
import { Button, SectionHeader } from './ui.js'

const metals = [
  { name: 'Koper', tone: 'copper' },
  { name: 'Aluminium', tone: 'aluminum' },
  { name: 'RVS', tone: 'steel' },
  { name: 'Messing', tone: 'brass' },
  { name: 'Lood', tone: 'lead' },
  { name: 'Zink', tone: 'zinc' },
  { name: 'Staal', tone: 'steel' },
  { name: 'IJzer', tone: 'iron' },
  { name: 'Kabels', tone: 'cable' },
  { name: 'Transformatoren', tone: 'other' },
  { name: 'Elektromotoren', tone: 'steel' },
  { name: 'Machines', tone: 'iron' },
  { name: 'Industriële metalen', tone: 'zinc' },
  { name: 'Gemengd metaal', tone: 'lead' },
]

export function Metals() {
  return `
    <section class="section section--muted" id="materialen">
      <div class="container">
        ${SectionHeader({
          eyebrow: 'Materialen',
          title: 'Veel voorkomende materialen',
          text: 'Wij verwerken onder andere onderstaande materialen en objecten. Staat uw materiaal er niet tussen? Neem contact met ons op voor de mogelijkheden.',
        })}
        <ul class="metals-grid" aria-label="Voorbeelden van materialen">
          ${metals
            .map(
              (metal) => `
            <li class="metal-card metal-card--${metal.tone}">
              <span class="metal-card__swatch" aria-hidden="true"></span>
              <span class="metal-card__name">${metal.name}</span>
            </li>`
            )
            .join('')}
        </ul>
        <div class="metals-note metals-note--cta">
          <div class="metals-note__copy">
            <h3 class="metals-note__title">Staat uw materiaal er niet tussen?</h3>
            <p>
              ${icons.camera}
              <span>
                Ook voor andere recycling- en demontageverzoeken kunt u contact met ons opnemen.
                Stuur eventueel foto’s en een korte omschrijving mee, zodat we direct kunnen
                beoordelen wat mogelijk is.
              </span>
            </p>
          </div>
          <div class="metals-note__actions">
            ${Button({
              href: '#contact',
              label: 'Neem contact op',
              variant: 'primary',
              size: 'md',
            })}
            ${Button({
              href: '#contact-form',
              label: 'Stuur uw verzoek',
              variant: 'secondary',
              size: 'md',
            })}
          </div>
        </div>
      </div>
    </section>
  `
}
