import { icons } from './icons.js'
import { SectionHeader } from './ui.js'

const steps = [
  {
    num: '01',
    icon: icons.camera,
    title: 'Neem contact op',
    text: 'Stuur foto’s, materiaalinformatie of vraag een inspectie op locatie aan. Ook voor afwijkende of onbekende partijen.',
  },
  {
    num: '02',
    icon: icons.euro,
    title: 'Prijs of voorstel',
    text: 'U ontvangt een duidelijke prijsindicatie of offerte op maat.',
  },
  {
    num: '03',
    icon: icons.truck,
    title: 'Inkoop of demontage',
    text: 'Wij halen op, demonteren waar nodig en verwerken het metaal duurzaam.',
  },
]

export function Process() {
  return `
    <section class="section" id="werkwijze">
      <div class="container">
        ${SectionHeader({
          eyebrow: 'Werkwijze',
          title: 'Zo werkt het',
          text: 'Drie duidelijke stappen van eerste contact tot inkoop of demontage.',
          align: 'center',
        })}
        <ol class="process">
          ${steps
            .map(
              (step) => `
            <li class="process-step">
              <span class="process-step__num">${step.num}</span>
              <span class="process-step__icon">${step.icon}</span>
              <h3 class="process-step__title">${step.title}</h3>
              <p class="process-step__text">${step.text}</p>
            </li>`
            )
            .join('')}
        </ol>
      </div>
    </section>
  `
}
