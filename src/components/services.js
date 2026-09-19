import { services } from '../config/content.js'
import { icons } from './icons.js'
import { WorkPhoto } from './media.js'

/** Homepage shows three pillars only — specializations live on subpages */
const featuredId = 'demontage-service'
const listOrder = ['inkoop', 'recycling']

export function Services() {
  const featured = services.find((s) => s.id === featuredId)
  const list = listOrder.map((id) => services.find((s) => s.id === id)).filter(Boolean)

  return `
    <section class="section section--dark services-editorial" id="diensten">
      <div class="container services-editorial__layout">
        <article class="service-feature">
          <div class="service-feature__media">
            ${WorkPhoto({
              imageKey: 'demontageSite',
              sizes: '(max-width: 900px) 100vw, 48vw',
              aspect: '5 / 4',
            })}
          </div>
          <div class="service-feature__body">
            <p class="service-feature__label">Uitgelicht</p>
            <h2>${featured.title}</h2>
            <p>${featured.text}</p>
            <a class="text-link text-link--on-dark" href="${featured.href}">
              Meer over demontage ${icons.arrow}
            </a>
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
                  <h3><a href="${item.href}">${item.title}</a></h3>
                  <p>${item.text}</p>
                </div>
              </li>`
              )
              .join('')}
          </ul>
          <p class="service-list__note">
            <a class="text-link text-link--on-dark" href="/materialen.html">
              Materialen &amp; objecten ${icons.arrow}
            </a>
          </p>
        </div>
      </div>
    </section>
  `
}
