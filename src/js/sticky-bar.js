export function initStickyBar() {
  const bar = document.getElementById('sticky-bar')
  const hero = document.querySelector('.hero')
  if (!bar) return

  const closeBtn = bar.querySelector('.sticky-bar__close')
  let dismissed = sessionStorage.getItem('sticky-bar-dismissed') === '1'

  const syncBody = () => {
    document.body.classList.toggle('has-sticky-bar', !bar.hidden)
  }

  const update = () => {
    if (dismissed || window.innerWidth > 900) {
      bar.hidden = true
      syncBody()
      return
    }
    const threshold = hero ? hero.offsetHeight * 0.65 : 420
    bar.hidden = window.scrollY < threshold
    syncBody()
  }

  closeBtn?.addEventListener('click', () => {
    dismissed = true
    sessionStorage.setItem('sticky-bar-dismissed', '1')
    bar.hidden = true
    syncBody()
  })

  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}
