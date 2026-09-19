import './../style.css'
import { mountPage } from '../js/page.js'
import { site, mapsHref, phoneHref } from '../config/site.js'
import { icons } from '../components/icons.js'
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
      text: 'Gevestigd in Foxhol. Wij werken voor particulieren en bedrijven in de regio en daarbuiten, afhankelijk van de opdracht.',
    })}

    <section class="section werkgebied-page">
      <div class="container werkgebied-page__grid">
        <div class="werkgebied-page__copy">
          <h2>Gevestigd in Foxhol</h2>
          <address class="werkgebied-page__address">
            ${site.addressLines.join('<br />')}
          </address>
          <p>
            Voor grotere projecten, demontage en zakelijke partijen
            bekijken we per aanvraag wat mogelijk is.
          </p>
          <div class="werkgebied-page__actions">
            <a class="text-link" href="${mapsHref()}" target="_blank" rel="noopener noreferrer">
              Google Maps ${icons.arrow}
            </a>
            <a class="text-link text-link--muted" href="/contact.html">
              Contact ${icons.arrow}
            </a>
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
      text: 'Grotere partijen of projecten buiten de directe omgeving beoordelen we op aanvraag.',
      primaryCta: {
        href: '/contact.html?type=Ander%20verzoek',
        label: 'Contact',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel direct',
        variant: 'ghost',
      },
    })}
  `,
})
