/**
 * Mobile sticky contact bar.
 *
 * iOS Safari: never toggle document/body padding while scrolling (causes jumps).
 * Bottom inset is reserved permanently via CSS. This script only shows/hides the
 * fixed bar and lifts the WhatsApp FAB via `.has-sticky-bar`.
 *
 * Visibility uses IntersectionObserver on the hero (not scrollY vs changing
 * hero offsetHeight), so collapsing browser chrome cannot thrash the threshold.
 */
export function initStickyBar() {
  const bar = document.getElementById('sticky-bar')
  const hero = document.querySelector('.hero, .page-hero')
  if (!bar) return

  let shown = false
  /** @type {IntersectionObserver | null} */
  let io = null

  const apply = (next) => {
    if (next === shown) return
    shown = next
    bar.hidden = !shown
    document.body.classList.toggle('has-sticky-bar', shown)
  }

  const isDesktop = () => window.innerWidth > 900

  const disconnectIo = () => {
    if (io) {
      io.disconnect()
      io = null
    }
  }

  const observeHero = () => {
    disconnectIo()
    if (!hero || !('IntersectionObserver' in window)) return false

    io = new IntersectionObserver(
      (entries) => {
        if (isDesktop()) {
          apply(false)
          return
        }
        const entry = entries[0]
        if (!entry) return
        const heroVisible =
          entry.isIntersecting &&
          entry.intersectionRatio > 0.12 &&
          entry.boundingClientRect.bottom > 96
        apply(!heroVisible)
      },
      { threshold: [0, 0.08, 0.12, 0.25, 0.5, 0.75, 1] }
    )
    io.observe(hero)
    return true
  }

  const onScrollFallback = () => {
    if (isDesktop()) {
      apply(false)
      return
    }
    const heroBottom = hero
      ? hero.offsetTop + hero.offsetHeight - 24
      : Math.round(window.innerHeight * 0.7)
    const y = window.scrollY || 0
    if (!shown && y >= heroBottom) apply(true)
    else if (shown && y < heroBottom - 48) apply(false)
  }

  const syncMode = () => {
    if (isDesktop()) {
      disconnectIo()
      window.removeEventListener('scroll', onScrollFallback)
      apply(false)
      return
    }

    if (!observeHero()) {
      window.addEventListener('scroll', onScrollFallback, { passive: true })
      onScrollFallback()
    }
  }

  syncMode()
  window.addEventListener('resize', syncMode, { passive: true })
}
