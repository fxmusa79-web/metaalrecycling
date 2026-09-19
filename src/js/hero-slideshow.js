/**
 * Responsive hero background slideshow.
 *
 * - Separate desktop (landscape) and mobile (portrait) image sets
 * - Smooth opacity crossfade after image is ready (no blank frames)
 * - Progressive loading of later slides
 * - Switch sets only when crossing the breakpoint (no restart on minor resize)
 * - Respects prefers-reduced-motion
 */

const HOLD_MS = 7200
const FADE_MS = 1450

function ensureBackground(slide) {
  if (!slide || slide.style.backgroundImage) return
  const src = slide.dataset.heroSrc
  if (!src) return
  slide.style.backgroundImage = `url("${src}")`
  delete slide.dataset.heroSrc
}

function slideSrc(slide) {
  if (!slide) return ''
  const fromStyle = slide.style.backgroundImage?.match(/url\(["']?(.*?)["']?\)/)?.[1]
  return fromStyle || slide.dataset.heroSrc || ''
}

function preloadUrl(src) {
  if (!src) return Promise.resolve()
  const img = new Image()
  img.decoding = 'async'
  img.src = src
  if (typeof img.decode === 'function') {
    return img.decode().catch(() => {})
  }
  return new Promise((resolve) => {
    img.onload = resolve
    img.onerror = resolve
  })
}

async function ensureBackgroundReady(slide) {
  ensureBackground(slide)
  const src = slideSrc(slide)
  if (!src) return
  await preloadUrl(src)
}

function preloadNext(slides, index) {
  const next = slides[(index + 1) % slides.length]
  ensureBackground(next)
  preloadUrl(slideSrc(next))
}

function injectPreload(href, media) {
  if (!href || document.querySelector(`link[data-hero-preload="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = href
  link.media = media
  link.dataset.heroPreload = href
  document.head.appendChild(link)
}

function syncVeil(root, slide) {
  if (!slide) return
  root.dataset.heroOverlay = slide.dataset.heroOverlay || 'standard'
}

export function initHeroSlideshow() {
  const root = document.querySelector('[data-hero]')
  if (!root) return

  const breakpoint = Number(root.dataset.heroBreakpoint || 768)
  const mq = window.matchMedia(`(max-width: ${breakpoint - 0.02}px)`)
  const desktopSet = root.querySelector('[data-hero-set="desktop"]')
  const mobileSet = root.querySelector('[data-hero-set="mobile"]')
  if (!desktopSet || !mobileSet) return

  injectPreload(root.dataset.heroFirstDesktop, '(min-width: 768px)')
  injectPreload(root.dataset.heroFirstMobile, '(max-width: 767.98px)')

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let timer = null
  let index = 0
  let activeSet = null
  let mode = mq.matches ? 'mobile' : 'desktop'
  let advancing = false

  const getSetEl = () => (mq.matches ? mobileSet : desktopSet)
  const getMode = () => (mq.matches ? 'mobile' : 'desktop')
  const getSlides = (setEl) => [...setEl.querySelectorAll('[data-hero-slide]')]

  const activateSet = (setEl) => {
    desktopSet.classList.toggle('is-active-set', setEl === desktopSet)
    mobileSet.classList.toggle('is-active-set', setEl === mobileSet)
    activeSet = setEl

    const slides = getSlides(setEl)
    slides.forEach((slide, i) => {
      const on = i === 0
      slide.classList.toggle('is-active', on)
      if (on) {
        ensureBackground(slide)
        syncVeil(root, slide)
      }
    })
    index = 0
    requestAnimationFrame(() => preloadNext(slides, index))
  }

  const advance = async () => {
    if (!activeSet || reducedMotion.matches || advancing) return
    const slides = getSlides(activeSet)
    if (slides.length < 2) return

    const nextIndex = (index + 1) % slides.length
    const current = slides[index]
    const next = slides[nextIndex]

    advancing = true
    await ensureBackgroundReady(next)
    preloadNext(slides, nextIndex)

    // Crossfade: both active briefly; incoming on top
    next.style.zIndex = '2'
    next.classList.add('is-active')
    syncVeil(root, next)

    window.setTimeout(() => {
      current.classList.remove('is-active')
      next.style.zIndex = ''
      index = nextIndex
      advancing = false
    }, FADE_MS)
  }

  const stop = () => {
    if (!timer) return
    window.clearInterval(timer)
    timer = null
  }

  const start = () => {
    stop()
    if (reducedMotion.matches) return
    if (!activeSet || getSlides(activeSet).length < 2) return
    timer = window.setInterval(() => {
      advance()
    }, HOLD_MS)
  }

  const applyMode = () => {
    stop()
    advancing = false
    mode = getMode()
    activateSet(getSetEl())
    start()
  }

  /** Only restart when crossing mobile/desktop — never on minor resize */
  const syncIfNeeded = () => {
    const nextMode = getMode()
    if (nextMode !== mode) applyMode()
  }

  applyMode()

  if (typeof mq.addEventListener === 'function') mq.addEventListener('change', applyMode)
  else mq.addListener(applyMode)

  window.addEventListener('resize', syncIfNeeded, { passive: true })

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop()
    else {
      syncIfNeeded()
      start()
    }
  })

  reducedMotion.addEventListener?.('change', () => {
    if (reducedMotion.matches) {
      stop()
      activateSet(getSetEl())
    } else start()
  })
}
