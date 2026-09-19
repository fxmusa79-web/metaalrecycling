/**
 * Mobile USP rail — horizontal scroll-snap + gentle auto-advance.
 * Must NEVER call element.scrollIntoView (iOS Safari scrolls the window).
 */
export function initUspRail() {
  const rail = document.querySelector('[data-usp-rail]')
  if (!rail) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = () => window.matchMedia('(max-width: 767.98px)').matches

  let timer = null
  let paused = false
  let inView = true
  let index = 0

  const items = () => [...rail.querySelectorAll('.benefit-item')]

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  /** Scroll only the rail container — never the document. */
  const scrollToIndex = (i) => {
    const list = items()
    if (!list.length || !mobile()) return
    const target = list[((i % list.length) + list.length) % list.length]
    if (!target) return

    const left = Math.max(
      0,
      rail.scrollLeft + (target.getBoundingClientRect().left - rail.getBoundingClientRect().left)
    )

    if (typeof rail.scrollTo === 'function') {
      rail.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
    } else {
      rail.scrollLeft = left
    }
  }

  const start = () => {
    stop()
    if (reduce || paused || !mobile() || !inView) return
    timer = window.setInterval(() => {
      if (!mobile() || paused || !inView) return
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

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inView = entry.isIntersecting && entry.intersectionRatio > 0.2
          if (inView && !paused) start()
          else stop()
        })
      },
      { threshold: [0, 0.2, 0.5] }
    )
    io.observe(rail)
  }

  window.addEventListener(
    'resize',
    () => {
      if (mobile()) start()
      else stop()
    },
    { passive: true }
  )

  start()
}
