import gsap from 'gsap'
import { timelineSteps } from '../config/content.js'

const STEP_MS = 4000
const RESUME_MS = 1600
const CENTER_MS = 0.38

/**
 * Desktop circular process autoplay + mobile timeline cycling.
 */
export function initProcessCycle() {
  const section = document.querySelector('[data-process-section]')
  if (!section) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktopMq = window.matchMedia('(min-width: 900px)')

  const desktopRoot = section.querySelector('[data-process-cycle]')
  const mobileRoot = section.querySelector('[data-process-mobile]')
  const motif = section.querySelector('.recycle-motif--process')

  let index = 0
  let timer = null
  let resumeTimer = null
  let visible = false
  let pointerInside = false
  let userPaused = false
  let scrolling = false
  let scrollIdleTimer = null

  const desktopSteps = desktopRoot
    ? [...desktopRoot.querySelectorAll('[data-process-step]')]
    : []
  const segments = desktopRoot
    ? [...desktopRoot.querySelectorAll('[data-process-segment]')]
    : []
  const progressRing = desktopRoot?.querySelector('[data-process-progress]')
  const centerInner = desktopRoot?.querySelector('[data-process-center-inner]')
  const eyebrow = desktopRoot?.querySelector('[data-process-eyebrow]')
  const heading = desktopRoot?.querySelector('[data-process-heading]')
  const desc = desktopRoot?.querySelector('[data-process-desc]')

  const mobileSteps = mobileRoot
    ? [...mobileRoot.querySelectorAll('[data-process-mobile-step]')]
    : []
  const mobileBtns = mobileRoot
    ? [...mobileRoot.querySelectorAll('[data-process-mobile-btn]')]
    : []
  const mobileProgress = mobileRoot?.querySelector('[data-process-mobile-progress]')

  const isDesktop = () => desktopMq.matches

  function stopTimer() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function clearResume() {
    if (resumeTimer) {
      clearTimeout(resumeTimer)
      resumeTimer = null
    }
  }

  function canAutoplay() {
    return !reduced && visible && !pointerInside && !userPaused && !scrolling
  }

  function startTimer() {
    stopTimer()
    if (!canAutoplay()) return
    timer = setInterval(() => {
      goTo((index + 1) % timelineSteps.length, { fromAutoplay: true })
    }, STEP_MS)
  }

  function scheduleResume() {
    clearResume()
    userPaused = true
    stopTimer()
    resumeTimer = setTimeout(() => {
      userPaused = false
      if (!pointerInside) startTimer()
    }, RESUME_MS)
  }

  function updateMotif(i) {
    if (!motif || reduced) return
    const t = i / Math.max(timelineSteps.length - 1, 1)
    gsap.to(motif, {
      opacity: 0.09 + t * 0.07,
      scale: 1 + t * 0.04,
      rotate: -4 + t * 8,
      x: t * 6,
      y: t * -4,
      duration: 0.9,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function updateProgress(i, { looping = false } = {}) {
    const count = timelineSteps.length
    segments.forEach((seg, s) => {
      seg.classList.toggle('is-lit', s <= i)
    })

    if (!progressRing) return

    const target = ((i + 1) / count) * 100

    if (reduced) {
      progressRing.style.strokeDasharray = `${target} 100`
      progressRing.style.strokeDashoffset = '0'
      return
    }

    if (looping) {
      gsap.to(progressRing, {
        strokeDasharray: '100 100',
        duration: 0.28,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(progressRing, { strokeDasharray: '0 100' })
          gsap.to(progressRing, {
            strokeDasharray: `${target} 100`,
            duration: 0.45,
            ease: 'power2.out',
          })
        },
      })
      return
    }

    gsap.to(progressRing, {
      strokeDasharray: `${target} 100`,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function updateCenter(step, animate) {
    if (!eyebrow || !heading || !desc) return

    const apply = () => {
      eyebrow.textContent = step.centerLabel
      heading.textContent = step.centerTitle
      desc.textContent = step.centerText || step.text
    }

    if (!animate || reduced || !centerInner) {
      apply()
      if (centerInner) gsap.set(centerInner, { opacity: 1, y: 0 })
      return
    }

    gsap.to(centerInner, {
      opacity: 0,
      y: -12,
      duration: CENTER_MS * 0.45,
      ease: 'power2.out',
      onComplete: () => {
        apply()
        gsap.fromTo(
          centerInner,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: CENTER_MS, ease: 'power2.out' }
        )
      },
    })
  }

  function updateDesktopSteps(i) {
    desktopSteps.forEach((btn, s) => {
      const active = s === i
      btn.classList.toggle('is-active', active)
      btn.setAttribute('aria-pressed', active ? 'true' : 'false')
    })
  }

  function updateMobileSteps(i) {
    mobileSteps.forEach((el, s) => {
      el.classList.toggle('is-active', s === i)
    })
    mobileBtns.forEach((btn, s) => {
      const active = s === i
      btn.classList.toggle('is-active', active)
      btn.setAttribute('aria-pressed', active ? 'true' : 'false')
    })
    if (mobileProgress) {
      const pct = ((i + 1) / timelineSteps.length) * 100
      mobileProgress.style.transform = `scaleY(${pct / 100})`
    }
  }

  function goTo(nextIndex, { fromAutoplay = false, animate = true } = {}) {
    const prev = index
    const looping = fromAutoplay && prev === timelineSteps.length - 1 && nextIndex === 0
    index = ((nextIndex % timelineSteps.length) + timelineSteps.length) % timelineSteps.length
    const step = timelineSteps[index]

    updateDesktopSteps(index)
    updateMobileSteps(index)
    updateCenter(step, animate && prev !== index)
    updateProgress(index, { looping })
    updateMotif(index)
  }

  // Desktop interactions
  desktopSteps.forEach((btn, i) => {
    btn.addEventListener('pointerenter', () => {
      if (!isDesktop()) return
      pointerInside = true
      stopTimer()
      clearResume()
      userPaused = true
      goTo(i)
    })

    btn.addEventListener('focus', () => {
      if (!isDesktop()) return
      pointerInside = true
      stopTimer()
      clearResume()
      userPaused = true
      goTo(i)
    })

    btn.addEventListener('click', () => {
      goTo(i)
      scheduleResume()
    })
  })

  if (desktopRoot) {
    desktopRoot.addEventListener('pointerenter', () => {
      if (!isDesktop()) return
      pointerInside = true
      stopTimer()
    })

    desktopRoot.addEventListener('pointerleave', () => {
      if (!isDesktop()) return
      pointerInside = false
      scheduleResume()
    })
  }

  // Mobile tap
  mobileBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      goTo(i)
      scheduleResume()
    })
  })

  // Pause mobile autoplay while scrolling the page near the section
  let lastScrollY = window.scrollY
  window.addEventListener(
    'scroll',
    () => {
      if (isDesktop() || !visible) {
        lastScrollY = window.scrollY
        return
      }
      if (Math.abs(window.scrollY - lastScrollY) < 2) return
      lastScrollY = window.scrollY
      scrolling = true
      stopTimer()
      if (scrollIdleTimer) clearTimeout(scrollIdleTimer)
      scrollIdleTimer = setTimeout(() => {
        scrolling = false
        if (canAutoplay()) startTimer()
      }, 900)
    },
    { passive: true }
  )

  // Visibility
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.28
        if (visible) {
          if (!timer && canAutoplay()) startTimer()
        } else {
          stopTimer()
          clearResume()
        }
      })
    },
    { threshold: [0, 0.28, 0.5] }
  )
  io.observe(section)

  // Init progress ring geometry
  if (progressRing) {
    progressRing.style.strokeDasharray = reduced ? '20 100' : '0 100'
    progressRing.style.strokeDashoffset = '0'
    progressRing.style.transformOrigin = '50% 50%'
    progressRing.style.transform = 'rotate(-90deg)'
  }

  goTo(0, { animate: false })
  if (motif && !reduced) {
    gsap.set(motif, { opacity: 0.1, scale: 1, rotate: -2, transformOrigin: '70% 70%' })
  }

  desktopMq.addEventListener('change', () => {
    pointerInside = false
    stopTimer()
    if (canAutoplay()) startTimer()
  })
}
