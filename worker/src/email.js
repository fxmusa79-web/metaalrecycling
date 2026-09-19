/**
 * Contact form email helpers — Resend HTML + text + attachments.
 */

export function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildBusinessEmail({ data, sourcePage, submittedAt }) {
  const subject = `Nieuwe aanvraag via DuurzaamMetaalRecycling.nl — ${data.requestType}`

  const rows = [
    ['Naam', data.name],
    ['Bedrijf', data.company || '—'],
    ['Telefoon', data.phone],
    ['E-mail', data.email],
    ['Type aanvraag', data.requestType],
    ['Locatie', data.location || '—'],
    ['Datum/tijd', submittedAt],
    ['Pagina/herkomst', sourcePage || '—'],
  ]

  const text = [
    'Nieuwe aanvraag via DuurzaamMetaalRecycling.nl',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Omschrijving:',
    data.description,
    '',
    data.attachments.length
      ? `Foto’s: ${data.attachments.length} bijlage(n)`
      : 'Foto’s: geen',
  ].join('\n')

  const rowHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5ebe4;color:#5a635c;width:34%;font-size:14px;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5ebe4;color:#1f2426;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="nl">
<body style="margin:0;padding:0;background:#f4f6f4;font-family:Segoe UI,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:640px;background:#ffffff;border:1px solid #d8e0d7;border-radius:6px;overflow:hidden;">
          <tr>
            <td style="background:#297324;padding:18px 22px;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Duurzaam Metaal Recycling</div>
              <div style="font-size:22px;font-weight:700;margin-top:4px;">Nieuwe aanvraag</div>
            </td>
          </tr>
          <tr>
            <td style="padding:22px;">
              <p style="margin:0 0 14px;color:#297324;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Type aanvraag</p>
              <p style="margin:0 0 20px;font-size:18px;font-weight:700;color:#1f2426;">${escapeHtml(data.requestType)}</p>

              <p style="margin:0 0 10px;color:#297324;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Contactgegevens</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5ebe4;border-radius:4px;margin-bottom:18px;">
                ${rowHtml}
              </table>

              <p style="margin:0 0 8px;color:#297324;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">Omschrijving</p>
              <p style="margin:0 0 18px;white-space:pre-wrap;color:#1f2426;font-size:14px;line-height:1.5;">${escapeHtml(data.description)}</p>

              <p style="margin:0;color:#5a635c;font-size:13px;">
                ${
                  data.attachments.length
                    ? `${data.attachments.length} foto(’s) als bijlage meegestuurd.`
                    : 'Geen foto’s meegestuurd.'
                }
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}

export function buildCustomerConfirmation({ name, requestType }) {
  const subject = 'Wij hebben uw aanvraag ontvangen'
  const text = [
    `Beste ${name || 'heer/mevrouw'},`,
    '',
    'Bedankt voor uw aanvraag bij Duurzaam Metaal Recycling.',
    `We hebben uw verzoek ontvangen (${requestType}) en nemen contact met u op.`,
    '',
    'Met vriendelijke groet,',
    'Duurzaam Metaal Recycling',
    'info@duurzaammetaalrecycling.nl',
    '06 48 66 71 82',
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="nl">
<body style="margin:0;padding:0;background:#f4f6f4;font-family:Segoe UI,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #d8e0d7;border-radius:6px;">
          <tr>
            <td style="background:#297324;padding:16px 20px;color:#ffffff;font-weight:700;font-size:18px;">
              Duurzaam Metaal Recycling
            </td>
          </tr>
          <tr>
            <td style="padding:22px;color:#1f2426;font-size:15px;line-height:1.55;">
              <p style="margin:0 0 12px;">Beste ${escapeHtml(name || 'heer/mevrouw')},</p>
              <p style="margin:0 0 12px;">Bedankt voor uw aanvraag. We hebben uw gegevens ontvangen${
                requestType ? ` (<strong>${escapeHtml(requestType)}</strong>)` : ''
              } en nemen contact met u op.</p>
              <p style="margin:0;">Met vriendelijke groet,<br/>Duurzaam Metaal Recycling</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}

/**
 * Send via Resend. Attachments: [{ filename, content (base64) }]
 */
export async function sendResendEmail({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  text,
  html,
  attachments = [],
}) {
  if (!apiKey) {
    return {
      ok: false,
      configured: false,
      error: 'MAIL_NOT_CONFIGURED',
      message: 'E-mailservice is nog niet geconfigureerd (RESEND_API_KEY ontbreekt).',
    }
  }

  if (!from) {
    return {
      ok: false,
      configured: true,
      error: 'MAIL_FROM_MISSING',
      message: 'Afzenderadres ontbreekt (RESEND_FROM_EMAIL).',
    }
  }

  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
  }

  if (replyTo) payload.reply_to = replyTo

  if (attachments.length) {
    payload.attachments = attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
    }))
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    let detail = ''
    try {
      detail = await res.text()
    } catch {
      detail = ''
    }
    console.error('[resend]', res.status, detail.slice(0, 500))
    return {
      ok: false,
      configured: true,
      error: 'MAIL_SEND_FAILED',
      message: 'E-mail verzenden mislukt. Probeer het later opnieuw of bel ons.',
    }
  }

  return { ok: true, configured: true }
}
