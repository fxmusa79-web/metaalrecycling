import { phoneHref } from '../config/site.js'
import { icons } from './icons.js'
import { Button } from './ui.js'
import { WorkPhoto } from './media.js'

const items = [
  'Machines demonteren',
  'Staalconstructies verwijderen',
  'Brand- en snijwerk',
  'Materialen scheiden',
  'Kabels verwijderen',
  'Onderdelen sorteren',
]

export function Demontage() {
  return `
    <section class="section demontage" id="demontage">
      <div class="container demontage__layout">
        <div class="demontage__media">
          ${WorkPhoto({
            imageKey: 'snijBranden',
            sizes: '(max-width: 900px) 100vw, 46vw',
          })}
        </div>
        <div class="demontage__content reveal">
          <h2 class="demontage__title">Demontage, sloop en metaal scheiden</h2>
          <p class="demontage__lead">
            Machines, constructies en installaties demonteren we op locatie.
            Daarna scheiden we metalen voor recycling of inkoop.
          </p>
          <ul class="demontage__list demontage__list--inline">
            ${items
              .map(
                (item) => `
              <li>
                <span class="demontage__check">${icons.check}</span>
                <span>${item}</span>
              </li>`
              )
              .join('')}
          </ul>
          <div class="demontage__actions">
            ${Button({
              href: '/demontage.html',
              label: 'Bekijk demontage',
              variant: 'primary',
              size: 'lg',
            })}
            ${Button({
              href: phoneHref(),
              label: 'Bel direct',
              variant: 'ghost',
              size: 'lg',
              icon: icons.phone,
            })}
          </div>
        </div>
      </div>
    </section>
  `
}
