/** A single technical specification row, grouped under a section such as
 * "Electrical & Power" or "Lamp Source" — matches the structure of Leksa's
 * own product spec sheets. */
export interface Spec {
  group: string
  label: string
  value: string
}

/** One of the small labelled callouts Leksa uses on its own spec sheets
 * (an icon, a headline label, and an optional secondary line). */
export interface ProductHighlight {
  icon: string | null
  label: string
  sub: string | null
}

/** A certification/compliance badge (CE, RoHS, BIS, ISO, LM79/80, etc). */
export interface ProductCertification {
  image: string | null
  label: string | null
}

/** A downloadable file associated with the product (catalogue page,
 * user manual, dimensions sheet, IES photometric file, datasheet). */
export interface ProductDocument {
  label: string
  url: string
}

/** A supporting technical image: dimensional drawing, light-distribution
 * curve, chromaticity chart, lux-level chart, etc — distinct from the
 * product photography in `gallery`. */
export interface ProductDiagram {
  image: string
  label: string
}

export interface Product {
  slug: string
  url: string
  name: string
  model: string | null
  /** Raw SKU as supplied by the product-data source (Excel import). */
  sku?: string | null
  category: string
  subcategory: string | null
  description: string | null
  /** Full-length description, kept separate from the short `description`
   * shown on cards/hero copy whenever the source data provides both. */
  longDescription?: string | null
  specs: Spec[]
  features: string[]
  image: string | null
  /** All product photography for this item, primary image first. Falls
   * back to `[image]` wherever a product has no dedicated gallery data. */
  gallery?: string[]
  /** Headline numbers (power, lumens, life hours, IP/IK rating) shown as
   * quick-reference chips ahead of the full specification table. */
  quickSpecs?: { label: string; value: string }[]
  highlights?: ProductHighlight[]
  certifications?: ProductCertification[]
  documents?: ProductDocument[]
  diagrams?: ProductDiagram[]
  /** Selectable configuration options (Size, Power, Colour/Finish, CCT…)
   * available for this product, mirroring a WooCommerce variable product's
   * attributes. Undefined/empty when the product has no selectable
   * variants — the single-product fields above are then the only data. */
  variantAttributes?: ProductVariantAttribute[]
  /** The individual purchasable configurations of this product. When
   * present, the fields above (image, description, specs, etc.) reflect
   * the first/default variant, and the UI should let the customer switch
   * between these on the same page rather than navigating elsewhere. */
  variants?: ProductVariant[]
}

/** One selectable configuration axis on a variable product, e.g.
 * { key: 'power', label: 'Power', options: ['30W', '50W', '80W'] }. */
export interface ProductVariantAttribute {
  key: string
  label: string
  options: string[]
}

/** A single purchasable configuration of a variable product. Carries its
 * own image/specs/documents so the product page can update everything
 * shown on screen the moment the customer picks a different option. */
export interface ProductVariant {
  /** Stable identifier for this variant (the variant's own original
   * product slug from the source catalogue). */
  id: string
  /** This variant's value for each key in the parent's `variantAttributes`
   * (e.g. { power: '80W' }). */
  attributes: Record<string, string>
  sku: string | null
  model: string | null
  description: string | null
  longDescription?: string | null
  image: string | null
  gallery?: string[]
  quickSpecs?: { label: string; value: string }[]
  specs: Spec[]
  features: string[]
  highlights?: ProductHighlight[]
  certifications?: ProductCertification[]
  documents?: ProductDocument[]
  diagrams?: ProductDiagram[]
  /** Other original catalogue slugs that were merged into this variant
   * (duplicate source rows for the same configuration), kept so old links
   * to any of them still resolve to the right variant. */
  aliasSlugs?: string[]
}

export interface Category {
  slug: string
  name: string
  description: string | null
  productCount: number
  subcategories: string[]
  image: string | null
  sourceCategory: string | null
}

export interface ProjectItem {
  slug: string
  url: string
  name: string
  tags: string[]
  image: string | null
}

export interface NewsItem {
  slug: string
  url: string
  title: string
  image: string | null
  date: string
}

export interface Resource {
  id: string
  title: string
  productSlug: string | null
  url: string
  fileType: string
}

export interface ExpertiseItem {
  slug: string
  name: string
  description: string
  categorySlug: string
}
