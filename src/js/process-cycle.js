/**
 * Desktop circular process interaction — hover/focus reveals detail.
 */
export function initProcessCycle() {
  const root = document.querySelector('[data-process-cycle]')
  if (!root) return

  const detail = root.querySelector('[data-process-detail]')
  const steps = [...root.querySelectorAll('[data-process-step]')]
  const draw = root.querySelector('[data-process-draw]')

  const activate = (step) => {
    steps.forEach((el) => el.classList.toggle('is-active', el === step))
    if (detail) {
      const title = step.querySelector('.process-cycle__title')?.textContent || ''
      const text = step.querySelector('.process-cycle__text')?.textContent || ''
      detail.hidden = false
      detail.innerHTML = `<strong>${title}</strong> ${text}`
    }
  }

  steps.forEach((step) => {
    step.addEventListener('mouseenter', () => activate(step))
    step.addEventListener('focus', () => activate(step))
  })

  root.addEventListener('mouseleave', () => {
    steps.forEach((el) => el.classList.remove('is-active'))
    if (detail) detail.hidden = true
  })

  if (draw && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const length = draw.getTotalLength?.() || 740
    draw.style.strokeDasharray = String(length)
    draw.style.strokeDashoffset = String(length)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            draw.style.transition = 'stroke-dashoffset 1.2s ease'
            draw.style.strokeDashoffset = '0'
            io.disconnect()
          }
        })
      },
      { threshold: 0.35 }
    )
    io.observe(root)
  }

  if (steps[0]) activate(steps[0])
}
