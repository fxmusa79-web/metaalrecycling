import { Button } from './ui.js'
import { icons } from './icons.js'

function renderCta(cta, { tone = 'light', isPrimary = true } = {}) {
  if (!cta) return ''

  if (cta.asLink || cta.variant === 'link') {
    const linkClass =
      tone === 'dark' ? 'text-link text-link--on-dark' : 'text-link'
    return `<a class="${linkClass}" href="${cta.href}">${cta.label} ${icons.arrow}</a>`
  }

  const defaultVariant =
    tone === 'dark'
      ? isPrimary
        ? 'primary'
        : 'ghost'
      : isPrimary
        ? 'primary'
        : 'secondary'

  return Button({
    href: cta.href,
    label: cta.label,
    variant: cta.variant || defaultVariant,
    size: cta.size || (isPrimary ? 'lg' : 'md'),
    icon: cta.icon || '',
    attrs: cta.attrs || '',
  })
}

/**
 * Consistent subpage hero — left-aligned, controlled height.
 * Optional static photo background from /pictures/heros/.
 */
export function PageHero({
  label = '',
  title,
  text = '',
  primaryCta,
  secondaryCta,
  tone = 'light',
  mediaHtml = '',
  backgroundImage = '',
  backgroundPosition = 'center center',
  backgroundPositionMobile = '',
} = {}) {
  const actions = [primaryCta, secondaryCta]
    .map((cta, index) => renderCta(cta, { tone: backgroundImage ? 'dark' : tone, isPrimary: index === 0 }))
    .filter(Boolean)
    .join('')

  const hasPhoto = Boolean(backgroundImage)
  const effectiveTone = hasPhoto ? 'photo' : tone
  const posMobile = backgroundPositionMobile || backgroundPosition

  return `
    <section
      class="page-hero page-hero--${effectiveTone}${mediaHtml ? ' page-hero--split' : ''}${hasPhoto ? ' page-hero--has-photo' : ''}"
    >
      ${
        hasPhoto
          ? `
        <div
          class="page-hero__bg"
          style="--page-hero-pos:${backgroundPosition}; --page-hero-pos-m:${posMobile}; background-image:url('${backgroundImage}')"
          aria-hidden="true"
        ></div>
        <div class="page-hero__veil" aria-hidden="true"></div>`
          : ''
      }
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
 * End-of-page CTA band — charcoal, matches homepage closing CTA.
 */
export function BandCta({
  title,
  text = '',
  primaryCta,
  secondaryCta,
  tone = 'dark',
} = {}) {
  const actions = [primaryCta, secondaryCta]
    .map((cta, index) => renderCta(cta, { tone, isPrimary: index === 0 }))
    .filter(Boolean)
    .join('')

  return `
    <section class="band-cta band-cta--${tone}">
      <div class="container band-cta__inner">
        <div class="band-cta__copy">
          <h2>${title}</h2>
          ${text ? `<p>${text}</p>` : ''}
        </div>
        <div class="band-cta__actions">${actions}</div>
      </div>
    </section>
  `
}
