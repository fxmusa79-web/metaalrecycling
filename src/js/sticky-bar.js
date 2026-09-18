export function initStickyBar() {
  const bar = document.getElementById('sticky-bar')
  const hero = document.querySelector('.hero')
  if (!bar) return

  const closeBtn = bar.querySelector('.sticky-bar__close')
  let dismissed = sessionStorage.getItem('sticky-bar-dismissed') === '1'

  const update = () => {
    if (dismissed || window.innerWidth > 900) {
      bar.hidden = true
      return
    }
    const threshold = hero ? hero.offsetHeight * 0.65 : 420
    bar.hidden = window.scrollY < threshold
  }

  closeBtn?.addEventListener('click', () => {
    dismissed = true
    sessionStorage.setItem('sticky-bar-dismissed', '1')
    bar.hidden = true
  })

  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}
