export function initNavigation() {
  const header = document.getElementById('site-header')
  const menu = document.getElementById('mobile-menu')
  const openBtn = document.querySelector('.nav-toggle:not(.nav-toggle--close)')
  const closeBtn = document.querySelector('.nav-toggle--close')
  const links = menu?.querySelectorAll('a') ?? []
  const moreBtn = document.querySelector('.nav__more-btn')
  const dropdown = document.querySelector('.nav__dropdown')

  const setOpen = (open) => {
    if (!menu || !openBtn) return
    menu.hidden = !open
    menu.classList.toggle('is-open', open)
    openBtn.setAttribute('aria-expanded', String(open))
    openBtn.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen')
    document.documentElement.classList.toggle('menu-open', open)
  }

  openBtn?.addEventListener('click', () => setOpen(true))
  closeBtn?.addEventListener('click', () => setOpen(false))
  links.forEach((link) => link.addEventListener('click', () => setOpen(false)))
  menu?.addEventListener('click', (event) => {
    if (event.target === menu) setOpen(false)
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false)
      if (dropdown) {
        dropdown.hidden = true
        moreBtn?.setAttribute('aria-expanded', 'false')
      }
    }
  })

  moreBtn?.addEventListener('click', () => {
    if (!dropdown) return
    const open = dropdown.hidden
    dropdown.hidden = !open
    moreBtn.setAttribute('aria-expanded', String(open))
  })

  document.addEventListener('click', (event) => {
    if (!moreBtn || !dropdown) return
    if (!event.target.closest('.nav__more')) {
      dropdown.hidden = true
      moreBtn.setAttribute('aria-expanded', 'false')
    }
  })

  const onScroll = () => {
    header?.classList.toggle('is-stuck', window.scrollY > 8)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}
