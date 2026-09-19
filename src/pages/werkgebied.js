import './../style.css'
import { mountPage } from '../js/page.js'
import { site, mapsHref, phoneHref } from '../config/site.js'
import { icons } from '../components/icons.js'
import { PageHero, BandCta } from '../components/page-sections.js'

const highlights = [
  { title: 'Heel Groningen', text: 'Particulier en zakelijk in de provincie.' },
  { title: 'Buiten Groningen', text: 'Ook mogelijk, afhankelijk van de opdracht.' },
  { title: 'Voorrijkosten', text: 'Buiten de regio in overleg per project.' },
  { title: 'Op aanvraag', text: 'We beoordelen locatie en bereikbaarheid.' },
]

mountPage({
  pageId: 'werkgebied',
  title: 'Werkgebied | Duurzaam Metaal Recycling',
  description:
    'Duurzaam Metaal Recycling werkt in heel Groningen en daarbuiten. Gevestigd in Foxhol. Voorrijkosten buiten de regio in overleg.',
  content: `
    ${PageHero({
      label: 'Werkgebied',
      title: 'Heel Groningen — en daarbuiten',
      text: 'Wij werken in heel Groningen voor particulieren en bedrijven. Ook buiten Groningen kunnen wij werkzaamheden uitvoeren, afhankelijk van locatie en opdracht.',
      primaryCta: {
        href: '/contact.html',
        label: 'Locatie bespreken',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel direct',
      },
    })}

    <section class="section werkgebied-highlights">
      <div class="container">
        <ul class="werkgebied-highlights__list">
          ${highlights
            .map(
              (item) => `
            <li class="werkgebied-highlights__item">
              <strong>${item.title}</strong>
              <span>${item.text}</span>
            </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>

    <section class="section werkgebied-page">
      <div class="container werkgebied-page__grid">
        <div class="werkgebied-page__copy">
          <p class="section-header__eyebrow">Vestiging</p>
          <h2>Gevestigd in Foxhol</h2>
          <address class="werkgebied-page__address">
            ${site.addressLines.join('<br />')}
          </address>
          <p>
            Vanuit Foxhol werken we voor particulieren en bedrijven in heel
            Groningen. Demontage, inkoop en recycling beoordelen we per verzoek —
            ook als de locatie buiten de directe omgeving ligt.
          </p>
          <p>
            Bij opdrachten buiten Groningen kunnen voorrijkosten of aanvullende
            afspraken gelden, afhankelijk van locatie en opdracht. Neem contact
            op voor een duidelijke beoordeling.
          </p>
          <div class="werkgebied-page__actions">
            <a class="btn btn--primary btn--sm" href="/contact.html">Contact</a>
            <a
              class="text-link"
              href="${mapsHref()}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps ${icons.arrow}
            </a>
          </div>
        </div>

        <div class="werkgebied-page__map" aria-label="Vestiging Foxhol">
          <div class="map-panel map-panel--workarea map-panel--large">
            <div class="map-panel__grid" aria-hidden="true"></div>
            <div class="map-panel__radius" aria-hidden="true"></div>
            <div class="map-panel__radius map-panel__radius--outer" aria-hidden="true"></div>
            <p class="map-panel__hint" aria-hidden="true">Groningen · indicatief</p>
            <div class="map-panel__pin">
              <span class="map-panel__marker" aria-hidden="true">${icons.map}</span>
              <div class="map-panel__pin-text">
                <strong>Foxhol</strong>
                <span>Hoofdvestiging · Groningen</span>
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
      </div>
    </section>

    <section class="section section--muted werkgebied-note">
      <div class="container werkgebied-note__inner">
        <div>
          <h2>Project buiten Groningen?</h2>
          <p>
            Ook grotere of bijzondere projecten buiten de provincie beoordelen
            we op aanvraag. Reisafstand, bereikbaarheid en type werkzaamheden
            bespreken we vooraf — zonder vaste radiusclaim.
          </p>
        </div>
        <a class="btn btn--primary" href="/contact.html?type=Ander%20verzoek">
          Project bespreken
        </a>
      </div>
    </section>

    ${BandCta({
      title: 'Weten of we bij u kunnen komen?',
      text: 'Stuur uw plaats of postcode mee — we kijken wat mogelijk is.',
      primaryCta: {
        href: '/contact.html',
        label: 'Stuur aanvraag',
      },
      secondaryCta: {
        href: phoneHref(),
        label: 'Bel direct',
        variant: 'ghost',
      },
    })}
  `,
})
