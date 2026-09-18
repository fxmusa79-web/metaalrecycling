import { workPracticeCards, workImages } from '../config/media.js'

function projectCard(card) {
  const img = workImages[card.image]
  const featured = card.featured ? ' work-card--featured' : ''
  const orientation = img.orientation ? ` work-card--${img.orientation}` : ''
  const aspect = img.cardAspect || '4 / 3'

  return `
    <a
      class="work-card${featured}${orientation}"
      href="${card.href}"
      data-work-card
      data-image="${card.image}"
    >
      <div
        class="work-card__media"
        style="--work-pos: ${img.position}; --work-card-aspect: ${aspect}"
      >
        <img
          class="work-card__img"
          src="${img.src}"
          alt="${img.alt}"
          width="${img.width}"
          height="${img.height}"
          loading="lazy"
          decoding="async"
          sizes="${card.featured ? '(max-width: 900px) 100vw, 55vw' : '(max-width: 900px) 100vw, 28vw'}"
        />
        <span class="work-card__shade" aria-hidden="true"></span>
        <span class="work-card__caption">${card.title}</span>
      </div>
    </a>
  `
}

export function WorkPractice() {
  const featured = workPracticeCards.find((c) => c.featured)
  const rest = workPracticeCards.filter((c) => !c.featured)

  return `
    <section class="section work-practice" id="ons-werk">
      <div class="container">
        <div class="work-practice__intro">
          <h2>Werk in de praktijk</h2>
          <p>Een aantal voorbeelden van materialen en werkzaamheden die wij verwerken.</p>
        </div>
        <div class="work-practice__grid">
          ${featured ? projectCard(featured) : ''}
          <div class="work-practice__side">
            ${rest.map(projectCard).join('')}
          </div>
        </div>
      </div>
    </section>
  `
}
