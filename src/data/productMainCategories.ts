import { categories, getCategory } from './categories'
import type { Category } from './types'

/**
 * The four groupings shown as columns in the Products mega menu
 * (Architectural & Stage, Broadcast & Events, Systems, More). Each has its
 * own dedicated landing page listing the real subcategories inside it —
 * this is the single source of truth for that grouping, used by both the
 * mega menu and the landing pages so the two never drift apart.
 */
export interface ProductMainCategory {
  slug: string
  name: string
  description: string
  /** Falls back to the first subcategory's own image when unset. */
  image: string | null
  subcategorySlugs: string[]
}

const mainCategoryDefinitions: Omit<ProductMainCategory, 'image'>[] = [
  {
    slug: 'architectural-stage',
    name: 'Architectural & Stage',
    description:
      'Explore our architectural and stage lighting solutions, engineered for professional environments, creative spaces and large-scale installations.',
    subcategorySlugs: ['architectural-lighting', 'stage-lights', 'studio-lighting', 'landscape-lighting'],
  },
  {
    slug: 'broadcast-events',
    name: 'Broadcast & Events',
    description:
      'From film sets to stadiums and nightlife, our broadcast and events range is built for camera-ready, always-on environments.',
    subcategorySlugs: ['film-fiction-lighting', 'stadium-lighting', 'dj-pub-lighting', 'tv-studio-lighting'],
  },
  {
    slug: 'systems',
    name: 'Systems',
    description: 'Control, display and staging systems that tie a production together, from DMX control to video walls and drapery.',
    subcategorySlugs: ['video-conference-lighting', 'video-wall', 'drapery-stage-crafts', 'control-system'],
  },
  {
    slug: 'more',
    name: 'More',
    description: 'Accessories and add-ons that complete a Leksa Lighting installation.',
    subcategorySlugs: ['lighting-accessories'],
  },
]

export const productMainCategories: ProductMainCategory[] = mainCategoryDefinitions.map((def) => ({
  ...def,
  image: getCategory(def.subcategorySlugs[0])?.image ?? null,
}))

export const getMainCategory = (slug: string) => productMainCategories.find((c) => c.slug === slug)

export const getMainCategoryForSubcategory = (subcategorySlug: string) =>
  productMainCategories.find((c) => c.subcategorySlugs.includes(subcategorySlug))

export const getSubcategoriesFor = (main: ProductMainCategory): Category[] =>
  main.subcategorySlugs.map((s) => getCategory(s)).filter((c): c is Category => !!c)

// Sanity check (dev-time only): every real category should belong to
// exactly one main grouping, and every referenced slug should exist.
if (import.meta.env.DEV) {
  const grouped = new Set(mainCategoryDefinitions.flatMap((d) => d.subcategorySlugs))
  for (const c of categories) {
    if (!grouped.has(c.slug)) {
      // eslint-disable-next-line no-console
      console.warn(`[productMainCategories] "${c.slug}" is not listed under any main category.`)
    }
  }
}
