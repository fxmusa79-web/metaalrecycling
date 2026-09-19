# Duurzaam Metaal Recycling

Industrial metal recycling website for **Duurzaam Metaal Recycling** (Foxhol).

- Production domain: https://duurzaammetaalrecycling.nl
- GitHub: https://github.com/fxmusa79-web/metaalrecycling
- Stack: Vite multi-page static site + Cloudflare Worker (static assets + `/api/*`)

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Production deploy (Cloudflare Workers)

This project deploys as **one Worker** with:

- Static assets from `dist/` (the Vite site)
- API handled only for `/api/*` (contact/request)

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
| Worker-first routes | `/api/*` only |

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

Prepared routes:

- `POST /api/contact`
- `POST /api/request`
- `GET /api/health`

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
