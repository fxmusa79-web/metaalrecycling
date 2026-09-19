export function initStickyBar() {
  const bar = document.getElementById('sticky-bar')
  const hero = document.querySelector('.hero')
  if (!bar) return

  const syncBody = () => {
    document.body.classList.toggle('has-sticky-bar', !bar.hidden)
  }

  const update = () => {
    if (window.innerWidth > 900) {
      bar.hidden = true
      syncBody()
      return
    }
    const threshold = hero ? hero.offsetHeight * 0.55 : 360
    bar.hidden = window.scrollY < threshold
    syncBody()
  }

  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}
