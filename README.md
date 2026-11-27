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
| Design tokens (the only place for colours) | `src/styles/tokens.css` |
| Design system, layouts, decisions | `design/DESIGN.md` |
| Markets (codes, languages, hero demo markets) | `src/data/markets.ts` |
| Flags (flag-icons, MIT; ES and MX simplified) | `public/flags/` |
| Headers, redirects, Node version | `netlify.toml` |

## Placeholders to fill

- Prices: `priceFrom` in every `src/content/services/*.md` (`"TBD"` renders as "Price on request").
- Email: `company.email` in `src/data/company.ts`.
- Logos: `public/brand/` holds the three PNGs and `wordmark.svg` (the "MyPages" wordmark traced from the PNGs, used by `src/components/Logo.astro`). `npm run brand` (also part of every build) regenerates the favicons and `og-default.png` from it.
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
- Dark mode
- Animations beyond the one-time hero demo sequence
- Illustrations and stock photography
- Chatbot
- Case studies (a `<!-- TODO: real case study -->` slot is on the home page)
