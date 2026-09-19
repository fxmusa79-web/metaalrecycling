import { site, phoneHref, emailHref, phoneLabel, emailLabel, mapsHref } from '../config/site.js'
import { requestTypes } from '../config/content.js'
import { icons } from './icons.js'

function photoField() {
  return `
    <div class="form-field form-field--upload">
      <span>Foto’s</span>
      <p class="upload-lead">Voeg foto’s toe voor een snellere beoordeling.</p>
      <div class="upload-actions">
        <label class="upload-box upload-box--action" for="contact-photos-camera">
          <input
            id="contact-photos-camera"
            class="js-photo-input"
            name="photos"
            type="file"
            accept="image/*"
            capture="environment"
            data-max-files="6"
            data-max-mb="5"
            data-photo-group="contact"
          />
          <span class="upload-box__text">
            ${icons.camera}
            <strong>Camera</strong>
          </span>
        </label>
        <label class="upload-box upload-box--action" for="contact-photos-library">
          <input
            id="contact-photos-library"
            class="js-photo-input"
            name="photos"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            data-max-files="6"
            data-max-mb="5"
            data-photo-group="contact"
          />
          <span class="upload-box__text">
            ${icons.camera}
            <strong>Fotobibliotheek</strong>
          </span>
        </label>
      </div>
      <ul class="upload-preview js-photo-preview" data-photo-group="contact" aria-live="polite"></ul>
      <p class="upload-feedback js-photo-feedback" data-photo-group="contact" hidden></p>
      <p class="upload-note">JPG, PNG of WEBP · max. 5 MB per foto · max. 6 foto’s</p>
    </div>
  `
}

export function ContactForm({ compact = false } = {}) {
  return `
    <form class="contact-form contact-form--refined" id="request-form" novalidate>
      <p class="contact-form__lead">
        Korte omschrijving en eventueel foto’s.
      </p>

      <div class="form-group">
        <p class="form-group__label">Contactgegevens</p>
        <div class="form-row">
          <label class="form-field" for="request-name">
            <span>Naam *</span>
            <input id="request-name" name="name" type="text" autocomplete="name" required />
            <span class="field-error" data-error-for="name" hidden></span>
          </label>
          <label class="form-field" for="request-company">
            <span>Bedrijf (optioneel)</span>
            <input id="request-company" name="company" type="text" autocomplete="organization" />
          </label>
        </div>

        <div class="form-row">
          <label class="form-field" for="request-phone">
            <span>Telefoon *</span>
            <input id="request-phone" name="phone" type="tel" autocomplete="tel" required />
            <span class="field-error" data-error-for="phone" hidden></span>
          </label>
          <label class="form-field" for="request-email">
            <span>E-mail *</span>
            <input id="request-email" name="email" type="email" autocomplete="email" required />
            <span class="field-error" data-error-for="email" hidden></span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <p class="form-group__label">Aanvraag</p>
        <label class="form-field" for="request-type">
          <span>Type aanvraag *</span>
          <select id="request-type" name="type" required>
            <option value="">Maak een keuze</option>
            ${requestTypes.map((type) => `<option value="${type}">${type}</option>`).join('')}
          </select>
          <span class="field-error" data-error-for="type" hidden></span>
        </label>

        <label class="form-field form-field--other is-hidden" id="request-other-wrap" for="request-other">
          <span>Omschrijf uw verzoek *</span>
          <input id="request-other" name="other" type="text" />
          <span class="field-error" data-error-for="other" hidden></span>
        </label>

        <label class="form-field" for="request-location">
          <span>Locatie</span>
          <input id="request-location" name="location" type="text" placeholder="Plaats / postcode" />
        </label>

        <label class="form-field" for="request-message">
          <span>Omschrijving *</span>
          <textarea id="request-message" name="message" rows="4" required></textarea>
          <span class="field-error" data-error-for="message" hidden></span>
        </label>
      </div>

      <div class="form-group">
        <p class="form-group__label">Foto’s</p>
        ${photoField()}
      </div>

      <label class="form-check" for="request-privacy">
        <input id="request-privacy" name="privacy" type="checkbox" required />
        <span>Ik ga akkoord met het verwerken van mijn gegevens voor deze aanvraag. *</span>
      </label>
      <span class="field-error" data-error-for="privacy" hidden></span>

      <div class="turnstile-slot" data-turnstile-slot hidden></div>

      <p class="form-error" id="request-form-error" hidden></p>
      <div class="form-success" id="request-form-success" hidden></div>

      <button class="btn btn--primary btn--lg contact-form__submit" type="submit">
        <span>Verstuur aanvraag</span>
      </button>
    </form>
  `
}

export function ContactInfo() {
  return `
    <div class="contact-info">
      <h2 class="contact-info__heading">Gegevens</h2>
      <p class="contact-info__text">
        Foxhol · particulier en zakelijk.
      </p>
      <ul class="contact-info__list">
        <li>
          <strong>Telefoon</strong>
          <a href="${phoneHref()}">${phoneLabel()}</a>
        </li>
        <li>
          <strong>E-mail</strong>
          <a href="${emailHref()}">${emailLabel()}</a>
        </li>
        <li>
          <strong>Adres</strong>
          <a href="${mapsHref()}" target="_blank" rel="noopener noreferrer">
            ${site.addressLines.join('<br />')}
          </a>
        </li>
      </ul>
    </div>
  `
}

export function CTASection() {
  return `
    <section class="cta-section cta-section--home" id="contact" aria-labelledby="cta-title">
      <div class="container cta-section__inner">
        <div class="cta-section__copy">
          <h2 id="cta-title">Liever direct contact?</h2>
          <p>
            Bel of mail — of start hierboven een aanvraag met foto’s.
          </p>
        </div>
        <div class="cta-section__actions">
          <a class="btn btn--primary btn--lg" href="${phoneHref()}">
            <span>Bel ${phoneLabel()}</span>
          </a>
          <a class="btn btn--ghost btn--lg" href="${emailHref()}">
            <span>${emailLabel()}</span>
          </a>
        </div>
      </div>
    </section>
  `
}
