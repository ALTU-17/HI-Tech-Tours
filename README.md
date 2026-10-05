# Hi-Tech Haj Umrah Services — website

Bilingual (English / हिन्दी) marketing site for Hi-Tech Haj Umrah Services, Jalna —
a Haj and Umrah travel desk serving all eight districts of Marathwada.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4** and exported
as a **fully static site**. There is no server, no database and no hosting cost;
Node.js is needed only to build.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000/en
npm run build      # → static site in ./out
npm run preview    # serve ./out locally
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

Requires Node 20.9+ (`.nvmrc` pins 22).

---

## What is in the build

`npm run build` emits **94 static pages** plus the SEO/GEO endpoints:

| Output | Purpose |
| --- | --- |
| `out/en/**`, `out/hi/**` | Every page, in both languages, as real HTML |
| `out/sitemap.xml` | With `hreflang` alternates for `en`, `hi`, `x-default` |
| `out/robots.txt` | Explicit allow-list for Google, Bing and 16 AI crawlers |
| `out/llms.txt` | Machine-readable summary (llmstxt.org) |
| `out/llms-full.txt` | Full site text for model consumption |
| `out/data/packages.json` | Structured feed: packages, services, coverage, FAQ |
| `out/og-en.png`, `out/og-hi.png` | Per-locale social cards (1200×630) |
| `out/manifest.webmanifest` | PWA manifest for "add to home screen" |

### Routes

- `/` → forwards to `/en` (see [Language strategy](#language-strategy))
- `/[locale]` — home
- `/[locale]/umrah-packages`, `/[locale]/hajj`
- `/[locale]/services` + 12 × `/[locale]/services/[slug]`
- `/[locale]/locations` + 15 × `/[locale]/locations/[city]`
- `/[locale]/guides` + 5 × `/[locale]/guides/[slug]`
- `/[locale]/about`, `/contact`, `/faq`, `/reviews`

`en` and `hi` are always present in `generateStaticParams`, so both languages are
prerendered.

---

## Language strategy

The two languages are **separate URL trees**, not a client-side toggle. This is
the single most important SEO decision in the project: a toggle that swaps text in
place would hide all the Hindi content from crawlers, and a Hindi speaker (a
large share of this audience) would land on a page Google may not have indexed in
their language.

- `/en/...` and `/hi/...` each render `<html lang="en-IN">` / `<html lang="hi-IN">`
  **on the server**.
- Every page emits `canonical` + `rel="alternate" hreflang` for `en`, `hi` and
  `x-default`, telling search engines they are translations of one page.
- The header language toggle is a real `<Link>` to the same path in the other
  language, so it is crawlable and shareable.
- **There is no automatic `Accept-Language` redirect.** Redirecting on language
  preference splits crawl equity and pushes visitors somewhere they did not ask
  to go. Instead, an English page shows a small dismissible "हिंदी में पढ़ें" banner
  only to browsers that actually prefer Hindi.

Copy lives in `src/i18n/en.ts` and `src/i18n/hi.ts`. `hi.ts` is typed as
`Dictionary`, so a missing or misspelled key is a **build error**, not a blank
spot on the page.

> `src/i18n/en.ts` is intentionally **not** `as const`. Widening literals to
> `string` is what allows `hi.ts` to satisfy the same type.

---

## Editing content

All content is data, not markup. You should rarely need to touch a component.

| What | Where |
| --- | --- |
| Name, address, phone, branches, office hours | `src/data/site.ts` |
| Umrah packages, inclusions, exclusions | `src/data/packages.ts` |
| The 12 services | `src/data/services.ts` |
| Districts, airports, distances, pickups | `src/data/locations.ts` |
| FAQ (feeds `FAQPage` schema) | `src/data/faq.ts` |
| Long-form guides | `src/data/guides.ts` |
| Reviews | `src/data/reviews.ts` |
| Process steps, inclusions grid, pillars | `src/data/journey.ts` |
| UI copy (en) | `src/i18n/en.ts` |
| UI copy (hi) | `src/i18n/hi.ts` |

`src/data/site.ts` is the **single source of truth for NAP** (name, address,
phone). The visible pages, the JSON-LD, `llms.txt` and the JSON feed all read from
it, so they cannot drift apart. Change it there and rebuild.

---

## Before you launch

Items marked `TODO` in the code are deliberately left as honest placeholders
rather than plausible-looking guesses. Search the codebase for `TODO(owner)`:

- [x] **Aurangabad head-office street address and map pin** — Jinsi
      Chowk, in front of Kelgaonkar Hospital, Jinsi Police Station Road
      (see `site.street`, `site.geo`, `site.offices[0].mapUrl`)
- [ ] **Dedicated business phone and WhatsApp number** — the site currently uses
      the first branch number printed on the banner
- [ ] **Real customer reviews** — see below
- [ ] **Google Business Profile URL** — paste into `googleUrl` in
      `src/data/reviews.ts`
- [ ] **Years in operation / pilgrims served** — only shown once you supply them
- [ ] **IATA / Ministry of Tourism registration numbers**, if held
- [ ] **Expand two abbreviated branch landmarks** — the banner prints
      "Pachma Ringana" and one 9-digit number; both are flagged on the contact
      page as `note` fields
- [ ] **Set the real domain** — replace `SITE_URL` in `src/data/site.ts`
- [ ] **Create the Facebook / Instagram profiles** referenced in `site.social`

### About reviews — please read

**No review on this site is real yet, and no `aggregateRating` is emitted.**
Publishing fabricated reviews or an invented star rating is structured-data spam;
Google can penalise the whole site for it, and it is simply dishonest to pilgrims.

The review wall renders with a visible "Sample" chip and a disclosure note, and
is excluded from all JSON-LD. To go live properly:

1. Create the Google Business Profile for the Jalna office.
2. Ask pilgrims who travelled with you to leave genuine reviews.
3. Paste them into `src/data/reviews.ts` with `verified: true` and a real name.

`reviewNode()` in `src/lib/schema.ts` returns `null` until that happens, and the
Google CTA switches from "coming soon" to a live link automatically. The static
`ogDefault.png` reference has already been removed, so no page points at a
missing image.

### About pricing

No package price is published anywhere, on purpose. Rates move with the month,
group size and airline pricing; a wrong published number costs more trust than no
number. Every price CTA routes to call/WhatsApp instead, and the JSON-LD
`Offer` nodes carry no `price` field rather than an invented one. If you do
publish rates, add them in `src/data/packages.ts` **and** to the Offer nodes so
the two stay consistent.

---

## SEO

- **Metadata**: one builder, `buildMetadata()` in `src/lib/seo.ts`. Every route
  gets a canonical, full `hreflang` alternates, robots directives and social
  cards.
- **JSON-LD graph** (`src/lib/schema.ts`): `TravelAgency`, `LocalBusiness` with
  NAP + geo + opening hours, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`,
  `OfferCatalog`, `ItemList`, `FAQPage`, `Article`. Nodes use stable `@id`s and
  reference each other instead of repeating entity data.
- **Programmatic location pages**: nine Marathwada districts plus six feeder
  cities, each with its own title, description, answer paragraph, airports and
  local contact. This is the highest-value local-SEO asset in the project.
- **Internal linking**: every location page links to the packages, the siblings
  and the contact page; the footer links every district from every page.
- **Sitemap**: generated from the same data as the routes, with `lastmod` taken
  from each guide's `dateModified`.

### GEO (Generative Engine Optimization)

Written for AI assistants, not just crawlers:

- `/llms.txt`, `/llms-full.txt` and `/data/packages.json` — generated from the
  same TypeScript data as the pages, so they can never contradict the site.
- **Answer-shaped openings**: every location page and every guide opens with a
  self-contained, entity-named sentence that an assistant can quote directly.
- **Decision-intent guides** targeting real LLM queries: *Haj vs Umrah*,
  *Umrah visa rules for Indian passport holders* (including why Nusuk does not
  apply), *how to choose a package without getting it wrong*, *planning Umrah
  from Marathwada*, *what to pack*.
- **Freshness signals**: visible "last updated" dates on every guide, plus
  `dateModified` in `Article` schema.
- **Correct, checkable facts** about the Haj Committee of India and the Nusuk
  restriction — being right about a policy question is what gets an agency cited.

---

## Performance

Targets: LCP < 2.0 s, CLS < 0.05, INP < 200 ms.

- Static HTML; JS is ~107 kB First Load and only powers the preloader, mobile
  drawer, scroll reveals, accordion and floating contact bar.
- Fonts self-hosted at build time by `next/font` — no third-party request, no
  layout shift.
- `content-visibility` avoided in favour of plain static sections so nothing is
  skipped for crawlers.
- The preloader is `position: fixed`, so removing it cannot shift layout, and it
  **never gates the hero image** — LCP is not delayed by the splash.

### The loading screen

`src/components/Preloader.tsx`. Eight-fold Islamic geometry draws itself via
`stroke-dasharray`, a light orbits the Kaaba (tawaf), the wordmark wipes in, and
a dual LTR/RTL progress rail is driven by real signals (`document.fonts.ready` +
`window.load`).

- Rendered **on the server**, so there is no white flash before paint.
- Minimum 1.6 s, hard cap 2.4 s, eased so it never stalls at 98 %.
- Skipped for the rest of the session (`sessionStorage`) and on repeat views.
- `prefers-reduced-motion` → short static card instead of the sequence.
- A `<noscript>` rule hides it entirely without JavaScript.

---

## Deployment

The build output is a plain folder — any static host works.

```bash
npm run build
# upload ./out
```

**Netlify / Cloudflare Pages** — build `npm run build`, publish `out`.
`public/_redirects` is included and handles `/` → `/en/` and cache headers.

**Vercel** — `vercel.json` is included (`outputDirectory: out`).
Import the GitHub repo at <https://github.com/ALTU-17/HI-Tech-Tours>, leave the
framework preset on **Next.js**, and the build command / output directory are
picked up automatically from `vercel.json`.

### Vercel Web Analytics

`@vercel/analytics` is installed and `<Analytics />` is mounted once in
[`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx), so both language
trees are tracked. It is safe under `output: 'export'` — v2 injects the
`/_vercel/insights/script.js` tag client-side, adds no server code, and adds
nothing to the static output.

Analytics must be switched on in the dashboard once per project, after the first
deploy: **Project → Analytics → Enable Web Analytics**. Until then the script tag
is still served but reports nothing, which is harmless. Reports appear at
Project → Analytics after the toggle, usually within a few minutes of the first
real page view.

**nginx** — the two rules that matter:

```nginx
location = / { return 302 /en/; }
location /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
location ~* \.(png|svg|woff2)$ { add_header Cache-Control "public, max-age=31536000, immutable"; }
```

**GitHub Pages** — no host-level redirects available; `public/index.html` acts as
a self-forwarding language entry page (it also lists both language links, so it
works for visitors and crawlers alike).

### Why `/` is not a Next route

`app/layout.tsx` does not exist: the root layout lives at `app/[locale]/layout.tsx`
so that `<html lang>` can be set server-side per language. Next requires a root
layout for every route in `app/`, so a `/` page cannot coexist with it. The root
is therefore handled by host config, with `public/index.html` as a zero-config
fallback.

---

## Project layout

```
src/
├─ app/
│  ├─ [locale]/            root layout (renders <html lang>), all pages
│  ├─ data/packages.json/  machine-readable feed (Route Handler)
│  ├─ llms.txt/            GEO entry point
│  ├─ llms-full.txt/       full text for models
│  ├─ globals.css          design tokens + components
│  ├─ sitemap.ts robots.ts manifest.ts
├─ components/
│  ├─ Preloader.tsx        the loading screen
│  ├─ layout/              Header, Footer, FloatingContact
│  ├─ home/                page sections
│  ├─ ui/                  SectionHeading, FaqAccordion
│  └─ seo/JsonLd.tsx
├─ data/                   all content + feed generation
├─ i18n/                   en.ts, hi.ts, locale helpers
└─ lib/                    seo.ts, schema.ts, contact.ts, hijri.ts, cn.ts
```

## Notes

- `postcss` is pinned via `overrides` to clear a path-traversal advisory in the
  copy Next bundles. `npm audit` is clean.
- `outputFileTracingRoot` is pinned because this package sits in a directory
  that also contains unrelated sibling projects with their own lockfiles.
- `convert to Hijri` in `src/lib/hijri.ts` is an approximate tabular conversion
  used **only** for the decorative date on the loading screen. Anything
  date-sensitive in a pilgrimage context should be confirmed with the office.