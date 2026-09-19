import { site } from '../config/site.js'
import { icons } from './icons.js'

/**
 * Compact Google Business Profile / review trust band.
 * No invented ratings, review counts, or customer quotes.
 */
export function GoogleTrust() {
  return `
    <section class="section google-trust" id="google" aria-labelledby="google-trust-title">
      <div class="container">
        <div class="google-trust__band">
          <div class="google-trust__mark" aria-hidden="true">
            ${icons.google}
          </div>
          <div class="google-trust__copy">
            <h2 id="google-trust-title">Bekijk ons op Google</h2>
            <p>Bekijk ons bedrijfsprofiel of deel uw ervaring via Google.</p>
          </div>
          <div class="google-trust__actions">
            <a
              class="btn btn--sm btn--secondary google-trust__profile"
              href="${site.googleProfileUrl}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bekijk Duurzaam Metaal Recycling op Google"
            >
              Bekijk Google-profiel
            </a>
            <a
              class="btn btn--sm btn--primary google-trust__review"
              href="${site.googleReviewUrl}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schrijf een Google review voor Duurzaam Metaal Recycling"
            >
              Schrijf een review
            </a>
          </div>
        </div>
      </div>
    </section>
  `
}

/** Compact footer Google link group */
export function FooterGoogleLinks() {
  return `
    <div class="site-footer__google">
      <p class="site-footer__google-label">
        <span class="site-footer__google-icon" aria-hidden="true">${icons.google}</span>
        Bekijk ons op Google
      </p>
      <ul class="site-footer__google-links">
        <li>
          <a
            href="${site.googleProfileUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bekijk Duurzaam Metaal Recycling op Google"
          >Google-profiel</a>
        </li>
        <li>
          <a
            href="${site.googleReviewUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Schrijf een Google review voor Duurzaam Metaal Recycling"
          >Review schrijven</a>
        </li>
      </ul>
    </div>
  `
}
