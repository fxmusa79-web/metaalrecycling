import { site } from '../config/site.js'
import { icons } from './icons.js'
import { Button } from './ui.js'

export function Hero() {
  return `
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="container hero__grid">
        <div class="hero__content">
          <p class="hero__eyebrow hero-anim">Inkoop · Recycling · Demontage</p>
          <h1 id="hero-title" class="hero-anim">
            Metaal verkopen,<br />
            demonteren of<br />
            laten recyclen
          </h1>
          <p class="hero__lead hero-anim">
            Wij kopen metalen in van particulieren en bedrijven. Daarnaast verzorgen we
            demontage, sloop en materiaalscheiding van machines, constructies en installaties.
          </p>
          <p class="hero__sub hero-anim">
            Staat uw materiaal of object er niet tussen? Neem contact op. We beoordelen wat mogelijk is.
          </p>
          <div class="hero__actions hero-anim">
            ${Button({
              href: '/contact.html?type=Metaal%20aanbieden',
              label: 'Metaal aanbieden',
              variant: 'primary',
              size: 'lg',
            })}
            ${Button({
              href: '/demontage.html',
              label: 'Demontage aanvragen',
              variant: 'ghost',
              size: 'lg',
            })}
          </div>
        </div>

        <aside class="hero__visual hero-anim hero-anim--panel" aria-label="Dienstenoverzicht">
          <div class="hero-module">
            <div class="hero-module__mark">
              <img
                src="${site.assets.logoMark}"
                alt=""
                width="160"
                height="160"
                decoding="async"
                fetchpriority="high"
              />
            </div>
            <ul class="hero-module__list">
              <li>
                <strong>Metaal inkoop</strong>
                <span>Particulier en zakelijk</span>
              </li>
              <li>
                <strong>Demontage &amp; sloop</strong>
                <span>Machines en constructies</span>
              </li>
              <li>
                <strong>Recycling</strong>
                <span>Scheiding en hergebruik</span>
              </li>
            </ul>
            <p class="hero-module__tag">Particulier · Zakelijk · Industrie</p>
          </div>
        </aside>
      </div>
    </section>
  `
}
