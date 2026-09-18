import { Button } from './ui.js'

/**
 * Consistent subpage hero — left-aligned, controlled height.
 */
export function PageHero({
  label = '',
  title,
  text = '',
  primaryCta,
  secondaryCta,
  tone = 'light',
  mediaHtml = '',
} = {}) {
  const actions = [primaryCta, secondaryCta]
    .filter(Boolean)
    .map((cta) =>
      Button({
        href: cta.href,
        label: cta.label,
        variant: cta.variant || (tone === 'dark' ? (cta === primaryCta ? 'primary' : 'ghost') : cta === primaryCta ? 'primary' : 'secondary'),
        size: cta.size || 'lg',
        icon: cta.icon || '',
        attrs: cta.attrs || '',
      })
    )
    .join('')

  return `
    <section class="page-hero page-hero--${tone}${mediaHtml ? ' page-hero--split' : ''}">
      <div class="container page-hero__grid">
        <div class="page-hero__copy">
          ${label ? `<p class="page-hero__label">${label}</p>` : ''}
          <h1 class="page-hero__title">${title}</h1>
          ${text ? `<p class="page-hero__text">${text}</p>` : ''}
          ${actions ? `<div class="page-hero__actions">${actions}</div>` : ''}
        </div>
        ${mediaHtml ? `<div class="page-hero__media">${mediaHtml}</div>` : ''}
      </div>
    </section>
  `
}

/**
 * Compact numbered process — timeline feel, no cards.
 */
export function ProcessLine({ title, text = '', steps = [], id = '' } = {}) {
  return `
    <section class="section process-line-section" ${id ? `id="${id}"` : ''}>
      <div class="container">
        <div class="process-line__intro">
          <h2>${title}</h2>
          ${text ? `<p>${text}</p>` : ''}
        </div>
        <div class="process-line" data-timeline>
          <div class="process-line__track" aria-hidden="true">
            <div class="process-line__progress" data-timeline-progress></div>
          </div>
          <ol class="process-line__steps">
            ${steps
              .map(
                (step, i) => `
              <li class="process-line__step" data-timeline-step>
                <span class="process-line__num">${String(i + 1).padStart(2, '0')}</span>
                <h3>${step.title}</h3>
                ${step.text ? `<p>${step.text}</p>` : ''}
              </li>`
              )
              .join('')}
          </ol>
        </div>
      </div>
    </section>
  `
}

/**
 * Dark or light band CTA for mid-page / end-of-page.
 */
export function BandCta({
  title,
  text = '',
  primaryCta,
  secondaryCta,
  tone = 'dark',
} = {}) {
  const actions = [primaryCta, secondaryCta]
    .filter(Boolean)
    .map((cta) =>
      Button({
        href: cta.href,
        label: cta.label,
        variant:
          cta.variant ||
          (tone === 'dark'
            ? cta === primaryCta
              ? 'primary'
              : 'ghost'
            : cta === primaryCta
              ? 'primary'
              : 'secondary'),
        size: 'md',
        icon: cta.icon || '',
      })
    )
    .join('')

  return `
    <section class="band-cta band-cta--${tone}">
      <div class="container band-cta__inner">
        <div>
          <h2>${title}</h2>
          ${text ? `<p>${text}</p>` : ''}
        </div>
        <div class="band-cta__actions">${actions}</div>
      </div>
    </section>
  `
}
