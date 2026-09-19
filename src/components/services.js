import { services } from '../config/content.js'
import { icons } from './icons.js'
import { WorkPhoto } from './media.js'

/**
 * Homepage services — list first, then featured industrial showcase.
 */
const featured = {
  label: 'Uitgelicht',
  title: 'Industriële demontage & materiaalscheiding',
  text:
    'Grote machines en samengestelde metalen onderdelen demonteren we voor verdere verwerking. Materialen worden gescheiden en klaargemaakt voor recycling.',
  aside: 'Ook grotere of afwijkende objecten kunnen we op aanvraag beoordelen.',
  href: '/demontage.html',
  cta: 'Bekijk demontage',
}

const listOrder = ['inkoop', 'recycling', 'brand-snijwerk', 'machines', 'kabels', 'ophalen']

export function Services() {
  const list = listOrder.map((id) => services.find((s) => s.id === id)).filter(Boolean)

  return `
    <section class="section section--dark services-editorial" id="diensten">
      <div class="container">
        <div class="service-list">
          <h2 class="service-list__heading">Onze hoofddiensten</h2>
          <ul class="service-list__items">
            ${list
              .map(
                (item) => `
              <li class="service-row">
                <span class="service-row__icon" aria-hidden="true">${icons[item.icon]}</span>
                <div class="service-row__copy">
                  <h3><a href="${item.href}">${item.title}</a></h3>
                  <p>${item.text}</p>
                  <a class="text-link text-link--on-dark service-row__cta" href="${item.href}">
                    ${item.cta} ${icons.arrow}
                  </a>
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

        <div class="services-editorial__showcase">
          <div class="service-feature__media">
            ${WorkPhoto({
              imageKey: 'windmolenRing',
              className: 'service-feature__photo',
              sizes: '(max-width: 899px) 100vw, 56vw',
              aspect: '4 / 3',
            })}
          </div>

          <div class="service-feature__body">
            <p class="service-feature__label">${featured.label}</p>
            <h2>${featured.title}</h2>
            <p>${featured.text}</p>
            <p class="service-feature__aside">${featured.aside}</p>
            <a class="text-link text-link--on-dark service-feature__cta" href="${featured.href}">
              ${featured.cta} ${icons.arrow}
            </a>
          </div>
        </div>
      </div>
    </section>
  `
}
