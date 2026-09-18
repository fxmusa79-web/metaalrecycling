export function initFaq() {
  document.querySelectorAll('[data-faq]').forEach((list) => {
    list.querySelectorAll('.faq-item__trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true'
        const panelId = trigger.getAttribute('aria-controls')
        const panel = panelId ? document.getElementById(panelId) : null
        const item = trigger.closest('.faq-item')

        list.querySelectorAll('.faq-item__trigger').forEach((other) => {
          if (other === trigger) return
          other.setAttribute('aria-expanded', 'false')
          const otherPanel = document.getElementById(other.getAttribute('aria-controls'))
          if (otherPanel) otherPanel.hidden = true
          other.closest('.faq-item')?.classList.remove('is-open')
        })

        trigger.setAttribute('aria-expanded', String(!expanded))
        if (panel) panel.hidden = expanded
        item?.classList.toggle('is-open', !expanded)
      })
    })
  })

  const filters = document.querySelectorAll('[data-faq-filter]')
  if (!filters.length) return

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.faqFilter
      filters.forEach((other) => {
        const active = other === btn
        other.classList.toggle('is-active', active)
        other.setAttribute('aria-selected', String(active))
      })

      document.querySelectorAll('[data-faq-cat]').forEach((item) => {
        const match = cat === 'all' || item.dataset.faqCat === cat
        item.hidden = !match
        if (!match) {
          item.classList.remove('is-open')
          const trigger = item.querySelector('.faq-item__trigger')
          const panel = item.querySelector('.faq-item__panel')
          if (trigger) trigger.setAttribute('aria-expanded', 'false')
          if (panel) panel.hidden = true
        }
      })
    })
  })
}
