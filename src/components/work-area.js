import { site, mapsHref } from '../config/site.js'
import { Button } from './ui.js'
import { icons } from './icons.js'

export function WorkArea() {
  return `
    <section class="section workarea-section" id="werkgebied-home">
      <div class="container workarea">
        <div class="workarea__copy reveal">
          <h2>Gevestigd in ${site.city}</h2>
          <p>
            Vanuit Foxhol werken we voor particulieren en bedrijven in de regio
            en daarbuiten, afhankelijk van de opdracht.
          </p>
          <p class="section-note">
            Project buiten de regio? Neem contact op voor de mogelijkheden.
          </p>
          <div class="workarea__actions">
            ${Button({
              href: '/werkgebied.html',
              label: 'Bekijk werkgebied',
              variant: 'primary',
              size: 'md',
            })}
            <a class="text-link" href="${mapsHref()}" target="_blank" rel="noopener noreferrer">
              Open in Google Maps ${icons.arrow}
            </a>
          </div>
        </div>
        <div class="workarea__map reveal" aria-label="Kaartregio Foxhol">
          <div class="map-panel">
            <div class="map-panel__grid" aria-hidden="true"></div>
            <div class="map-panel__radius" aria-hidden="true"></div>
            <div class="map-panel__pin">
              <span class="map-panel__dot"></span>
              <strong>Foxhol</strong>
            </div>
            <p class="map-panel__address">${site.addressLines.join('<br />')}</p>
          </div>
        </div>
      </div>
    </section>
  `
}
