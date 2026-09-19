import { site, mapsHref } from '../config/site.js'
import { icons } from './icons.js'
import { Button } from './ui.js'

export function WorkArea() {
  return `
    <section class="section workarea-section" id="werkgebied-home">
      <div class="container workarea">
        <div class="workarea__content reveal">
          <p class="section-header__eyebrow">Werkgebied</p>
          <h2>Gevestigd in ${site.city}</h2>
          <p class="workarea__lead">
            Vanuit Foxhol werken we voor particulieren en bedrijven in de regio
            en daarbuiten, afhankelijk van de opdracht.
          </p>
          <p class="workarea__prompt">
            Wilt u weten of we voor uw locatie iets kunnen betekenen?
            Vul uw plaats of postcode in.
          </p>

          <form class="location-check" id="location-check-form" novalidate>
            <label class="location-check__label" for="location-check-input">
              Waar bevindt het project zich?
            </label>
            <div class="location-check__row">
              <input
                id="location-check-input"
                class="location-check__input"
                name="project_location"
                type="text"
                autocomplete="address-level2"
                placeholder="Plaats of postcode"
                required
              />
              <button class="btn btn--primary btn--sm location-check__submit" type="submit">
                Check locatie
              </button>
            </div>
            <p class="location-check__error" id="location-check-error" hidden></p>

            <div class="location-check__result" id="location-check-result" hidden>
              <p class="location-check__result-title">Locatie ontvangen</p>
              <p class="location-check__result-text">
                Voor <strong data-location-value></strong> bekijken we graag wat mogelijk is.
              </p>
              <a class="btn btn--primary btn--sm" href="#aanvraag" data-location-cta>
                Stuur aanvraag
              </a>
            </div>
          </form>
        </div>

        <div class="workarea__map reveal" aria-label="Vestiging Foxhol">
          <div class="map-panel map-panel--workarea">
            <div class="map-panel__grid" aria-hidden="true"></div>
            <div class="map-panel__radius" aria-hidden="true"></div>
            <p class="map-panel__hint" aria-hidden="true">Omgeving Foxhol · indicatief</p>

            <div class="map-panel__pin">
              <span class="map-panel__marker" aria-hidden="true">${icons.map}</span>
              <div class="map-panel__pin-text">
                <strong>Foxhol</strong>
                <span>Hoofdvestiging</span>
              </div>
            </div>

            <address class="map-panel__address">
              ${site.addressLines.join('<br />')}
            </address>

            <a
              class="map-panel__maps text-link"
              href="${mapsHref()}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps ${icons.arrow}
            </a>
          </div>
        </div>

        <aside class="workarea__aside reveal">
          <p class="workarea__aside-title">Project buiten de regio?</p>
          <p class="workarea__aside-text">
            Ook grotere of bijzondere projecten buiten de directe omgeving
            beoordelen we op aanvraag.
          </p>
          ${Button({
            href: '#aanvraag',
            label: 'Project bespreken',
            variant: 'ghost',
            size: 'sm',
            attrs: 'data-location-discuss',
          })}
        </aside>
      </div>
    </section>
  `
}
