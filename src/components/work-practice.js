import { workPracticeCards, workImages } from '../config/media.js'

function projectPanel(card) {
  const img = workImages[card.image]
  const pos = img.position || 'center center'
  const posMobile = img.positionMobile || pos

  return `
    <a class="work-panel" href="${card.href}" data-work-card data-image="${card.image}">
      <div
        class="work-panel__media"
        style="--work-pos:${pos}; --work-pos-m:${posMobile}"
      >
        <img
          class="work-panel__img"
          src="${img.src}"
          alt="${img.alt}"
          width="${img.width}"
          height="${img.height}"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 699px) 100vw, (max-width: 1023px) 50vw, 25vw"
        />
        <span class="work-panel__veil" aria-hidden="true"></span>
        <span class="work-panel__label">${card.title}</span>
      </div>
    </a>
  `
}

export function WorkPractice() {
  return `
    <section class="section work-practice" id="ons-werk">
      <div class="container">
        <div class="work-practice__intro">
          <h2>Werk in de praktijk</h2>
          <p>Enkele voorbeelden van recente werkzaamheden.</p>
        </div>
        <div class="work-practice__mosaic">
          ${workPracticeCards.map(projectPanel).join('')}
        </div>
      </div>
    </section>
  `
}
