import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'power2.out'
const EASE_SOFT = 'power3.out'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function revealHeading(el) {
  gsap.from(el, {
    opacity: 0,
    y: 16,
    duration: 0.55,
    ease: EASE,
    clearProps: 'transform,opacity',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      once: true,
    },
  })
}

function revealCards(container) {
  const cards = container.querySelectorAll(
    ':scope > .service-card, :scope > .category-card, :scope > .audience-panel, :scope > .material-group, :scope > .benefit-item, :scope > .metal-card, :scope > .request-option, :scope > .request-seg, :scope > .matrix-block, :scope > .service-row'
  )
  if (!cards.length) return

  gsap.from(cards, {
    opacity: 0,
    y: 20,
    duration: 0.55,
    stagger: 0.07,
    ease: EASE,
    clearProps: 'transform',
    scrollTrigger: {
      trigger: container,
      start: 'top 86%',
      once: true,
    },
  })
}

function revealCta(el) {
  gsap.from(el, {
    opacity: 0,
    y: 18,
    duration: 0.6,
    ease: EASE_SOFT,
    clearProps: 'transform',
    scrollTrigger: {
      trigger: el,
      start: 'top 90%',
      once: true,
    },
  })
}

function initTimeline() {
  const timelines = gsap.utils.toArray('[data-timeline]')
  if (!timelines.length) return

  const isDesktop = () => window.matchMedia('(min-width: 900px)').matches

  timelines.forEach((timeline) => {
    const progress = timeline.querySelector('[data-timeline-progress]')
    const steps = gsap.utils.toArray(timeline.querySelectorAll('[data-timeline-step]'))
    if (!progress || !steps.length) return

    const setProgressAxis = () => {
      if (isDesktop()) {
        gsap.set(progress, { scaleX: 0, scaleY: 1, transformOrigin: 'left center' })
      } else {
        gsap.set(progress, { scaleY: 0, scaleX: 1, transformOrigin: 'top center' })
      }
    }

    setProgressAxis()

    const trigger = ScrollTrigger.create({
      trigger: timeline,
      start: 'top 72%',
      end: 'bottom 58%',
      onUpdate: (self) => {
        if (isDesktop()) {
          gsap.set(progress, {
            scaleX: self.progress,
            scaleY: 1,
            transformOrigin: 'left center',
          })
        } else {
          gsap.set(progress, {
            scaleY: self.progress,
            scaleX: 1,
            transformOrigin: 'top center',
          })
        }

        steps.forEach((step, index) => {
          const threshold = index / Math.max(steps.length - 1, 1)
          step.classList.toggle('is-active', self.progress >= threshold - 0.06)
        })
      },
    })

    gsap.from(steps, {
      opacity: 0.55,
      y: 14,
      duration: 0.5,
      stagger: 0.06,
      ease: EASE,
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 80%',
        once: true,
      },
    })

    window.addEventListener(
      'resize',
      () => {
        setProgressAxis()
        trigger.refresh()
      },
      { passive: true }
    )
  })
}

export function initAnimations() {
  if (prefersReducedMotion()) return

  document.documentElement.classList.add('motion-on')

  // Hero: short staged entrance
  const heroItems = gsap.utils.toArray('.hero-anim')
  if (heroItems.length) {
    gsap.from(heroItems, {
      opacity: 0,
      y: 16,
      duration: 0.5,
      stagger: 0.07,
      ease: EASE,
      delay: 0.04,
      clearProps: 'transform,opacity',
    })
  }

  // Section headings
  gsap.utils.toArray('.section-header, .reveal-heading').forEach(revealHeading)

  // Card grids with short stagger
  gsap.utils
    .toArray(
      '.services, .category-grid, .audiences-split, .materials-page, .benefits__list, .request-options, .request-selector, .metals-grid, .material-matrix__grid, .service-list__items'
    )
    .forEach(revealCards)

  // Generic reveal leftovers (avoid double-animating cards already handled)
  gsap.utils.toArray('.reveal').forEach((el) => {
    if (
      el.matches(
        '.service-card, .category-card, .audience-panel, .material-group, .benefit-item, .metal-card, .request-option, .request-seg, .section-header, .matrix-block, .material-matrix__intro, .work-practice__intro, .request-section__intro, .timeline-section__intro, .faq-section__intro'
      )
    ) {
      return
    }
    gsap.from(el, {
      opacity: 0,
      y: 18,
      duration: 0.55,
      ease: EASE,
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    })
  })

  // CTA blocks
  gsap.utils.toArray('.cta-section, .custom-request, .site-footer__cta-bar').forEach(revealCta)

  // Image / panel clip reveals — sparse, only strong visual anchors
  gsap.utils.toArray('.image-reveal, .map-panel, .map-card, .demontage__media .work-photo').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.75,
        ease: EASE_SOFT,
        immediateRender: false,
        clearProps: 'clipPath',
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      }
    )
  })

  // Project / work panels — short stagger (visible by default for no-JS / late triggers)
  const workGrid = document.querySelector('.work-practice__editorial')
  if (workGrid) {
    gsap.from(workGrid.querySelectorAll('.work-panel'), {
      opacity: 0,
      y: 18,
      duration: 0.55,
      stagger: 0.08,
      ease: EASE,
      immediateRender: false,
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: workGrid,
        start: 'top 86%',
        once: true,
      },
    })
  }

  initTimeline()
  initRecycleMotifs()
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

function initRecycleMotifs() {
  const motifs = gsap.utils.toArray('[data-recycle-motif]')
  if (!motifs.length) return

  motifs.forEach((motif) => {
    const section = motif.closest('section') || motif.parentElement
    gsap.set(motif, { opacity: 0, y: 28, scale: 0.98 })

    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      end: 'bottom 35%',
      onEnter: () => {
        gsap.to(motif, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: EASE_SOFT,
        })
      },
      onLeave: () => {
        gsap.to(motif, { opacity: 0, y: -16, duration: 0.4, ease: EASE })
      },
      onEnterBack: () => {
        gsap.to(motif, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE })
      },
      onLeaveBack: () => {
        gsap.to(motif, { opacity: 0, y: 20, duration: 0.35, ease: EASE })
      },
    })

    gsap.to(motif, {
      y: -24,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    })
  })
}
