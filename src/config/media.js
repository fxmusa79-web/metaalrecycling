/**
 * Project & facility photography + hero system.
 *
 * ============================================================
 * HERO IMAGE AUDIT — /pictures/heros/ (mirrored in public/images/heros/)
 * ============================================================
 *
 * LANDSCAPE 1672×941 (ar 1.777) — desktop candidates
 * -------------------------------------------------
 * yard-crane.png        DESKTOP  crane right, open left yard — excellent text space
 * cables-yard.png       DESKTOP  cables/grapple right — excellent left negative space
 * facility-bay.png      DESKTOP  misty bay, coils right — clean left sky/floor
 * demolition-site.png   DESKTOP  excavator demontage — strong, left sky for text
 *                        (reserved for services/subpages to avoid homepage repeat)
 * facility-sunset.png   DESKTOP  sunset yard — strong, similar to yard-crane (alt)
 * yard-dusk.png         DESKTOP  dusk yard — near-duplicate of facility-bay (alt/skip)
 *
 * PORTRAIT 941×1672 (ar 0.563) — mobile candidates
 * ------------------------------------------------
 * yard-handler.png      MOBILE   crane + materials, dark sky top — excellent
 * cable-coils.png       MOBILE   copper cable ends lower — excellent (also work mosaic)
 * transformer-yard.png  MOBILE   transformer lower-right — excellent
 * torch-cutting.png     MOBILE   sparks lower-right — excellent demontage
 * steel-bales.png       MOBILE   crane + bales, dark sky — excellent
 * copper-cables.png     MOBILE   transformer + copper — strong (alt to transformer)
 * sorted-materials.png  MOBILE   sorted yard materials — excellent facility
 *
 * Rule: do NOT force landscape images onto mobile or portraits onto desktop.
 */

/**
 * Homepage hero — desktop / tablet (≥768px). Landscape only.
 * QA-curated (3): subject right, calm left for text; strong overlay where sun is bright.
 */
export const desktopHeroImages = [
  {
    id: 'yard-crane',
    src: '/images/heros/yard-crane.png',
    position: '72% 42%',
    overlay: 'strong',
    alt: 'Recyclingterrein met kraan en gesorteerd metaal',
    width: 1672,
    height: 941,
  },
  {
    id: 'cables-yard',
    src: '/images/heros/cables-yard.png',
    position: '78% 40%',
    overlay: 'strong',
    alt: 'Kabelpartijen en kraan op het recyclingterrein',
    width: 1672,
    height: 941,
  },
  {
    id: 'facility-bay',
    src: '/images/heros/facility-bay.png',
    position: '74% 48%',
    overlay: 'strong',
    alt: 'Metaalrecyclingfaciliteit met materialen en kraan',
    width: 1672,
    height: 941,
  },
]

/**
 * Homepage hero — mobile (<768px). Portrait only.
 * QA-curated (3): dark upper sky for text; busy subjects kept lower.
 * Dropped torch-cutting (busy sparks/scaffolding hurt calm readability).
 */
export const mobileHeroImages = [
  {
    id: 'cable-coils',
    src: '/images/heros/cable-coils.png',
    position: '48% 70%',
    overlay: 'mobile',
    alt: 'Kabelpartijen en koper op het recyclingterrein',
    width: 941,
    height: 1672,
  },
  {
    id: 'sorted-materials',
    src: '/images/heros/sorted-materials.png',
    position: '50% 66%',
    overlay: 'mobile',
    alt: 'Gesorteerde materialen en faciliteit bij schemering',
    width: 941,
    height: 1672,
  },
  {
    id: 'steel-bales',
    src: '/images/heros/steel-bales.png',
    position: '52% 68%',
    overlay: 'mobile',
    alt: 'Staalbundels en kraan op het recyclingterrein',
    width: 941,
    height: 1672,
  },
]

/** @deprecated use desktopHeroImages / mobileHeroImages */
export const heroSlides = desktopHeroImages.map((slide) => ({
  src: slide.src,
  position: slide.position,
  positionMobile: slide.position,
  alt: slide.alt,
}))

/**
 * Static subpage hero backgrounds (from /pictures/heros only).
 * Contact / FAQ / werkgebied stay text-oriented.
 */
export const subpageHeroes = {
  'metaal-inkoop': {
    src: '/images/heros/cables-yard.png',
    position: '75% 45%',
    positionMobile: '80% 40%',
  },
  recycling: {
    src: '/images/heros/facility-bay.png',
    position: '68% 48%',
    positionMobile: '72% 42%',
  },
  demontage: {
    src: '/images/heros/demolition-site.png',
    position: '70% 40%',
    positionMobile: '78% 38%',
  },
  materialen: {
    src: '/images/heros/facility-sunset.png',
    position: '72% 42%',
    positionMobile: '78% 40%',
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
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '3 / 4',
  },
  /** Portrait — work mosaic / materialen (not in mobile hero slideshow) */
  kabelPremium: {
    src: '/images/heros/copper-cables.png',
    alt: 'Koperkabels en transformator tijdens demontage',
    width: 941,
    height: 1672,
    position: '58% 55%',
    positionMobile: '60% 58%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '4 / 5',
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
    alt: 'Groot industrieel component tijdens demontage en materiaalscheiding',
    width: 1280,
    height: 1260,
    position: '68% 48%',
    positionMobile: '62% 45%',
    orientation: 'square',
    cardAspect: '4 / 5',
    featureAspect: '5 / 4',
  },
  /** Landscape facility shot — homepage services featured only */
  demontageSite: {
    src: '/images/heros/demolition-site.png',
    alt: 'Industriële demontage en sloop op locatie',
    width: 1672,
    height: 941,
    position: '68% 40%',
    positionMobile: '75% 38%',
    orientation: 'landscape',
    cardAspect: '16 / 11',
    featureAspect: '5 / 4',
  },
}

/**
 * Homepage “Werk in de praktijk” — real project photos + one curated cable shot.
 * Avoids repeating active homepage hero slideshow assets where possible.
 */
export const workPracticeCards = [
  {
    id: 'snij',
    image: 'snijBranden',
    title: 'Brand- en snijwerk',
    href: '/demontage.html#brand-snijwerk',
  },
  {
    id: 'trafo',
    image: 'transformator2',
    title: 'Transformatoren',
    href: '/demontage.html#installaties',
  },
  {
    id: 'kabels',
    image: 'kabelPremium',
    title: 'Kabelpartijen',
    href: '/materialen.html#kabels',
  },
  {
    id: 'industrie',
    image: 'windmolenRing',
    title: 'Industriële demontage',
    href: '/demontage.html#industriële-onderdelen',
  },
]
