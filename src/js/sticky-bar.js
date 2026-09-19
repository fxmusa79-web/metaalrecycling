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

    // Hide while hero is still on screen — avoid competing CTAs in the first viewport
    const heroBottom = hero
      ? hero.offsetTop + hero.offsetHeight - 24
      : window.innerHeight
    bar.hidden = window.scrollY < heroBottom
    syncBody()
  }

  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
}
