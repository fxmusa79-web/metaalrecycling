import { Button } from './ui.js'
import { homepageHero } from '../config/media.js'

export function Hero() {
  const hero = homepageHero

  return `
    <section
      class="hero hero--photo"
      id="top"
      aria-labelledby="hero-title"
    >
      <div class="hero__media" aria-hidden="true">
        <img
          class="hero__img"
          src="${hero.src}"
          alt=""
          width="${hero.width}"
          height="${hero.height}"
          fetchpriority="high"
          decoding="async"
        />
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
            Wij kopen metalen in van particulieren en bedrijven. Daarnaast verzorgen we
            demontage, sloop en materiaalscheiding van machines, constructies en installaties.
          </p>
          <p class="hero__sub hero-anim">
            Staat uw materiaal of object er niet tussen? Neem contact op.
            We beoordelen wat mogelijk is.
          </p>
          <div class="hero__actions hero-anim">
            ${Button({
              href: '/contact.html?type=Metaal%20aanbieden',
              label: 'Metaal aanbieden',
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
