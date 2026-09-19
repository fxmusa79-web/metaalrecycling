/**
 * Real company photography only.
 * AI-generated /pictures/heros assets are not used on the live site.
 */

/** Homepage hero — desktop / tablet (≥768px) */
export const homepageHeroDesktop = {
  src: '/images/hero-nieuw.jpg',
  alt: 'Bedrijfsvoertuigen van Duurzaam Metaal Recycling op het terrein',
  width: 1280,
  height: 714,
  position: '58% 48%',
}

/** Homepage hero — phones (<768px), dedicated portrait photo */
export const homepageHeroMobile = {
  src: '/images/hero-telefoon.png',
  alt: 'Bedrijfsvoertuigen van Duurzaam Metaal Recycling, mobiele weergave',
  width: 941,
  height: 1672,
  /** Keep branded truck + crane in lower frame; sky for text */
  position: 'center 68%',
}

/** @deprecated use homepageHeroDesktop / homepageHeroMobile */
export const homepageHero = homepageHeroDesktop

/**
 * Subpage photo heroes — real project / facility photos (not AI).
 * Same PageHero system on every public subpage with a photo top.
 */
export const subpageHeroes = {
  'metaal-inkoop': {
    src: '/images/kabel.jpg',
    position: 'center 55%',
    positionMobile: 'center 50%',
  },
  recycling: {
    src: '/images/transformator.jpg',
    position: 'center 45%',
    positionMobile: 'center 40%',
  },
  demontage: {
    src: '/images/snij-branden.jpg',
    position: '35% 25%',
    positionMobile: '38% 28%',
  },
  materialen: {
    src: '/images/ferro.jpg',
    position: '48% 40%',
    positionMobile: '50% 38%',
  },
  werkgebied: {
    src: '/images/hero-nieuw.jpg',
    position: '62% 42%',
    positionMobile: '58% 40%',
  },
  'over-ons': {
    src: '/images/snij-branden.jpg',
    position: '32% 28%',
    positionMobile: '34% 30%',
  },
  contact: {
    src: '/images/transformator.jpg',
    position: '58% 42%',
    positionMobile: '55% 40%',
  },
}

/**
 * Project & facility photography for content sections.
 * position: object-position for cover crops.
 */
export const workImages = {
  kabel: {
    src: '/images/kabel.jpg',
    alt: 'Partij industriële kabels voor metaalrecycling',
    width: 599,
    height: 1280,
    position: 'center 58%',
    positionMobile: 'center 52%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '3 / 4',
  },
  snijBranden: {
    src: '/images/snij-branden.jpg',
    alt: 'Brand- en snijwerk tijdens demontage van een metalen installatie',
    width: 826,
    height: 1280,
    position: '32% 22%',
    positionMobile: '34% 28%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '4 / 5',
  },
  transformator: {
    src: '/images/transformator.jpg',
    alt: 'Transformatoronderdelen voor demontage en recycling',
    width: 1058,
    height: 1113,
    position: 'center 48%',
    orientation: 'square',
    cardAspect: '1 / 1',
    featureAspect: '1 / 1',
  },
  transformator2: {
    src: '/images/transformator-2.jpg',
    alt: 'Grote transformator tijdens industriële demontage',
    width: 804,
    height: 1280,
    position: '46% 30%',
    positionMobile: '48% 28%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '3 / 4',
  },
  windmolenRing: {
    src: '/images/windmolen-ring.jpg',
    alt: 'Industriële demontage van een groot metalen component met materiaalscheiding',
    width: 1280,
    height: 1260,
    position: '42% 48%',
    positionMobile: '40% 46%',
    orientation: 'square',
    cardAspect: '4 / 5',
    featureAspect: '4 / 3',
  },
  ferro: {
    src: '/images/ferro.jpg',
    alt: 'Ferro metalen en staal voor recycling',
    width: 1144,
    height: 863,
    position: '48% 42%',
    positionMobile: '50% 40%',
    orientation: 'landscape',
    cardAspect: '5 / 4',
    featureAspect: '5 / 4',
  },
  nonFerro: {
    src: '/images/non-ferro.jpg',
    alt: 'Non-ferro metalen voor recycling',
    width: 1120,
    height: 553,
    position: '38% 55%',
    positionMobile: '35% 52%',
    orientation: 'landscape',
    cardAspect: '16 / 9',
    featureAspect: '16 / 10',
  },
  kabels: {
    src: '/images/kabels.jpg',
    alt: 'Kabelpartijen met metaalhoudende leidingen',
    width: 591,
    height: 1280,
    position: 'center 42%',
    positionMobile: 'center 40%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '3 / 4',
  },
  motoren: {
    src: '/images/motoren.jpg',
    alt: 'Elektromotoren en metalen onderdelen',
    width: 720,
    height: 1280,
    position: 'center 38%',
    positionMobile: 'center 36%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '3 / 4',
  },
  machines: {
    src: '/images/machines.jpg',
    alt: 'Industriële machines en metalen onderdelen',
    width: 1080,
    height: 651,
    position: '58% 48%',
    positionMobile: '55% 45%',
    orientation: 'landscape',
    cardAspect: '5 / 3',
    featureAspect: '16 / 10',
  },
}

/**
 * Homepage “Werk in de praktijk” — three real project photos max.
 * Windmolen ring is reserved for the featured services block — do not reuse here.
 */
export const workPracticeCards = [
  {
    id: 'trafo',
    image: 'transformator2',
    title: 'Transformatoren',
    href: '/demontage.html#installaties',
    size: 'large',
  },
  {
    id: 'snij',
    image: 'snijBranden',
    title: 'Brand- en snijwerk',
    href: '/demontage.html#brand-snijwerk',
    size: 'medium',
  },
  {
    id: 'kabels',
    image: 'kabel',
    title: 'Kabelpartijen',
    href: '/materialen.html#kabels',
    size: 'small',
  },
]
