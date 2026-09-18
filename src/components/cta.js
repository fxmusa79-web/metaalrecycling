import { site, emailHref, phoneHref, phoneLabel } from '../config/site.js'
import { icons } from './icons.js'
import { Button } from './ui.js'

const requestTypes = [
  'Metaal aanbieden',
  'Demontage aanvragen',
  'Recycling aanvragen',
  'Machine / installatie',
  'Kabels / transformatoren',
  'Ophalen / afvoer',
  'Ander verzoek',
]

export function CTASection() {
  return `
    <section class="cta-section" id="contact" aria-labelledby="cta-title">
      <div class="container cta-section__inner">
        <div class="cta-section__copy">
          <h2 id="cta-title">Metaal verkopen of iets laten demonteren?</h2>
          <p>
            Neem contact op voor een prijsindicatie, beoordeling of afspraak.
            Ook andere recycling- of demontageverzoeken beoordelen we graag.
          </p>
        </div>
        <div class="cta-section__actions">
          ${Button({
            href: phoneHref(),
            label: `Bel ${phoneLabel()}`,
            variant: 'primary',
            size: 'lg',
            icon: icons.phone,
          })}
          ${Button({
            href: emailHref(),
            label: 'E-mail ons',
            variant: 'on-dark',
            size: 'lg',
            icon: icons.mail,
          })}
          ${Button({
            href: '#contact-form',
            label: 'Stuur uw verzoek',
            variant: 'on-dark',
            size: 'lg',
          })}
        </div>
      </div>
    </section>

    <section class="section contact-form-section" id="contact-form" aria-labelledby="form-title">
      <div class="container contact-form-layout">
        <div class="contact-form-intro">
          <p class="section-header__eyebrow">Verzoek indienen</p>
          <h2 id="form-title" class="section-header__title">Stuur uw recycling- of demontageverzoek</h2>
          <p class="contact-form-intro__text">
            Heeft u een materiaal, machine, installatie of ander object dat u wilt laten
            recyclen of demonteren? Beschrijf hieronder uw situatie en stuur indien mogelijk
            foto’s mee.
          </p>
          <p class="contact-form-intro__note">
            Wij verwerken meer dan alleen de voorbeelden op deze website. Voor andere
            recycling-, demontage- of afvoerverzoeken kunt u altijd contact opnemen.
          </p>
          <ul class="contact-form-intro__facts">
            <li>${icons.phone}<a href="${phoneHref()}">${phoneLabel()}</a></li>
            <li>${icons.mail}<a href="${emailHref()}">${site.email}</a></li>
          </ul>
        </div>

        <form class="contact-form" id="request-form" novalidate>
          <div class="form-row">
            <label class="form-field" for="request-name">
              <span>Naam</span>
              <input id="request-name" name="name" type="text" autocomplete="name" required />
            </label>
            <label class="form-field" for="request-phone">
              <span>Telefoon</span>
              <input id="request-phone" name="phone" type="tel" autocomplete="tel" required />
            </label>
          </div>

          <label class="form-field" for="request-email">
            <span>E-mail</span>
            <input id="request-email" name="email" type="email" autocomplete="email" required />
          </label>

          <label class="form-field" for="request-type">
            <span>Type verzoek</span>
            <select id="request-type" name="type" required>
              <option value="">Maak een keuze</option>
              ${requestTypes
                .map((type) => `<option value="${type}">${type}</option>`)
                .join('')}
            </select>
          </label>

          <label class="form-field form-field--other is-hidden" id="request-other-wrap" for="request-other">
            <span>Omschrijf uw verzoek</span>
            <input
              id="request-other"
              name="other"
              type="text"
              placeholder="Bijv. gemengde partij, speciale constructie, onbekend materiaal…"
            />
          </label>

          <label class="form-field" for="request-message">
            <span>Omschrijving</span>
            <textarea
              id="request-message"
              name="message"
              rows="5"
              required
              placeholder="Korte omschrijving van het materiaal, object of project. U kunt in de e-mail ook foto’s toevoegen."
            ></textarea>
          </label>

          <p class="contact-form__hint">
            Na het versturen opent uw e-mailprogramma. Voeg indien mogelijk foto’s toe aan
            het bericht, zodat we uw aanvraag sneller kunnen beoordelen.
          </p>

          <button class="btn btn--primary btn--lg" type="submit">
            <span>Verstuur verzoek</span>
            ${icons.arrow}
          </button>
        </form>
      </div>
    </section>
  `
}
