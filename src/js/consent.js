/**
 * Cookie consent — localStorage persistence + category API.
 * Categories: necessary (always on), preferences, analytics, marketing
 */

const STORAGE_KEY = 'dmr_cookie_consent_v1'
const EVENT_NAME = 'dmr:consent-change'

const DEFAULT_CONSENT = {
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false,
  decided: false,
  updatedAt: null,
}

function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function writeRaw(value) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    /* private mode / quota */
  }
}

export function getConsent() {
  const stored = readRaw()
  if (!stored || typeof stored !== 'object') {
    return { ...DEFAULT_CONSENT }
  }
  return {
    necessary: true,
    preferences: Boolean(stored.preferences),
    analytics: Boolean(stored.analytics),
    marketing: Boolean(stored.marketing),
    decided: Boolean(stored.decided),
    updatedAt: stored.updatedAt || null,
  }
}

export function hasConsent(category) {
  if (category === 'necessary') return true
  const consent = getConsent()
  if (!consent.decided) return false
  return Boolean(consent[category])
}

function emitChange(consent) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: consent }))
  window.DMR_CONSENT = consent
}

export function saveConsent(partial) {
  const next = {
    ...getConsent(),
    ...partial,
    necessary: true,
    decided: true,
    updatedAt: new Date().toISOString(),
  }
  writeRaw(next)
  emitChange(next)
  return next
}

export function acceptAll() {
  return saveConsent({
    preferences: true,
    analytics: true,
    marketing: true,
  })
}

export function acceptNecessaryOnly() {
  return saveConsent({
    preferences: false,
    analytics: false,
    marketing: false,
  })
}

/** Run callback when category is granted (now or later). */
export function whenConsent(category, callback) {
  if (hasConsent(category)) {
    callback()
    return
  }
  const onChange = (event) => {
    if (event.detail?.[category]) {
      window.removeEventListener(EVENT_NAME, onChange)
      callback()
    }
  }
  window.addEventListener(EVENT_NAME, onChange)
}

export function initConsentApi() {
  window.DMR = window.DMR || {}
  window.DMR.hasConsent = hasConsent
  window.DMR.getConsent = getConsent
  window.DMR.whenConsent = whenConsent
  window.DMR.openCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('dmr:open-cookie-settings'))
  }
  emitChange(getConsent())
}
