import { icons } from './icons.js'

const options = [
  {
    id: 'metaal',
    title: 'Metaal verkopen',
    hint: 'Losse metalen of partijen',
  },
  {
    id: 'machine',
    title: 'Machine of installatie',
    hint: 'Machines en onderdelen',
  },
  {
    id: 'demontage',
    title: 'Demontage & sloop',
    hint: 'Constructies en projecten',
  },
  {
    id: 'ander',
    title: 'Ander recyclingverzoek',
    hint: 'Speciale of onbekende objecten',
  },
]

function photoField(id) {
  return `
    <div class="form-field form-field--upload">
      <span>Foto’s</span>
      <label class="upload-box" for="${id}">
        <input
          id="${id}"
          class="js-photo-input"
          name="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          multiple
          data-max-files="6"
          data-max-mb="5"
        />
        <span class="upload-box__text">
          ${icons.camera}
          <strong>Voeg foto’s toe</strong>
          <em>JPG, PNG of WEBP · max. 6 bestanden</em>
        </span>
      </label>
      <ul class="upload-preview js-photo-preview" aria-live="polite"></ul>
      <p class="upload-note">
        Bij verzenden via e-mail voegt u geselecteerde foto’s handmatig toe in uw e-mailprogramma.
      </p>
    </div>
  `
}

function panels() {
  return `
    <div class="request-panels">
      <div class="request-panel" data-panel="metaal" hidden>
        <h3>Metaal verkopen</h3>
        <div class="form-row">
          <label class="form-field"><span>Materiaaltype</span><input name="materiaal" type="text" placeholder="Bijv. koper, aluminium, gemengd" required /></label>
          <label class="form-field"><span>Geschatte hoeveelheid</span><input name="hoeveelheid" type="text" placeholder="Bijv. 50 kg of 2 palletten" /></label>
        </div>
        <label class="form-field"><span>Locatie</span><input name="locatie" type="text" placeholder="Plaats / postcode" required /></label>
        ${photoField('photos-metaal')}
        <div class="form-row">
          <label class="form-field"><span>Naam</span><input name="name" type="text" required /></label>
          <label class="form-field"><span>Telefoon</span><input name="phone" type="tel" required /></label>
        </div>
        <label class="form-field"><span>E-mail</span><input name="email" type="email" required /></label>
      </div>

      <div class="request-panel" data-panel="machine" hidden>
        <h3>Machine of installatie</h3>
        <label class="form-field"><span>Soort machine / installatie</span><input name="soort" type="text" required /></label>
        <div class="form-row">
          <label class="form-field"><span>Afmetingen (indien bekend)</span><input name="afmetingen" type="text" placeholder="Bijv. 2 × 1 × 1,5 m" /></label>
          <label class="form-field"><span>Locatie</span><input name="locatie" type="text" required /></label>
        </div>
        <fieldset class="form-field">
          <legend>Demontage nodig?</legend>
          <div class="choice-row">
            <label><input type="radio" name="demontage_nodig" value="Ja" /> Ja</label>
            <label><input type="radio" name="demontage_nodig" value="Nee" /> Nee</label>
            <label><input type="radio" name="demontage_nodig" value="Onbekend" checked /> Onbekend</label>
          </div>
        </fieldset>
        <label class="form-field"><span>Omschrijving</span><textarea name="message" rows="4" required></textarea></label>
        ${photoField('photos-machine')}
        <div class="form-row">
          <label class="form-field"><span>Naam</span><input name="name" type="text" required /></label>
          <label class="form-field"><span>Telefoon</span><input name="phone" type="tel" required /></label>
        </div>
        <label class="form-field"><span>E-mail</span><input name="email" type="email" required /></label>
      </div>

      <div class="request-panel" data-panel="demontage" hidden>
        <h3>Demontage &amp; sloop</h3>
        <label class="form-field"><span>Type object</span><input name="object" type="text" required /></label>
        <div class="form-row">
          <label class="form-field"><span>Locatie</span><input name="locatie" type="text" required /></label>
          <label class="form-field"><span>Bereikbaarheid</span>
            <select name="bereikbaarheid">
              <option value="Buiten">Buiten</option>
              <option value="Binnen">Binnen</option>
              <option value="Gemengd">Gemengd</option>
              <option value="Onbekend">Onbekend</option>
            </select>
          </label>
        </div>
        <label class="form-field"><span>Korte projectomschrijving</span><textarea name="message" rows="4" required></textarea></label>
        ${photoField('photos-demontage')}
        <div class="form-row">
          <label class="form-field"><span>Naam</span><input name="name" type="text" required /></label>
          <label class="form-field"><span>Telefoon</span><input name="phone" type="tel" required /></label>
        </div>
        <label class="form-field"><span>E-mail</span><input name="email" type="email" required /></label>
      </div>

      <div class="request-panel" data-panel="ander" hidden>
        <h3>Ander recyclingverzoek</h3>
        <label class="form-field"><span>Omschrijving</span><textarea name="message" rows="5" required placeholder="Beschrijf wat u wilt laten recyclen, demonteren of afvoeren."></textarea></label>
        <label class="form-field"><span>Locatie</span><input name="locatie" type="text" required /></label>
        ${photoField('photos-ander')}
        <div class="form-row">
          <label class="form-field"><span>Naam</span><input name="name" type="text" required /></label>
          <label class="form-field"><span>Telefoon</span><input name="phone" type="tel" required /></label>
        </div>
        <label class="form-field"><span>E-mail</span><input name="email" type="email" required /></label>
      </div>
    </div>
  `
}

export function RequestSelector() {
  return `
    <section class="section request-section" id="aanvraag">
      <div class="container">
        <div class="request-section__intro">
          <h2>Wat wilt u laten verwerken?</h2>
          <p>Kies het type verzoek. Het formulier verschijnt eronder.</p>
        </div>

        <div class="request-selector" role="tablist" aria-label="Type verzoek">
          ${options
            .map(
              (opt) => `
            <button
              class="request-seg"
              type="button"
              role="tab"
              id="request-tab-${opt.id}"
              aria-selected="false"
              aria-controls="request-form-${opt.id}"
              data-request="${opt.id}"
            >
              <span class="request-seg__title">${opt.title}</span>
              <span class="request-seg__hint">${opt.hint}</span>
            </button>`
            )
            .join('')}
        </div>

        <form class="request-form contact-form" id="interactive-request-form" hidden novalidate>
          <input type="hidden" name="request_kind" id="request-kind" value="" />
          ${panels()}
          <p class="form-error" id="request-form-error" hidden></p>
          <button class="btn btn--primary btn--lg" type="submit">
            <span>Verstuur aanvraag</span>
            ${icons.arrow}
          </button>
        </form>
      </div>
    </section>
  `
}
