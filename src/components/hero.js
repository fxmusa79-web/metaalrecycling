import { Button } from './ui.js'
import { homepageHeroDesktop, homepageHeroMobile } from '../config/media.js'

export function Hero() {
  const desktop = homepageHeroDesktop
  const mobile = homepageHeroMobile

  return `
    <section
      class="hero hero--photo"
      id="top"
      aria-labelledby="hero-title"
    >
      <div class="hero__media" aria-hidden="true">
        <picture>
          <source
            media="(max-width: 767.98px)"
            srcset="${mobile.src}"
            width="${mobile.width}"
            height="${mobile.height}"
          />
          <img
            class="hero__img"
            src="${desktop.src}"
            alt=""
            width="${desktop.width}"
            height="${desktop.height}"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>
      <div class="hero__veil" aria-hidden="true"></div>

      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__eyebrow hero-anim">Metaal inkoop · Recycling · Demontage</p>
          <h1 id="hero-title" class="hero-anim">
            <span class="hero__title-line">Metaal verkopen,</span>
            <span class="hero__title-line">demonteren of</span>
            <span class="hero__title-line">laten recyclen</span>
          </h1>
          <p class="hero__lead hero-anim">
            <span class="hero__lead-full">
              Wij kopen metalen in van particulieren en bedrijven. Daarnaast verzorgen we
              demontage, sloop en materiaalscheiding van machines, constructies en installaties.
            </span>
            <span class="hero__lead-short">
              Metaal inkoop, demontage en recycling voor particulier en bedrijf.
            </span>
          </p>
          <p class="hero__sub hero-anim">
            Staat uw materiaal of object er niet tussen? Neem contact op.
            We beoordelen wat mogelijk is.
          </p>
          <div class="hero__actions hero-anim">
            ${Button({
              href: '/#aanvraag',
              label: 'Aanvraag starten',
              variant: 'primary',
              size: 'lg',
            })}
            ${Button({
              href: '/contact.html?type=Demontage%20%26%20sloop',
              label: 'Demontage aanvragen',
              variant: 'ghost',
              size: 'lg',
            })}
          </div>
        </div>
      </div>
    </section>
  `
}
