/**
 * Temporary site-wide payment notice overlay.
 * Set ENABLED to false (and redeploy) to remove later.
 */
export const PAYMENT_NOTICE = {
  enabled: false,
  email: 'info@tinsightsagency.com',
  phoneDisplay: '+31 020 369 1663',
  phoneHref: 'tel:+31203691663',
  invoicesUrl: 'https://invoices.tinsightsagency.com',
}

export function PaymentNoticeMarkup() {
  if (!PAYMENT_NOTICE.enabled) return ''

  const { email, phoneDisplay, phoneHref, invoicesUrl } = PAYMENT_NOTICE

  return `
    <div
      class="payment-notice"
      id="payment-notice"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="payment-notice-title"
      aria-describedby="payment-notice-text"
    >
      <div class="payment-notice__backdrop" aria-hidden="true"></div>
      <div class="payment-notice__panel">
        <p class="payment-notice__eyebrow">Account notice</p>
        <h2 class="payment-notice__title" id="payment-notice-title">Oh no!</h2>
        <p class="payment-notice__lead" id="payment-notice-text">
          There may be an outstanding payment or unpaid invoice(s) linked to this website.
          Access to the live site is temporarily restricted until this is resolved.
        </p>
        <p class="payment-notice__body">
          If you believe this is a mistake, or you need help settling an invoice,
          please contact TINSIGHTS using the options below.
        </p>

        <div class="payment-notice__actions">
          <a
            class="btn btn--primary payment-notice__btn"
            href="${invoicesUrl}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here for more information
          </a>
          <a class="btn btn--secondary payment-notice__btn" href="mailto:${email}">
            Email ${email}
          </a>
          <a class="btn btn--secondary payment-notice__btn" href="${phoneHref}">
            Call ${phoneDisplay}
          </a>
        </div>

        <p class="payment-notice__footnote">
          Invoices &amp; support:
          <a href="${invoicesUrl}" target="_blank" rel="noopener noreferrer">invoices.tinsightsagency.com</a>
        </p>
      </div>
    </div>
  `
}

export function initPaymentNotice() {
  if (!PAYMENT_NOTICE.enabled) return
  const root = document.getElementById('payment-notice')
  if (!root) return

  document.documentElement.classList.add('payment-notice-active')
  document.body.classList.add('payment-notice-active')

  // Trap focus inside the notice (no dismiss)
  const focusables = root.querySelectorAll('a, button')
  const first = focusables[0]
  const last = focusables[focusables.length - 1]

  first?.focus({ preventScroll: true })

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || focusables.length === 0) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus({ preventScroll: true })
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus({ preventScroll: true })
    }
  })
}
