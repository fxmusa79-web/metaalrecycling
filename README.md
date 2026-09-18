# Duurzaam Metaal Recycling

Industrial metal recycling website for **Duurzaam Metaal Recycling** (Foxhol).

- Production domain: https://duurzaammetaalrecycling.nl
- GitHub: https://github.com/fxmusa79-web/metaalrecycling
- Stack: Vite multi-page static site + optional Cloudflare Worker API

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Cloudflare Pages

Connect the GitHub repository `fxmusa79-web/metaalrecycling` to Cloudflare Pages.

| Setting | Value |
|--------|--------|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `20` (see `.nvmrc`) |

Custom domains:

- `duurzaammetaalrecycling.nl`
- `www.duurzaammetaalrecycling.nl`

DNS must be configured in Cloudflare (not in this repo).

Pages serves the multi-page HTML routes as built by Vite, for example:

- `/`
- `/metaal-inkoop.html`
- `/recycling.html`
- `/demontage.html`
- `/materialen.html`
- `/werkgebied.html`
- `/over-ons.html`
- `/contact.html`
- `/faq.html`

Do **not** force all traffic to `index.html` — this is not an SPA.

## Cloudflare Worker (API)

Optional backend lives in `/worker`.

```bash
cd worker
npm install
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
npm run deploy
```

Prepared routes:

- `POST /api/contact`
- `POST /api/request`

Expected JSON fields: `name`, `company`, `phone`, `email`, `requestType`, `location`, `description`, optional `turnstileToken`.

Photo uploads are **not** sent as large JSON blobs. Wire storage separately (or attach via e-mail) before enabling production uploads.

Secrets belong in Wrangler / Cloudflare — never commit `.env`, `.dev.vars`, or private keys.

## Architecture

```
Cloudflare Pages  →  static website (this repo root / dist)
Cloudflare Worker →  /api/* (worker/)
```

## Security notes

- Deploy keys and API secrets stay outside git
- Server-side validation is required for forms (Worker)
- Client-side checks alone are not enough
