import { timelineSteps } from '../config/content.js'
import { RecycleMotif } from './recycle-motif.js'

/**
 * Homepage process — circular flow on desktop, vertical timeline on mobile.
 */
export function RecyclingTimeline() {
  const steps = timelineSteps
    .map(
      (step, index) => `
      <li
        class="process-cycle__step"
        data-process-step="${index}"
        data-timeline-step
        tabindex="0"
      >
        <span class="process-cycle__num">${step.num}</span>
        <span class="process-cycle__title">${step.title}</span>
        <span class="process-cycle__text">${step.text}</span>
      </li>`
    )
    .join('')

  const mobileSteps = timelineSteps
    .map(
      (step) => `
      <li class="timeline__step" data-timeline-step>
        <span class="timeline__num">${step.num}</span>
        <h3 class="timeline__title">${step.title}</h3>
        <p class="timeline__text">${step.text}</p>
      </li>`
    )
    .join('')

  return `
    <section class="section section--muted timeline-section has-recycle-motif" id="proces">
      ${RecycleMotif({ className: 'recycle-motif--process' })}
      <div class="container">
        <div class="timeline-section__intro">
          <h2>Van materiaal naar hergebruik</h2>
          <p>Van eerste contact tot recycling — in vijf stappen.</p>
        </div>

        <div class="process-cycle" data-process-cycle aria-label="Recyclingproces">
          <div class="process-cycle__ring" aria-hidden="true">
            <svg class="process-cycle__svg" viewBox="0 0 320 320">
              <circle class="process-cycle__guide" cx="160" cy="160" r="118" />
              <circle class="process-cycle__draw" cx="160" cy="160" r="118" data-process-draw />
            </svg>
            <div class="process-cycle__center">
              <span>Van materiaal</span>
              <strong>naar hergebruik</strong>
            </div>
          </div>
          <ol class="process-cycle__steps">
            ${steps}
          </ol>
          <p class="process-cycle__detail" data-process-detail hidden></p>
        </div>

        <div class="timeline process-mobile-timeline" data-timeline>
          <div class="timeline__track" aria-hidden="true">
            <div class="timeline__progress" data-timeline-progress></div>
          </div>
          <ol class="timeline__steps">
            ${mobileSteps}
          </ol>
        </div>
      </div>
    </section>
  `
}
