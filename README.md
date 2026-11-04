# Leksa Lighting — Content-Integrated Site

The approved design system (tokens, layout, header, product cards, project
cards, animations, responsive behaviour) is unchanged from the original
build. This pass replaced every piece of placeholder content with real data
extracted from `dataset_website-content-crawler_2026-08-25_06-24-52-981.json`
(a crawl of https://leksalighting.com/).

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # type-check and produce a production build in dist/
npm run preview    # serve the production build locally
```

## Where the content lives

Raw extracted JSON (untouched, one file per content type) sits in
`src/data/leksa/`:

- `products.json` — 252 real products with name, model number, category,
  subcategory, description, grouped technical specs, features and image URL
- `categories.json` — the 13 real top-level categories found in the site's
  own breadcrumb/taxonomy data, each with its real subcategories, product
  count and a representative image
- `projects.json` — 45 real portfolio projects with name, category tags and
  image
- `news.json` — 9 real news/events items (title, image, date only — several
  of these are literally "Lorem Ipsum" on the live site, so no body copy is
  shown for them)
- `resources.json` — 8 real downloadable IES photometric files found in
  `/wp-content/uploads/`, matched to their corresponding products
- `expertise.json` — the 7 real "Our Expertise" verticals with their actual
  descriptive copy
- `company.json` — Company Profile, Our Team, Director's Message, Why Leksa,
  LEXRISE and contact/branch content, transcribed from the crawled pages

Typed wrappers in `src/data/*.ts` (`products.ts`, `categories.ts`,
`content.ts`, `company.ts`, `types.ts`) expose this data to the components.

## Two extraction scripts worth knowing about

The crawl stores each product's spec sheet as unstructured markdown and its
model number/description bundled into a single WordPress excerpt string
(`"Product Model No. : LK WASH 61 – 100 Façade Lighting breathes life…"`).
Two small parsers in the extraction pipeline split these apart:

- A markdown parser groups `**Electrical & Power:**` / `**Lamp Source:**` /
  etc. sections into `{ group, label, value }` spec rows, and separates a
  `**Main Features**` section into a plain feature list.
- A model/description splitter walks the excerpt word by word and treats an
  all-caps or numeric token as part of the model code, stopping at the first
  normal-looking word to start the description. This is a heuristic, not
  perfect — a handful of the 182 parsed model numbers (out of 252 products)
  include a stray word or two. Nothing is invented; where the source page had
  no excerpt at all (68 products), `model` and `description` are simply
  `null` and the UI omits those fields rather than filling them in.

## Known data gaps (left blank rather than invented)

- No product on the live site had more than one photo captured by the
  crawler, so `ProductGallery` shows a single image rather than staged
  multi-angle views.
- Two vertical categories — **DJ & Pub Lighting** and **TV Studio
  Lighting** — have a real landing page and description but no distinct
  product SKUs in the crawl. Their listing pages correctly show the existing
  "No products found" empty state rather than fabricated products.
- Projects have no location, year, or case-study body copy in the source
  data — the project detail page shows only what's real (name, image,
  category tags).
- No contact email address exists anywhere in the crawl; only the phone
  number and four branch addresses (Mumbai, Hyderabad, Kolkata, Noida) are
  shown.
- The site's own pages disagree on Leksa's founding year — 2018 (Company
  Profile, Director's Message) vs. 2017 (Our Team). Both are shown verbatim,
  on their respective pages, with no attempt to resolve the discrepancy.

## Two small, evidence-based corrections

- Two pages ("Kumbhashi Temple", "Chandaneswar Temple") were breadcrumbed
  under a legacy "Architectural" category rather than "Portfolio", but have
  no spec sheet, no model number, and match every other project page in
  shape — they're filed under Projects instead of listed as purchasable
  products.
- One item ("C clamp") was left in WordPress's default "Uncategorized"
  bucket; it's a rigging clamp, so it's filed under the real "Lighting
  Accessories" category instead.

## Bundle size

`products.json` (483 KB) is imported directly, so the production JS bundle
is ~675 KB before gzip (~125 KB gzipped). For a real deployment this would
be worth moving behind an API or lazy-loading per category rather than
shipping the full catalogue in the initial bundle — left as-is here to keep
the data layer simple and inspectable.
