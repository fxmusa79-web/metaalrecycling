import { icons } from './icons.js'

const options = [
  {
    id: 'metaal',
    title: 'Metaal verkopen',
    hint: 'Losse metalen of partijen',
    label: 'Metaal verkopen',
  },
  {
    id: 'machine',
    title: 'Machine / installatie',
    hint: 'Machines en onderdelen',
    label: 'Machine / installatie',
  },
  {
    id: 'demontage',
    title: 'Demontage & sloop',
    hint: 'Constructies en projecten',
    label: 'Demontage & sloop',
  },
  {
    id: 'kabels',
    title: 'Kabels / transformator',
    hint: 'Kabels, trafo’s en componenten',
    label: 'Kabels / transformator',
  },
  {
    id: 'ander',
    title: 'Ander verzoek',
    hint: 'Speciale of onbekende objecten',
    label: 'Ander verzoek',
  },
]

function photoField(id) {
  return `
    <div class="form-field form-field--upload">
      <span>Foto’s</span>
      <p class="upload-lead">Voeg foto’s toe voor een snellere beoordeling.</p>
      <div class="upload-actions">
        <label class="upload-box upload-box--action" for="${id}-camera">
          <input
            id="${id}-camera"
            class="js-photo-input"
            name="photos"
            type="file"
            accept="image/*"
            capture="environment"
            data-max-files="6"
            data-max-mb="5"
            data-photo-group="${id}"
          />
          <span class="upload-box__text">
            ${icons.camera}
            <strong>Camera</strong>
          </span>
        </label>
        <label class="upload-box upload-box--action" for="${id}-library">
          <input
            id="${id}-library"
            class="js-photo-input"
            name="photos"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            multiple
            data-max-files="6"
            data-max-mb="5"
            data-photo-group="${id}"
          />
          <span class="upload-box__text">
            ${icons.camera}
            <strong>Fotobibliotheek</strong>
          </span>
        </label>
      </div>
      <ul class="upload-preview js-photo-preview" data-photo-group="${id}" aria-live="polite"></ul>
      <p class="upload-feedback js-photo-feedback" data-photo-group="${id}" hidden></p>
      <p class="upload-note">JPG, PNG of WEBP · max. 5 MB per foto · max. 6 foto’s</p>
    </div>
  `
}

function typeFields() {
  return `
    <div class="request-step" data-step="2" hidden>
      <div class="request-panel" data-panel="metaal" hidden>
        <div class="form-row">
          <label class="form-field"><span>Materiaaltype</span><input name="materiaal" type="text" placeholder="Bijv. koper, aluminium, gemengd" /></label>
          <label class="form-field"><span>Geschatte hoeveelheid</span><input name="hoeveelheid" type="text" placeholder="Bijv. 50 kg of 2 palletten" /></label>
        </div>
        <label class="form-field"><span>Locatie</span><input name="locatie" type="text" placeholder="Plaats / postcode" /></label>
        <label class="form-field"><span>Omschrijving</span><textarea name="message" rows="3" placeholder="Korte toelichting (optioneel)"></textarea></label>
      </div>

      <div class="request-panel" data-panel="machine" hidden>
        <label class="form-field"><span>Soort machine / installatie</span><input name="soort" type="text" /></label>
        <div class="form-row">
          <label class="form-field"><span>Afmetingen (indien bekend)</span><input name="afmetingen" type="text" placeholder="Bijv. 2 × 1 × 1,5 m" /></label>
          <label class="form-field"><span>Locatie</span><input name="locatie" type="text" /></label>
        </div>
        <fieldset class="form-field">
          <legend>Demontage nodig?</legend>
          <div class="choice-row">
            <label><input type="radio" name="demontage_nodig" value="Ja" /> Ja</label>
            <label><input type="radio" name="demontage_nodig" value="Nee" /> Nee</label>
            <label><input type="radio" name="demontage_nodig" value="Onbekend" checked /> Onbekend</label>
          </div>
        </fieldset>
        <label class="form-field"><span>Omschrijving</span><textarea name="message" rows="3"></textarea></label>
      </div>

      <div class="request-panel" data-panel="demontage" hidden>
        <label class="form-field"><span>Type object</span><input name="object" type="text" /></label>
        <div class="form-row">
          <label class="form-field"><span>Locatie</span><input name="locatie" type="text" /></label>
          <label class="form-field"><span>Bereikbaarheid</span>
            <select name="bereikbaarheid">
              <option value="Buiten">Buiten</option>
              <option value="Binnen">Binnen</option>
              <option value="Gemengd">Gemengd</option>
              <option value="Onbekend">Onbekend</option>
            </select>
          </label>
        </div>
        <label class="form-field"><span>Korte projectomschrijving</span><textarea name="message" rows="3"></textarea></label>
      </div>

      <div class="request-panel" data-panel="kabels" hidden>
        <label class="form-field"><span>Soort materiaal</span>
          <select name="soort_materiaal">
            <option value="Kabels">Kabels</option>
            <option value="Transformator">Transformator</option>
            <option value="Kabels en transformator">Kabels en transformator</option>
            <option value="Overig">Overig</option>
          </select>
        </label>
        <div class="form-row">
          <label class="form-field"><span>Geschatte hoeveelheid</span><input name="hoeveelheid" type="text" placeholder="Bijv. 200 kg of 1 stuk" /></label>
          <label class="form-field"><span>Locatie</span><input name="locatie" type="text" /></label>
        </div>
        <label class="form-field"><span>Omschrijving</span><textarea name="message" rows="3"></textarea></label>
      </div>

      <div class="request-panel" data-panel="ander" hidden>
        <label class="form-field"><span>Omschrijving</span><textarea name="message" rows="4" placeholder="Beschrijf wat u wilt laten recyclen, demonteren of afvoeren."></textarea></label>
        <label class="form-field"><span>Locatie</span><input name="locatie" type="text" /></label>
      </div>
    </div>
  `
}

export function RequestSelector() {
  return `
    <section class="section request-section" id="aanvraag">
      <div class="container request-section__layout">
        <div class="request-section__intro">
          <h2>Aanvraag starten</h2>
          <p>In een paar korte stappen — met foto’s voor een snellere beoordeling.</p>
        </div>

        <form class="request-form contact-form request-stepper" id="interactive-request-form" novalidate>
          <input type="hidden" name="request_kind" id="request-kind" value="" />

          <div class="stepper-progress" aria-hidden="true">
            <span class="stepper-progress__fill" data-stepper-fill></span>
          </div>
          <p class="stepper-label" data-stepper-label>Stap 1 van 4</p>

          <div class="request-step is-active" data-step="1">
            <h3 class="request-step__title">Wat wilt u doen?</h3>
            <div class="request-selector" role="listbox" aria-label="Type verzoek">
              ${options
                .map(
                  (opt) => `
                <button
                  class="request-seg"
                  type="button"
                  role="option"
                  aria-selected="false"
                  data-request="${opt.id}"
                  data-request-label="${opt.label}"
                >
                  <span class="request-seg__title">${opt.title}</span>
                  <span class="request-seg__hint">${opt.hint}</span>
                </button>`
                )
                .join('')}
            </div>
          </div>

          ${typeFields()}

          <div class="request-step" data-step="3" hidden>
            <h3 class="request-step__title">Foto’s toevoegen</h3>
            ${photoField('stepper-photos')}
          </div>

          <div class="request-step" data-step="4" hidden>
            <h3 class="request-step__title">Uw gegevens</h3>
            <div class="form-row">
              <label class="form-field"><span>Naam *</span><input name="name" type="text" autocomplete="name" required /></label>
              <label class="form-field"><span>Bedrijf</span><input name="company" type="text" autocomplete="organization" /></label>
            </div>
            <div class="form-row">
              <label class="form-field"><span>Telefoon *</span><input name="phone" type="tel" autocomplete="tel" required /></label>
              <label class="form-field"><span>E-mail *</span><input name="email" type="email" autocomplete="email" required /></label>
            </div>
            <label class="form-check" for="stepper-privacy">
              <input id="stepper-privacy" name="privacy" type="checkbox" required />
              <span>Ik ga akkoord met het verwerken van mijn gegevens voor deze aanvraag. *</span>
            </label>
            <div class="turnstile-slot" data-turnstile-slot hidden></div>
          </div>

          <div class="request-success" data-request-success hidden>
            <h3>Aanvraag ontvangen</h3>
            <p>Bedankt. We hebben uw aanvraag ontvangen en nemen contact met u op.</p>
          </div>

          <p class="form-error" id="request-form-error" hidden></p>

          <div class="stepper-nav" data-stepper-nav>
            <button class="btn btn--ghost" type="button" data-stepper-back hidden>Terug</button>
            <button class="btn btn--primary" type="button" data-stepper-next hidden>Volgende</button>
            <button class="btn btn--primary btn--lg" type="submit" data-stepper-submit hidden>
              <span>Verstuur aanvraag</span>
              ${icons.arrow}
            </button>
          </div>
        </form>
      </div>
    </section>
  `
}
