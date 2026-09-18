import { icons } from './icons.js'
import { SectionHeader } from './ui.js'

const reasons = [
  { icon: icons.handshake, title: 'Persoonlijk en snel contact', text: 'Korte lijnen en duidelijke afstemming vanaf het eerste bericht.' },
  { icon: icons.check, title: 'Transparante afspraken', text: 'Heldere prijzen en voorwaarden, zonder verrassingen achteraf.' },
  { icon: icons.users, title: 'Particulier én zakelijk', text: 'Geschikt voor huishoudens, bedrijven en industriële projecten.' },
  { icon: icons.truck, title: 'Ophalen en afvoer', text: 'Waar mogelijk regelen wij ophalen, afvoer en logistiek.' },
  { icon: icons.wrench, title: 'Ervaring met demontage', text: 'Demontage, sloop en gecontroleerd brand- en snijwerk van machines en constructies.' },
  { icon: icons.leaf, title: 'Duurzame recycling', text: 'Maximaal hergebruik van grondstoffen met zorgvuldige scheiding en sortering.' },
  { icon: icons.building, title: 'Flexibel inzetbaar', text: 'Van kleine partijen tot grotere projecten — we schalen mee.' },
  { icon: icons.map, title: 'Regionale service', text: 'Actief in de regio; werkgebied en bereikbaarheid bespreken we graag.', id: 'werkgebied' },
]

export function WhyUs() {
  return `
    <section class="section section--muted" id="over-ons">
      <div class="container">
        ${SectionHeader({
          eyebrow: 'Waarom wij',
          title: 'Betrouwbare partner in metaal',
          text: 'Sterk in metaal inkoop, recycling, demontage en industriële verwerking — met een directe, professionele aanpak.',
        })}
        <ul class="why-grid">
          ${reasons
            .map(
              (item) => `
            <li class="why-item"${item.id ? ` id="${item.id}"` : ''}>
              <span class="why-item__icon">${item.icon}</span>
              <div>
                <h3 class="why-item__title">${item.title}</h3>
                <p class="why-item__text">${item.text}</p>
              </div>
            </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>
  `
}
