import { Button } from './ui.js'
import { icons } from './icons.js'

export function CustomRequestCTA() {
  return `
    <section class="section custom-request" id="ander-verzoek" aria-labelledby="custom-request-title">
      <div class="container custom-request__inner">
        <div class="custom-request__copy">
          <h2 id="custom-request-title">Ander recyclingverzoek?</h2>
          <p>
            Staat uw materiaal, object of project niet op de website? Neem contact met ons op.
            Wij beoordelen ook andere recycling-, demontage- en afvoerverzoeken.
          </p>
        </div>
        ${Button({
          href: '#contact-form',
          label: 'Bespreek uw verzoek',
          variant: 'primary',
          size: 'lg',
          icon: icons.arrow,
        })}
      </div>
    </section>
  `
}
