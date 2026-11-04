import raw from './leksa/products.json'
import type { Product, ProductVariant } from './types'

/**
 * The source catalogue (products.json) is a flat export where every
 * wattage of a given fixture was originally its own WooCommerce product
 * row. Real, professional lighting sites present these as ONE product with
 * a "Power" selector rather than a dozen near-duplicate listings — so on
 * load we regroup rows that only differ by their wattage into a single
 * parent product with selectable variants, and leave everything else
 * untouched. Every original slug (including duplicated source rows) still
 * resolves correctly via `getProductBySlug`.
 */

type RawProduct = Omit<Product, 'variantAttributes' | 'variants'>

const rawProducts = raw as RawProduct[]

function extractPower(name: string): string | null {
  const m = name.match(/(\d+)\s?[Ww](?!\w)/)
  return m ? `${m[1]}W` : null
}

function familyKey(p: RawProduct): string {
  const strippedName = p.name
    .replace(/\d+\s?[Ww](?!\w)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .toLowerCase()
  return `${p.category}__${p.subcategory ?? ''}__${strippedName}`
}

function cleanParentName(name: string): string {
  return name
    .replace(/(\d+)\s?[Ww](?!\w)/, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/^[-–,]+|[-–,]+$/g, '')
    .trim()
}

function richnessScore(p: RawProduct): number {
  return (
    p.specs.length +
    p.features.length +
    (p.quickSpecs?.length ?? 0) +
    (p.gallery?.length ?? 0) +
    (p.documents?.length ?? 0)
  )
}

function toVariant(p: RawProduct, attributeValue: string, aliasSlugs: string[]): ProductVariant {
  return {
    id: p.slug,
    attributes: { power: attributeValue },
    sku: p.sku ?? null,
    model: p.model,
    description: p.description,
    longDescription: p.longDescription,
    image: p.image,
    gallery: p.gallery,
    quickSpecs: p.quickSpecs,
    specs: p.specs,
    features: p.features,
    highlights: p.highlights,
    certifications: p.certifications,
    documents: p.documents,
    diagrams: p.diagrams,
    ...(aliasSlugs.length > 0 ? { aliasSlugs } : {}),
  }
}

// --- Group rows into families that share everything except wattage -------
const familyGroups = new Map<string, RawProduct[]>()
for (const p of rawProducts) {
  if (!extractPower(p.name)) continue // no wattage token → never part of a family
  const key = familyKey(p)
  const group = familyGroups.get(key)
  if (group) group.push(p)
  else familyGroups.set(key, [p])
}

const consumedSlugs = new Set<string>()
const parentProducts: Product[] = []

for (const members of familyGroups.values()) {
  if (members.length < 2) continue // only one wattage found → not a real family

  // Bucket members by their power value, since the source data has a
  // handful of exact-duplicate rows for the same wattage.
  const byPower = new Map<string, RawProduct[]>()
  for (const m of members) {
    const power = extractPower(m.name)!
    const bucket = byPower.get(power)
    if (bucket) bucket.push(m)
    else byPower.set(power, [m])
  }
  if (byPower.size < 2) continue // deduped down to a single wattage → not a real family

  const sortedPowers = [...byPower.keys()].sort((a, b) => parseInt(a, 10) - parseInt(b, 10))

  const variants: ProductVariant[] = sortedPowers.map((power) => {
    const candidates = byPower.get(power)!
    const [canonical, ...duplicates] = [...candidates].sort((a, b) => richnessScore(b) - richnessScore(a))
    return toVariant(canonical, power, duplicates.map((d) => d.slug))
  })

  for (const m of members) consumedSlugs.add(m.slug)

  const representative = candidatesFor(byPower, sortedPowers[0])
  const parentSlug = representative.slug

  parentProducts.push({
    ...representative,
    slug: parentSlug,
    name: cleanParentName(representative.name),
    variantAttributes: [{ key: 'power', label: 'Power', options: sortedPowers }],
    variants,
  })
}

function candidatesFor(byPower: Map<string, RawProduct[]>, power: string): RawProduct {
  const list = byPower.get(power)!
  return [...list].sort((a, b) => richnessScore(b) - richnessScore(a))[0]
}

const standaloneProducts: Product[] = rawProducts.filter((p) => !consumedSlugs.has(p.slug))

export const products: Product[] = [...standaloneProducts, ...parentProducts]

// --- Slug lookup, covering every original catalogue slug ------------------
interface SlugEntry {
  product: Product
  variantId: string | null
}

const slugIndex = new Map<string, SlugEntry>()

for (const p of standaloneProducts) {
  slugIndex.set(p.slug, { product: p, variantId: null })
}

for (const p of parentProducts) {
  for (const variant of p.variants ?? []) {
    slugIndex.set(variant.id, { product: p, variantId: variant.id })
    for (const alias of variant.aliasSlugs ?? []) {
      slugIndex.set(alias, { product: p, variantId: variant.id })
    }
  }
}

export const getProductsByCategory = (categorySlug: string, sourceCategory: string | null) =>
  sourceCategory ? products.filter((p) => p.category === sourceCategory) : []

/** Resolves any original catalogue slug — including a specific variant's
 * own slug — to its (possibly-parent) product and which variant, if any,
 * that slug should preselect. */
export const getProductBySlug = (slug: string): SlugEntry | undefined => slugIndex.get(slug)
