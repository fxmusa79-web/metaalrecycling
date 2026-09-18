import { services } from '../config/content.js'
import { icons } from './icons.js'
import { Button } from './ui.js'
import { WorkPhoto } from './media.js'

const featuredId = 'demontage-service'
const listOrder = ['inkoop', 'recycling', 'brand-snijwerk', 'machines', 'kabels']

const linkLabels = {
  inkoop: 'Bekijk inkoop',
  recycling: 'Bekijk recycling',
  'brand-snijwerk': 'Bekijk snijwerk',
  machines: 'Bekijk demontage',
  kabels: 'Bekijk materialen',
}

export function Services() {
  const featured = services.find((s) => s.id === featuredId)
  const list = listOrder.map((id) => services.find((s) => s.id === id)).filter(Boolean)

  return `
    <section class="section section--dark services-editorial" id="diensten">
      <div class="container services-editorial__layout">
        <article class="service-feature">
          <div class="service-feature__media">
            ${WorkPhoto({
              imageKey: 'transformator2',
              sizes: '(max-width: 900px) 100vw, 48vw',
              aspect: '4 / 5',
            })}
          </div>
          <div class="service-feature__body">
            <h2>${featured.title}</h2>
            <p>${featured.text}</p>
            ${Button({
              href: featured.href,
              label: 'Bekijk demontage',
              variant: 'primary',
              size: 'md',
            })}
          </div>
        </article>

        <div class="service-list">
          <h2 class="service-list__heading">Onze hoofddiensten</h2>
          <ul class="service-list__items">
            ${list
              .map(
                (item) => `
              <li class="service-row">
                <span class="service-row__icon">${icons[item.icon]}</span>
                <div class="service-row__copy">
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                  <a class="text-link" href="${item.href}">
                    ${linkLabels[item.id] || 'Bekijk meer'}
                    ${icons.arrow}
                  </a>
                </div>
              </li>`
              )
              .join('')}
          </ul>
        </div>
      </div>
    </section>
  `
}
