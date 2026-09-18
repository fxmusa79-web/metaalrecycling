export function Button({
  href = '#',
  label,
  variant = 'primary',
  size = 'md',
  icon = '',
  attrs = '',
}) {
  const iconHtml = icon ? `<span class="btn__icon">${icon}</span>` : ''
  return `<a class="btn btn--${variant} btn--${size}" href="${href}" ${attrs}>
    <span>${label}</span>${iconHtml}
  </a>`
}

export function SectionHeader({
  eyebrow = '',
  title,
  text = '',
  align = 'left',
}) {
  return `
    <header class="section-header section-header--${align}">
      ${eyebrow ? `<p class="section-header__eyebrow">${eyebrow}</p>` : ''}
      <h2 class="section-header__title">${title}</h2>
      ${text ? `<p class="section-header__text">${text}</p>` : ''}
    </header>
  `
}

export function Container({ children, className = '' }) {
  return `<div class="container ${className}">${children}</div>`
}
