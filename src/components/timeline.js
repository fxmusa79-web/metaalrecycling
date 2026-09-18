import { timelineSteps } from '../config/content.js'

export function RecyclingTimeline() {
  return `
    <section class="section timeline-section" id="proces">
      <div class="container">
        <div class="timeline-section__intro">
          <h2>Van materiaal naar hergebruik</h2>
          <p>Van eerste contact tot scheiding en recycling.</p>
        </div>
        <div class="timeline" data-timeline>
          <div class="timeline__track" aria-hidden="true">
            <div class="timeline__progress" data-timeline-progress></div>
          </div>
          <ol class="timeline__steps">
            ${timelineSteps
              .map(
                (step) => `
              <li class="timeline__step" data-timeline-step>
                <span class="timeline__num">${step.num}</span>
                <h3 class="timeline__title">${step.title}</h3>
                <p class="timeline__text">${step.text}</p>
              </li>`
              )
              .join('')}
          </ol>
        </div>
      </div>
    </section>
  `
}
