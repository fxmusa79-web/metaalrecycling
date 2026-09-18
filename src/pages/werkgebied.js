import './../style.css'
import { mountPage } from '../js/page.js'
import { site, mapsHref, phoneHref } from '../config/site.js'
import { Button } from '../components/ui.js'
import { icons } from '../components/icons.js'
import { CTASection } from '../components/contact.js'
import { PageHero, BandCta } from '../components/page-sections.js'

mountPage({
  pageId: 'werkgebied',
  title: 'Werkgebied | Duurzaam Metaal Recycling',
  description:
    'Duurzaam Metaal Recycling is gevestigd in Foxhol en werkt voor particulieren en bedrijven in de regio en daarbuiten, afhankelijk van de opdracht.',
  content: `
    ${PageHero({
      label: 'Werkgebied',
      title: 'Werkgebied &amp; bereikbaarheid',
      text: 'Wij zijn gevestigd in Foxhol en werken vanuit daar voor particulieren en bedrijven in de regio en daarbuiten, afhankelijk van de opdracht.',
    })}

    <section class="section werkgebied-page">
      <div class="container werkgebied-page__grid">
        <div class="werkgebied-page__copy">
          <h2>Gevestigd in Foxhol</h2>
          <address class="werkgebied-page__address">
            ${site.addressLines.join('<br />')}
          </address>
          <p>
            Voor grotere projecten, demontage en zakelijke partijen bekijken we per aanvraag
            wat praktisch mogelijk is.
          </p>
          <div class="werkgebied-page__actions">
            ${Button({
              href: mapsHref(),
              label: 'Open in Google Maps',
              variant: 'secondary',
              size: 'md',
              attrs: 'target="_blank" rel="noopener noreferrer"',
            })}
            ${Button({
              href: '/contact.html',
              label: 'Contact opnemen',
              variant: 'primary',
              size: 'md',
            })}
          </div>
        </div>
        <div class="werkgebied-page__map" aria-label="Kaartregio Foxhol">
          <div class="map-panel map-panel--large">
            <div class="map-panel__grid" aria-hidden="true"></div>
            <div class="map-panel__radius" aria-hidden="true"></div>
            <div class="map-panel__radius map-panel__radius--outer" aria-hidden="true"></div>
            <div class="map-panel__pin">
              <span class="map-panel__dot"></span>
              <strong>Foxhol</strong>
            </div>
            <p class="map-panel__address">${site.addressLines.join('<br />')}</p>
          </div>
        </div>
      </div>
    </section>

    ${BandCta({
      title: 'Ook buiten de regio?',
      text: 'Grotere partijen of projecten buiten de directe omgeving kunnen op aanvraag worden beoordeeld.',
      primaryCta: {
        href: '/contact.html?type=Ander%20verzoek',
        label: 'Project bespreken',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel direct',
        icon: icons.phone,
      },
    })}

    ${CTASection()}
  `,
})
