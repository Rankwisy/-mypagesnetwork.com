# mypagesnetwork.com design system

The concept is that the result page is the medium. Clients judge us by how they show up in search results, so the site is built from result entries: a title link, a URL path line and a two-line snippet. Highlighter yellow marks matched terms the way search engines bold query matches. Everything else stays quiet.

## Tokens (`src/styles/tokens.css`)

No raw hex values appear outside that file. Every colour is derived from the logo blue `#0F4392`, which was sampled from `MYPAGES_Logo_Main.png` and `MYPAGES_Logo_Small.png` (7,284 of the opaque dark pixels in the small logo are exactly `#0F4392`).

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--brand` | `#0F4392` | Result titles, links, focus ring, logo | 9.4:1 on paper, 8.4:1 on mist |
| `--brand-deep` | `#0A2C63` | Footer and markets band background, headings | 13.5:1 on paper |
| `--text` | `#1E2B3C` | Body text | 14.3:1 on paper |
| `--muted` | `#5B6B7F` | URL paths, captions | 5.5:1 on paper, 4.9:1 on mist |
| `--paper` | `#FFFFFF` | Main background | |
| `--mist` | `#EEF3FA` | Alternate sections, inputs, tool panels | |
| `--mark` | `#FFD84D` | Highlighter and primary button | `--brand-deep` on mark is 9.8:1. Never used as text on white (1.4:1) |
| `--rule` | `#D3DDEB` | Hairlines between entries | Decorative only |
| `--on-deep` / `--on-deep-muted` | `#FFFFFF` / `#C4D3EA` | Text on `--brand-deep` | 13.5:1 / 8.9:1 |

- **Shadow:** a single token, `--lift`, used only on the hero demo panel and on open menus.
- **Gradients:** none in the UI. The logo's own gradient (`#0F4392` at bottom left to `#4A71AD` at top right) appears only in the OG image.

## Type

- **Family:** Schibsted Grotesk, variable 400–800, self-hosted through Astro Fonts with `display: swap`. Only the variable file is preloaded.
- **Scale:** ratio 1.25, fluid with `clamp()`.

| Role | Size | Weight / spacing | Line height |
|---|---|---|---|
| Display | `clamp(3.5rem, 2.6rem + 3.6vw, 4.75rem)` on desktop | 800, tracking −0.02em | 1.05 |
| H2 | `clamp(2.25rem, 1.9rem + 1.4vw, 2.75rem)` | 800 | |
| H3 | `clamp(1.4rem, 1.3rem + 0.4vw, 1.6rem)` | 700 | |
| Body | 1.0625rem | | 1.6 |
| Small | 0.875rem | | |

- **Mobile display:** at 375px the 3.5rem floor can't hold a 14-word headline, so display drops to `clamp(2.5rem, …)` below 600px. That keeps it inside the gutter.
- **Measure:** body text is capped at 68ch.
- **Numbers:** tabular figures are used for market counts, years and prices.
- **Banned:** ALL-CAPS eyebrow labels, single-word colour or italic accents in headlines, middle-dot meta strings, `→` on buttons or links, and monospace labels.

## Shape and space

- **Spacing:** 8px base. Section padding `clamp(4rem, 10vw, 8rem)` block. Gutters 24px on mobile, 40px on desktop.
- **Radii:**
  - Inputs and buttons: 8px.
  - Hero demo panel: 16px.
  - Result entries: 0, because hairlines separate them.
- **Grid:** 12 columns, max width 1240px, left-aligned everywhere. Only the closing CTA is centred.

## Layouts

### Home

```
[logo]   Services  Free tools  Markets  About   [EN ▾] [Get a proposal]
--------------------------------------------------------------------------
H1 Rank in every market your customers search in.   (7 cols)
Sub, [Get a proposal] [Start with an audit]
                                   ┌ hero demo, 5 cols, 16px, --lift ┐
                                   │ query: running shoes             │
                                   │ US en  Open in Google US         │
                                   │ ...8 markets                     │
                                   └──────────────────────────────────┘
                                   Full simulator with 25+ countries and devices
Trust strip: Since 2009 | 20 markets | US + UK entities | 5 languages
Services as result entries (10, 2 columns on desktop)
How we work: Baseline, Prioritise, Ship, Measure (horizontal timeline)
MARKETS band (--brand-deep): 20 x flag + code + language, CET/ET line
Free tools: 3 result entries + "Try it"
Who you're dealing with: legal facts from company.ts
Closing CTA (centred)
Footer (--brand-deep, white logo)
```

### Service

```
crumbs
H1 + value line + CTAs (7 cols)  |  "What you get" deliverables (5 cols)
body copy (68ch)                 |  sticky aside: priceFrom + Get a proposal (desktop)
Process: timeline
Who it is for / Engagement models / FAQ <details>
Related: result entries
```

### Tool

```
crumbs, H1, lead
[ mist panel: tool UI, 48px inputs, labels above, outputs as result entries + Copy ]
body copy, markets (landing tier)
full-width upsell band "Want us to fix it?"
FAQ
```

### Other templates

- **Markets** (`/markets/`): one result entry per market, with flag, country, languages and services.
- **Legal, privacy, terms:** a 68ch document with a sticky table of contents on desktop.
- **404:** "No results for this page" in result-page styling.

## Components

| Component | Purpose |
|---|---|
| `Logo.astro` | Traced SVG wordmark, `currentColor`, served as `/brand/wordmark.svg#w` and drawn with `<use>` so it is cached once |
| `Header.astro` | Sticky header. The hairline appears through a CSS scroll-driven animation (no JS). The mobile menu and language switcher are native `<details>` |
| `Footer.astro` | `--brand-deep` background, white wordmark |
| `Result.astro` | Title link, path line built from the URL, snippet with `<mark>` on matched terms |
| `Timeline.astro` | Numbered horizontal steps (a real sequence) |
| `HeroDemo.astro` | Live mini simulator. Imports `simulatorUrl` from `src/lib/tools/google.ts`. Works without JS as static links |
| `Flag.astro` | 4:3 SVG flag from `public/flags/` (flag-icons, MIT). ES and MX are simplified to plain bands, because the originals are 80 KB each for a 20px image |
| `Faq.astro`, `Breadcrumbs.astro`, `Cta.astro`, `Toc.astro` | |

## Self-review against generic agency defaults

| Default | Where it crept into the plan | Change |
|---|---|---|
| Dark gradient hero | No. Hero is white | Kept. Blue is reserved for type and the demo border |
| Rocket or graph illustration | No | Hero visual is the working demo |
| Stat counters | The trust strip read like "17+ years / 20 markets / 5 languages" in large numbers | Plain text row in body size, tabular numerals, no count-up, no icons |
| Identical cards | The old site used cards for services, tools, steps, stats, models and upsells | Services, tools, related links and markets are result entries separated by hairlines. Engagement models become a simple three-row list |
| Eyebrow labels | The old site used `.kicker` and `.tag` in uppercase | Both deleted. Context goes in the URL path line instead |
| Centred everything | | Left-aligned. Only the closing CTA is centred |
| "EU + US entity" | The brief's trust strip says this | The group is a US LLC plus a UK company, and the UK is not in the EU. The strip says "US + UK entities" |

## Decisions to confirm

- `MYPAGES_Logo_Alt.png` is a different lockup ("MYPAGES" in capitals, a light "PAGES", a chevron A), not a white version of the "MyPages" wordmark. To keep one mark across the site, the footer and markets band use the traced "MyPages" wordmark in white instead. The Alt file stays in the repo, unused.
- Page `<title>`s still end in "| MYPAGES", because titles are locked by the brief. The UI uses "MyPages".

## Critique pass (after screenshots)

- **Breadcrumbs:** the list kept the browser's default 40px indent, so on every template the breadcrumbs sat out of line with the H1. Fixed.
- **Tool pages:** at 375px the display-size H1 pushed the tool below the fold. Tool pages now set their H1 at H2 size, so the mist tool panel starts in the first viewport.
- **Tabular figures:** Schibsted Grotesk's tabular figures also widen commas and periods, which left gaps like "Company , entity". Tabular numerals now apply only to `.num` spans, the market codes and the counters.
- **Market entries:** the path line showed URLs that don't exist (`/markets/us`). They now show the real anchor (`markets #us`), and the title links to it.
- **Service closing CTA:** the heading lowercased the service name ("local seo"). It now keeps the name as written.
- **Removed decoration:** the checkmark glyphs on "What you get" and "Who it is for". The hairlines already separate the items and the ticks added nothing. That leaves three non-text marks on the site: the timeline step markers (a real sequence), flags (data) and the highlighter.
