/**
 * Mobile USP rail — scroll-snap + gentle auto-advance (paused on interaction).
 */
export function initUspRail() {
  const rail = document.querySelector('[data-usp-rail]')
  if (!rail) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = () => window.matchMedia('(max-width: 767.98px)').matches

  let timer = null
  let paused = false
  let index = 0

  const items = () => [...rail.querySelectorAll('.benefit-item')]

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const scrollToIndex = (i) => {
    const list = items()
    if (!list.length) return
    const target = list[((i % list.length) + list.length) % list.length]
    target.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }

  const start = () => {
    stop()
    if (reduce || paused || !mobile()) return
    timer = window.setInterval(() => {
      if (!mobile() || paused) return
      index += 1
      scrollToIndex(index)
    }, 4500)
  }

  const pause = () => {
    paused = true
    stop()
  }

  ;['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach((evt) => {
    rail.addEventListener(evt, pause, { passive: true })
  })

  window.addEventListener('resize', () => {
    if (mobile()) start()
    else stop()
  })

  start()
}
