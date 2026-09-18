/**
 * Central company / contact configuration.
 * Single source of truth — use everywhere.
 */
export const site = {
  name: 'Duurzaam Metaal Recycling',
  shortName: 'DMR',
  domain: 'duurzaammetaalrecycling.nl',
  url: 'https://duurzaammetaalrecycling.nl',
  tagline: 'Inkoop | Recycling | Demontage & sloop',
  description:
    'Metaal verkopen, demonteren of laten recyclen? Duurzaam Metaal Recycling verzorgt metaal inkoop, recycling, demontage en sloop van metalen constructies, machines en installaties.',

  phone: '0648667182',
  phoneDisplay: '06 48 66 71 82',
  email: 'info@duurzaammetaalrecycling.nl',
  hours: '',

  addressLines: ['Gerrit Imbosstraat 60', '9607 PE Foxhol', 'Nederland'],
  address: 'Gerrit Imbosstraat 60, 9607 PE Foxhol, Nederland',
  city: 'Foxhol',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Gerrit+Imbosstraat+60,+9607+PE+Foxhol',

  kvk: '',
  btw: '',

  trustLine: 'Metaal inkoop • Recycling • Demontage & sloop',
  audience: 'Voor particulieren, bedrijven en industrie',

  assets: {
    favicon: '/favicon.png',
    logoHeader: '/images/logo-header.png',
    logo: '/images/logo.png',
    logoMark: '/images/logo-mark.png',
  },
}

export const navigation = [
  { label: 'Home', href: '/', id: 'home' },
  { label: 'Metaal inkoop', href: '/metaal-inkoop.html', id: 'metaal-inkoop' },
  { label: 'Recycling', href: '/recycling.html', id: 'recycling' },
  { label: 'Demontage & sloop', href: '/demontage.html', id: 'demontage' },
  { label: 'Materialen', href: '/materialen.html', id: 'materialen' },
  { label: 'Werkgebied', href: '/werkgebied.html', id: 'werkgebied' },
  { label: 'Over ons', href: '/over-ons.html', id: 'over-ons' },
  { label: 'Contact', href: '/contact.html', id: 'contact' },
]

export const moreNav = [
  { label: 'FAQ', href: '/faq.html', id: 'faq' },
]

export function hasPhone() {
  return Boolean(site.phone)
}

export function hasEmail() {
  return Boolean(site.email)
}

export function phoneHref() {
  return hasPhone() ? `tel:${site.phone.replace(/\s+/g, '')}` : '/contact.html'
}

export function emailHref() {
  return hasEmail() ? `mailto:${site.email}` : '/contact.html'
}

export function phoneLabel() {
  return site.phoneDisplay || site.phone || 'Bel ons'
}

export function emailLabel() {
  return site.email || 'E-mail ons'
}

export function mapsHref() {
  return site.mapsUrl || '#'
}

export function isActivePage(pageId, itemId) {
  return pageId === itemId
}
