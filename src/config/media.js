/**
 * Real project photography — paths match files copied from /pictures
 * (extensions inspected: all .jpg).
 *
 * position: object-position tuned so the main subject stays visible
 * under cover crops. Portrait sources should not be forced into
 * ultra-wide frames on desktop.
 */
export const workImages = {
  kabel: {
    src: '/images/kabel.jpg',
    alt: 'Partij industriële kabels voor metaalrecycling',
    width: 599,
    height: 1280,
    // Bias down: hide phone status bar, keep cable mass as focus
    position: 'center 58%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '3 / 4',
  },
  snijBranden: {
    src: '/images/snij-branden.jpg',
    alt: 'Brand- en snijwerk tijdens demontage van een metalen installatie',
    width: 826,
    height: 1280,
    // Prefer worker head + spark contact over floor hose
    position: '32% 22%',
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
    // Keep crane chains, worker and copper pipes readable
    position: '46% 30%',
    orientation: 'portrait',
    cardAspect: '4 / 5',
    featureAspect: '3 / 4',
  },
  windmolenRing: {
    src: '/images/windmolen-ring.jpg',
    alt: 'Groot industrieel component tijdens demontage en materiaalscheiding',
    width: 1280,
    height: 1260,
    // Bias right so worker + opened copper section stay visible
    position: '68% 48%',
    orientation: 'square',
    cardAspect: '5 / 4',
    featureAspect: '5 / 4',
  },
}

export const workPracticeCards = [
  {
    id: 'snij',
    image: 'snijBranden',
    featured: true,
    title: 'Brand- en snijwerk',
    text: '',
    href: '/demontage.html#brand-snijwerk',
  },
  {
    id: 'trafo',
    image: 'transformator2',
    title: 'Transformatoren',
    text: '',
    href: '/demontage.html#installaties',
  },
  {
    id: 'kabels',
    image: 'kabel',
    title: 'Kabelpartijen',
    text: '',
    href: '/materialen.html#kabels',
  },
  {
    id: 'industrie',
    image: 'windmolenRing',
    title: 'Industriële demontage',
    text: '',
    href: '/demontage.html#industriële-onderdelen',
  },
]
