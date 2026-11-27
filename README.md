# mypagesnetwork.com

Corporate site for MYPAGES L.L.C. Astro (static), plain CSS, Netlify.

## Run

```sh
nvm use            # Node 26 LTS, see .nvmrc
npm install
npm run dev        # http://localhost:4321
npm run build      # tool checks + brand assets + astro check + build + SEO crawl
```

`npm run build` fails on any type error, missing title/description/canonical/H1,
invalid JSON-LD, duplicate titles or descriptions, broken internal links, inline
scripts (CSP), images without alt, or service/tool pages under 600 words.

## Where things live

| What | Where |
|---|---|
| Legal and company data (single source) | `src/data/company.ts` |
| Service pages | `src/content/services/*.md` (one file = one page) |
| Tool pages | `src/content/tools/*.md` (one file = one page + hub card) |
| Native tool logic (ported from Isearchtrends) | `src/lib/tools/google.ts`, checked by `scripts/check-tools.mjs` |
| Tool UIs | `src/components/tools/*.astro` |
| JSON-LD builders | `src/lib/schema.ts` |
| Headers, redirects, Node version | `netlify.toml` |

## Placeholders to fill

- Prices: `priceFrom` in every `src/content/services/*.md` (`"TBD"` renders as "Price on request").
- Email: `company.email` in `src/data/company.ts`.
- Logos: drop `MYPAGES_Logo_Main.png`, `MYPAGES_Logo_Alt.png`, `MYPAGES_Logo_Small.png` in `public/brand/`, then `npm run brand` (also runs on every build). The header switches to the main logo automatically; favicons and `og-default.png` are regenerated from the small logo.
- EIN: leave `ein: null` unless it should be published.
- Analytics: set `PUBLIC_PLAUSIBLE_DOMAIN=mypagesnetwork.com` in Netlify env vars to load Plausible (cookieless). Netlify Analytics needs no snippet.
- Privacy policy (`src/pages/privacy.astro`) is marked for lawyer review.

## Adding a language later

Routing is ready for `/fr/`, `/es/`, `/nl/`: add the locale to `i18n.locales` in `astro.config.mjs`,
add translated tool files with `lang: "fr"` (widen the enum in `src/content.config.ts`), create
`src/pages/[lang]/tools/[slug].astro`, and pass `alternates` to `Base.astro` for hreflang.

## Later (out of scope at launch)

- Blog
- CMS
- Login / client area
- Payments
- Multilingual pages (FR, ES, NL)
- Cookie banner (not needed while the site sets no cookies)
