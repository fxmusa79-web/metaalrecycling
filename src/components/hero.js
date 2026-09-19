import { Button } from './ui.js'
import { desktopHeroImages, mobileHeroImages } from '../config/media.js'

function renderSlides(slides) {
  return slides
    .map((slide, index) => {
      const isFirst = index === 0
      const bg = isFirst ? ` background-image:url('${slide.src}');` : ''
      const dataBg = isFirst ? '' : `data-hero-src="${slide.src}"`
      return `
        <div
          class="hero__slide${isFirst ? ' is-active' : ''}"
          style="--hero-pos:${slide.position};${bg}"
          data-hero-slide
          data-hero-overlay="${slide.overlay || 'standard'}"
          ${dataBg}
          role="img"
          aria-label="${slide.alt}"
        ></div>`
    })
    .join('')
}

export function Hero() {
  return `
    <section
      class="hero hero--photo"
      id="top"
      aria-labelledby="hero-title"
      data-hero
      data-hero-breakpoint="768"
      data-hero-first-desktop="${desktopHeroImages[0].src}"
      data-hero-first-mobile="${mobileHeroImages[0].src}"
    >
      <div class="hero__slides" data-hero-slides aria-hidden="true">
        <div class="hero__set hero__set--desktop is-active-set" data-hero-set="desktop">
          ${renderSlides(desktopHeroImages)}
        </div>
        <div class="hero__set hero__set--mobile" data-hero-set="mobile">
          ${renderSlides(mobileHeroImages)}
        </div>
      </div>

      <div class="hero__veil" data-hero-veil aria-hidden="true"></div>

      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__eyebrow hero-anim">Inkoop · Recycling · Demontage</p>
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
