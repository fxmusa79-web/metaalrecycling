# Duurzaam Metaal Recycling

Industrial metal recycling website for **Duurzaam Metaal Recycling** (Foxhol).

- Production domain: https://duurzaammetaalrecycling.nl
- GitHub: https://github.com/fxmusa79-web/metaalrecycling
- Stack: Vite multi-page static site + Cloudflare Worker (static assets + `/api/*`)

## Local development

Requires **Node.js 22+** (Wrangler 4.135+ requires Node ≥ 22).

```bash
npm install
npm run dev
```

For the contact form API locally, run the Worker in a second terminal (Vite proxies `/api` → `:8787`):

```bash
# Terminal A — API
npm run dev:api

# Terminal B — site
npm run dev
```

Copy `worker/.dev.vars.example` → `worker/.dev.vars` and set `RESEND_API_KEY`.

```bash
npm run build
npm run preview
```

(`preview` also proxies `/api` to the Worker on port 8787.)

### Cloudflare Workers Builds (Node runtime)

This repo pins Node 22 via:

- `.nvmrc` → `22`
- `.node-version` → `22`
- `package.json` `engines.node` → `>=22.0.0`

Cloudflare Workers Builds reads `.nvmrc` / `.node-version` automatically.

Optional dashboard override (only if a build still shows Node 20):

1. Open the **metaalrecycling** Worker in Cloudflare
2. **Settings → Build → Build variables and secrets**
3. Add `NODE_VERSION` = `22`
4. Trigger a new deployment

Do **not** set `.nvmrc` back to `20` — Wrangler will fail deploy.
## Production deploy (Cloudflare Workers)

This project deploys as **one Worker** with:

- Static assets from `dist/` (the Vite site)
- API handled for `/api/*` (contact/request)

```bash
npm run deploy
```

Equivalent:

```bash
npm run build
npx wrangler deploy
```

Wrangler config: root `wrangler.toml`

| Setting | Value |
|--------|--------|
| Worker name | `metaalrecycling` |
| Assets directory | `./dist` |
| Custom domains | `duurzaammetaalrecycling.nl`, `www.duurzaammetaalrecycling.nl` |
| Worker-first | all routes (`run_worker_first = true`) |

Important:

- Use the Cloudflare account that **owns** the `duurzaammetaalrecycling.nl` zone.
- The Worker name in the dashboard must match `name` in `wrangler.toml`.
- Do **not** leave a separate Hello World Worker bound to the apex domain.
- This is a multi-page site — do **not** enable SPA `not_found_handling`.

### Secrets (API)

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put TURNSTILE_SECRET_KEY
```

Plain vars in `wrangler.toml`:

- `CONTACT_EMAIL` → `info@duurzaammetaalrecycling.nl`
- `RESEND_FROM_EMAIL` → `Duurzaam Metaal Recycling <website@duurzaammetaalrecycling.nl>`

Verify the sending domain in the [Resend dashboard](https://resend.com/domains) before production mail works.

Prepared routes:

- `POST /api/contact`
- `POST /api/request`
- `GET /api/health`
- `GET /api/version`

### Contact form email

- Frontend posts same-origin to `/api/contact` (JSON + base64 photo attachments)
- Business mail → `info@duurzaammetaalrecycling.nl` with `reply_to` = visitor email
- Photos attached to the Resend message (JPG/PNG/WEBP, max 6 × 5 MB, 15 MB total)
- Optional visitor confirmation after business mail succeeds
- Turnstile verified server-side when `TURNSTILE_SECRET_KEY` is set

### Pages routes (static)

- `/`
- `/metaal-inkoop.html`
- `/recycling.html`
- `/demontage.html`
- `/materialen.html`
- `/werkgebied.html`
- `/over-ons.html`
- `/contact.html`
- `/faq.html`

## Security notes

- Deploy keys and API secrets stay outside git
- Server-side validation is required for forms (Worker)
- Client-side checks alone are not enough
- Never put `RESEND_API_KEY` or Turnstile secrets in frontend env vars
