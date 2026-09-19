import { workImages } from '../config/media.js'
import { icons } from './icons.js'
import { Button, SectionHeader } from './ui.js'

/**
 * Responsive work photo with fixed aspect ratio (prevents CLS).
 */
export function WorkPhoto({
  imageKey,
  className = '',
  aspect,
  sizes = '(max-width: 700px) 100vw, 50vw',
  priority = false,
  position,
}) {
  const img = workImages[imageKey]
  if (!img) return ''

  const objectPosition = position || img.position || 'center center'
  const objectPositionMobile = img.positionMobile || objectPosition
  const resolvedAspect = aspect || img.featureAspect || '4 / 3'
  const orientation = img.orientation ? ` work-photo--${img.orientation}` : ''
  const loading = priority ? 'eager' : 'lazy'
  const fetchPriority = priority ? 'high' : 'auto'

  return `
    <div
      class="work-photo${orientation} ${className}"
      style="--work-aspect: ${resolvedAspect}; --work-pos: ${objectPosition}; --work-pos-m: ${objectPositionMobile}"
    >
      <img
        class="work-photo__img"
        src="${img.src}"
        alt="${img.alt}"
        width="${img.width}"
        height="${img.height}"
        loading="${loading}"
        decoding="async"
        fetchpriority="${fetchPriority}"
        sizes="${sizes}"
      />
    </div>
  `
}

/**
 * Editorial split: image + copy (desktop 2-col, mobile stacked).
 */
export function WorkFeature({
  id = '',
  imageKey,
  eyebrow = '',
  title,
  text,
  support = '',
  bullets = [],
  primaryCta,
  secondaryCta,
  tone = 'light',
  reverse = false,
  aspect = '4 / 3',
  imagePosition,
}) {
  const bulletsHtml = bullets.length
    ? `<ul class="work-feature__bullets">
        ${bullets.map((item) => `<li>${item}</li>`).join('')}
      </ul>`
    : ''

  const actions = [primaryCta, secondaryCta]
    .filter(Boolean)
    .map((cta) =>
      Button({
        href: cta.href,
        label: cta.label,
        variant: cta.variant || (tone === 'dark' ? 'primary' : 'primary'),
        size: cta.size || 'md',
        icon: cta.icon || '',
      })
    )
    .join('')

  return `
    <section
      class="section work-feature work-feature--${tone}${reverse ? ' work-feature--reverse' : ''}"
      ${id ? `id="${id}"` : ''}
    >
      <div class="container work-feature__grid">
        <div class="work-feature__media">
          ${WorkPhoto({
            imageKey,
            aspect,
            position: imagePosition,
            sizes: '(max-width: 900px) 100vw, 48vw',
          })}
        </div>
        <div class="work-feature__body reveal">
          ${eyebrow ? `<p class="section-header__eyebrow">${eyebrow}</p>` : ''}
          <h2 class="section-header__title">${title}</h2>
          <p class="work-feature__text">${text}</p>
          ${support ? `<p class="work-feature__support">${support}</p>` : ''}
          ${bulletsHtml}
          ${actions ? `<div class="work-feature__actions">${actions}</div>` : ''}
        </div>
      </div>
    </section>
  `
}
