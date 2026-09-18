import { icons } from './icons.js'

const benefits = [
  { icon: icons.metal, label: 'Directe metaal inkoop' },
  { icon: icons.users, label: 'Particulier & zakelijk' },
  { icon: icons.truck, label: 'Ophalen mogelijk' },
  { icon: icons.wrench, label: 'Demontage op locatie' },
  { icon: icons.recycle, label: 'Metaal scheiden & recyclen' },
]

export function Benefits() {
  return `
    <section class="benefits" aria-label="Voordelen">
      <div class="container">
        <ul class="benefits__list">
          ${benefits
            .map(
              (item) => `
            <li class="benefit-item">
              <span class="benefit-item__icon">${item.icon}</span>
              <span class="benefit-item__label">${item.label}</span>
            </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>
  `
}
