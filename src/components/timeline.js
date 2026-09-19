import { timelineSteps } from '../config/content.js'
import { RecycleMotif } from './recycle-motif.js'

/** SVG arc from startDeg→endDeg (0° = top, clockwise) */
function arcPath(cx, cy, r, startDeg, endDeg) {
  const rad = (deg) => ((deg - 90) * Math.PI) / 180
  const x1 = cx + r * Math.cos(rad(startDeg))
  const y1 = cy + r * Math.sin(rad(startDeg))
  const x2 = cx + r * Math.cos(rad(endDeg))
  const y2 = cy + r * Math.sin(rad(endDeg))
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

function segmentArcs() {
  const cx = 160
  const cy = 160
  const r = 112
  const gap = 8
  const span = 72 - gap
  return timelineSteps
    .map((_, index) => {
      const start = index * 72 + gap / 2
      const end = start + span
      return `<path
        class="process-cycle__segment"
        data-process-segment="${index}"
        d="${arcPath(cx, cy, r, start, end)}"
      />`
    })
    .join('')
}

/**
 * Homepage process — circular flow on desktop, vertical timeline on mobile.
 */
export function RecyclingTimeline() {
  const steps = timelineSteps
    .map(
      (step, index) => `
      <li class="process-cycle__item">
        <button
          type="button"
          class="process-cycle__step"
          data-process-step="${index}"
          aria-pressed="${index === 0 ? 'true' : 'false'}"
          aria-label="Stap ${step.num}: ${step.title}"
        >
          <span class="process-cycle__halo" aria-hidden="true"></span>
          <span class="process-cycle__num">${step.num}</span>
          <span class="process-cycle__title">${step.title}</span>
        </button>
      </li>`
    )
    .join('')

  const mobileSteps = timelineSteps
    .map(
      (step, index) => `
      <li class="timeline__step" data-process-mobile-step="${index}">
        <button
          type="button"
          class="timeline__step-btn"
          data-process-mobile-btn="${index}"
          aria-pressed="${index === 0 ? 'true' : 'false'}"
          aria-label="Stap ${step.num}: ${step.title}"
        >
          <span class="timeline__num">${step.num}</span>
          <span class="timeline__body">
            <span class="timeline__title">${step.title}</span>
            <span class="timeline__text">${step.centerText || step.text}</span>
          </span>
        </button>
      </li>`
    )
    .join('')

  const first = timelineSteps[0]

  return `
    <section class="section section--muted timeline-section has-recycle-motif" id="proces" data-process-section>
      ${RecycleMotif({ className: 'recycle-motif--process' })}
      <div class="container">
        <div class="timeline-section__intro">
          <h2>Van materiaal naar hergebruik</h2>
          <p>Van eerste contact tot recycling — in vijf stappen.</p>
        </div>

        <div
          class="process-cycle"
          data-process-cycle
          aria-label="Recyclingproces"
          role="group"
        >
          <div class="process-cycle__ring" aria-hidden="true">
            <svg class="process-cycle__svg" viewBox="0 0 320 320">
              <circle class="process-cycle__guide" cx="160" cy="160" r="112" />
              <g class="process-cycle__segments" data-process-segments>
                ${segmentArcs()}
              </g>
              <circle
                class="process-cycle__progress"
                cx="160"
                cy="160"
                r="112"
                data-process-progress
                pathLength="100"
              />
            </svg>
            <div class="process-cycle__center" data-process-center aria-live="polite">
              <div class="process-cycle__center-inner" data-process-center-inner>
                <span class="process-cycle__eyebrow" data-process-eyebrow>${first.centerLabel}</span>
                <strong class="process-cycle__heading" data-process-heading>${first.centerTitle}</strong>
                <p class="process-cycle__desc" data-process-desc>${first.centerText}</p>
              </div>
            </div>
          </div>
          <ol class="process-cycle__steps">
            ${steps}
          </ol>
        </div>

        <div class="timeline process-mobile-timeline" data-process-mobile>
          <div class="timeline__track" aria-hidden="true">
            <div class="timeline__progress" data-process-mobile-progress></div>
          </div>
          <ol class="timeline__steps">
            ${mobileSteps}
          </ol>
        </div>
      </div>
    </section>
  `
}
