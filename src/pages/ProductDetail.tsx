import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Download } from 'lucide-react'
import { getProductBySlug, getProductsByCategory } from '@/data/products'
import { getCategoryBySourceName } from '@/data/categories'
import { getMainCategoryForSubcategory } from '@/data/productMainCategories'
import { resources } from '@/data/content'
import { ProductGallery } from '@/components/ProductGallery'
import { SpecificationTable } from '@/components/SpecificationTable'
import { SmartImage } from '@/components/SmartImage'
import { Tabs, type TabItem } from '@/components/Tabs'
import { LinkButton } from '@/components/Button'
import { ProductCard } from '@/components/ProductGrid'
import { SectionHeader } from '@/components/SectionHeader'
import { NotFound } from '@/pages/NotFound'
import type { Spec } from '@/data/types'

// --- Demo "Power" ladder, used only for products with no real wattage
// variants on file, so the interactive selector can still be reviewed.
// Selecting one of these only updates the displayed Power value/text —
// it never fabricates a whole separate product record.
const STANDARD_WATTS = [3, 6, 9, 10, 12, 15, 17, 18, 20, 24, 30, 36, 40, 50, 54, 60, 72, 80, 90, 100, 120, 150, 180, 200, 250, 300, 350, 400]
const FALLBACK_POWER_OPTIONS = ['6W', '9W', '12W', '15W', '18W', '24W']

function extractWatt(value: string | undefined | null): number | null {
  if (!value) return null
  const m = value.match(/(\d+)\s?[Ww]/)
  return m ? parseInt(m[1], 10) : null
}

function extractNumber(value: string | undefined): number | null {
  if (!value) return null
  const m = value.match(/([\d,]+)/)
  return m ? parseInt(m[1].replace(/,/g, ''), 10) : null
}

/** Scales a numeric spec proportionally to the change in wattage, so
 * switching the demo Power option visibly changes more than just the
 * power label itself (lumens, current draw, etc.) — useful for showing a
 * client the intended dynamic-update behaviour before real per-wattage
 * data exists for a given product. */
function scaleByPower(original: number, originalWatt: number, newWatt: number): number {
  if (originalWatt <= 0) return original
  return Math.round((original / originalWatt) * newWatt)
}

function demoPowerOptions(actualWatt: number | null): string[] {
  if (actualWatt == null) return FALLBACK_POWER_OPTIONS
  const list = STANDARD_WATTS.includes(actualWatt) ? STANDARD_WATTS : [...STANDARD_WATTS, actualWatt].sort((a, b) => a - b)
  const idx = list.indexOf(actualWatt)
  const start = Math.max(0, Math.min(idx - 2, list.length - 6))
  const end = Math.min(list.length, start + 6)
  return list.slice(start, end).map((w) => `${w}W`)
}

// --- "CCT" selector — prefers a product's own real, listed CCT options
// (many spec sheets already enumerate these, e.g. "3000K, 4000K, 6500K")
// and only falls back to a generic Warm/Neutral/Cool White demo set when a
// product has just one fixed value on file. Skipped entirely on
// RGB/RGBW colour-changing fixtures, where a fixed white temperature
// wouldn't make sense.
const CCT_OPTIONS = ['Warm White', 'Neutral White', 'Cool White']
const CCT_LABEL_PATTERN = /colou?r\s*temperature|cct/i
const COLOR_CHANGING_PATTERN = /rgbw|\brgb\b|dmx|colou?r[\s-]?changing/i

function isColorChangingProduct(name: string, description: string | null, features: string[]): boolean {
  return (
    COLOR_CHANGING_PATTERN.test(name) ||
    (description ? COLOR_CHANGING_PATTERN.test(description) : false) ||
    features.some((f) => COLOR_CHANGING_PATTERN.test(f))
  )
}

/** A spec value like "3000K, 4000K, 6500K, 1800K" → real selectable options. */
function parseListedCctOptions(value: string | undefined): string[] | null {
  if (!value || !value.includes(',')) return null
  const parts = value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
  return parts.length > 1 ? parts : null
}

function defaultCCT(cctSpecValue: string | undefined): string {
  const raw = (cctSpecValue ?? '').toLowerCase()
  if (/warm|27\d\dk|30\d\dk/.test(raw)) return 'Warm White'
  if (/cool|65\d\dk|day ?light/.test(raw)) return 'Cool White'
  return 'Neutral White'
}

interface SpecLike {
  label: string
  value: string
}

function applyOverrides<T extends SpecLike>(items: T[] | undefined, overrides: { pattern: RegExp; value: string }[]): T[] | undefined {
  if (!items) return items
  return items.map((item) => {
    const match = overrides.find((o) => o.pattern.test(item.label))
    return match ? { ...item, value: match.value } : item
  })
}

function applyFeatureOverride(features: string[], powerLabel: string | null): string[] {
  if (!powerLabel) return features
  return features.map((f, i) => (i === 0 && /^\d+\s?[Ww]\b/.test(f) ? f.replace(/^\d+\s?[Ww]\b/, powerLabel) : f))
}

function applyCctFeatureOverride(features: string[], cctLabel: string | null): string[] {
  if (!cctLabel) return features
  return features.map((f) => (/^colou?r\s*temperature\s*:/i.test(f) ? f.replace(/:.*$/, `: ${cctLabel}`) : f))
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const entry = slug ? getProductBySlug(slug) : undefined
  const product = entry?.product

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    entry?.variantId ?? product?.variants?.[0]?.id ?? null,
  )
  const [demoPower, setDemoPower] = useState<string | null>(null)
  const [selectedCCT, setSelectedCCT] = useState<string | null>(null)

  useEffect(() => {
    setSelectedVariantId(entry?.variantId ?? entry?.product.variants?.[0]?.id ?? null)
    setDemoPower(null)
    setSelectedCCT(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const activeVariant = product?.variants?.find((v) => v.id === selectedVariantId) ?? product?.variants?.[0]

  const baseline = useMemo(() => {
    if (!product) return null
    return {
      slug: activeVariant?.id ?? product.slug,
      model: activeVariant?.model ?? product.model,
      sku: activeVariant?.sku ?? product.sku ?? null,
      description: activeVariant?.description ?? product.description,
      quickSpecs: activeVariant?.quickSpecs ?? product.quickSpecs,
      specs: (activeVariant?.specs ?? product.specs) as Spec[],
      features: activeVariant?.features ?? product.features,
      certifications: activeVariant?.certifications ?? product.certifications,
      documents: activeVariant?.documents ?? product.documents,
      diagrams: activeVariant?.diagrams ?? product.diagrams,
      image: activeVariant?.image ?? product.image,
      gallery: activeVariant?.gallery ?? product.gallery,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, activeVariant])

  const hasRealPowerVariant = !!product?.variantAttributes?.find((a) => a.key === 'power')

  const actualWatt = extractWatt(
    baseline?.quickSpecs?.find((q) => /^power$/i.test(q.label))?.value ??
      baseline?.specs.find((s) => /^power(\s+consumption)?$/i.test(s.label))?.value,
  )

  const powerOptions = hasRealPowerVariant ? product!.variantAttributes!.find((a) => a.key === 'power')!.options : demoPowerOptions(actualWatt)

  const initialDemoPower = hasRealPowerVariant ? null : (actualWatt != null ? `${actualWatt}W` : powerOptions[0])
  const currentDemoPower = demoPower ?? initialDemoPower

  const showCCT = product ? !isColorChangingProduct(product.name, baseline?.description ?? null, baseline?.features ?? []) : false
  const cctSpecValue = baseline?.specs.find((s) => CCT_LABEL_PATTERN.test(s.label))?.value
  const realCctOptions = parseListedCctOptions(cctSpecValue)
  const cctOptions = showCCT ? (realCctOptions ?? CCT_OPTIONS) : []
  const initialCCT = showCCT ? (realCctOptions ? realCctOptions[0] : defaultCCT(cctSpecValue)) : null
  const currentCCT = selectedCCT ?? initialCCT

  if (!product || !baseline) return <NotFound />

  const overrides: { pattern: RegExp; value: string }[] = []
  if (!hasRealPowerVariant && currentDemoPower) {
    overrides.push({ pattern: /^power(\s+consumption)?$/i, value: currentDemoPower })

    const newWatt = extractWatt(currentDemoPower)
    if (actualWatt && newWatt && actualWatt !== newWatt) {
      // Scale the other headline numbers proportionally so the client sees
      // more than one value change when trying each Power option.
      const lumensValue = baseline.quickSpecs?.find((q) => /^lumens$/i.test(q.label))?.value
      const fluxValue = baseline.specs.find((s) => /^net luminous flux$/i.test(s.label))?.value
      const originalLumens = extractNumber(lumensValue) ?? extractNumber(fluxValue)
      if (originalLumens) {
        const newLumens = scaleByPower(originalLumens, actualWatt, newWatt).toLocaleString()
        overrides.push({ pattern: /^lumens$/i, value: newLumens })
        overrides.push({ pattern: /^net luminous flux$/i, value: newLumens })
      }

      const currentSpec = baseline.specs.find((s) => /^input voltage\s*\/\s*current$/i.test(s.label))
      const currentMatch = currentSpec?.value.match(/^(.*?)(\d+)\s*mA(.*)$/i)
      if (currentMatch) {
        const newMa = scaleByPower(parseInt(currentMatch[2], 10), actualWatt, newWatt)
        overrides.push({ pattern: /^input voltage\s*\/\s*current$/i, value: `${currentMatch[1]}${newMa} mA${currentMatch[3]}` })
      }
    }
  }
  if (showCCT && currentCCT) overrides.push({ pattern: CCT_LABEL_PATTERN, value: currentCCT })

  const display = {
    ...baseline,
    quickSpecs: applyOverrides(baseline.quickSpecs, overrides),
    specs: (applyOverrides(baseline.specs, overrides) ?? []) as Spec[],
    features: applyCctFeatureOverride(
      applyFeatureOverride(baseline.features, !hasRealPowerVariant ? currentDemoPower : null),
      showCCT ? currentCCT : null,
    ),
  }

  const category = getCategoryBySourceName(product.category)
  const mainCategory = category ? getMainCategoryForSubcategory(category.slug) : undefined
  const related = category
    ? getProductsByCategory(category.slug, category.sourceCategory)
        .filter((p) => p.slug !== product.slug)
        .slice(0, 3)
    : []
  const resource = resources.find((r) => r.productSlug === display.slug || r.productSlug === product.slug)
  const documents =
    display.documents && display.documents.length > 0
      ? display.documents
      : resource
        ? [{ label: 'IES File', url: resource.url }]
        : []
  const galleryImages = display.gallery && display.gallery.length > 0 ? display.gallery : [display.image]

  const tabs: TabItem[] = []
  if (display.features.length > 0) {
    tabs.push({
      id: 'features',
      label: 'Features',
      content: (
        <ul className="max-w-2xl space-y-2.5">
          {display.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-tertiary" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      ),
    })
  }
  if (display.specs.length > 0) {
    tabs.push({
      id: 'specifications',
      label: 'Technical Specifications',
      content: (
        <div className="max-w-3xl">
          <SpecificationTable specs={display.specs} />
        </div>
      ),
    })
  }
  if (display.certifications && display.certifications.length > 0) {
    tabs.push({
      id: 'certifications',
      label: 'Certifications',
      content: (
        <ul className="flex flex-wrap gap-8">
          {display.certifications.map((cert, i) => (
            <li key={`${cert.label ?? 'cert'}-${i}`} className="flex flex-col items-center gap-3 text-center">
              <SmartImage
                src={cert.image}
                alt={cert.label ?? 'Certification'}
                ratio="aspect-square"
                className="w-24 md:w-28"
              />
              {cert.label && <span className="text-sm text-text-secondary">{cert.label}</span>}
            </li>
          ))}
        </ul>
      ),
    })
  }
  if (display.diagrams && display.diagrams.length > 0) {
    tabs.push({
      id: 'diagrams',
      label: 'Technical Diagrams',
      content: (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {display.diagrams.map((d, i) => (
            <div key={`${d.label}-${i}`}>
              <SmartImage src={d.image} alt={`${product.name} — ${d.label}`} ratio="aspect-square" className="w-full" />
              <p className="mt-3 text-sm text-text-secondary">{d.label}</p>
            </div>
          ))}
        </div>
      ),
    })
  }

  return (
    <div className="content-width page-padding py-10 md:py-13">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-text-tertiary">
        <Link to="/" className="hover:text-text-secondary">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-text-secondary">
          Products
        </Link>
        {mainCategory && (
          <>
            <span>/</span>
            <Link to={`/products/${mainCategory.slug}`} className="hover:text-text-secondary">
              {mainCategory.name}
            </Link>
          </>
        )}
        {category && (
          <>
            <span>/</span>
            <Link to={`/products/${mainCategory ? `${mainCategory.slug}/` : ''}${category.slug}`} className="hover:text-text-secondary">
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-text-secondary">{product.name}</span>
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
        <ProductGallery key={activeVariant?.id ?? product.slug} productName={product.name} images={galleryImages} />

        <div>
          {product.subcategory && <p className="text-sm font-medium text-text-tertiary">{product.subcategory}</p>}
          <h1 className="mt-2 text-3xl font-light text-text-primary lg:text-4xl">{product.name}</h1>
          {(display.sku || display.model) && (
            <p className="mt-1 text-sm text-text-tertiary">Product Code: {display.sku ?? display.model}</p>
          )}

          {display.quickSpecs && display.quickSpecs.length > 0 && (
            <p className="mt-3 text-sm text-text-secondary">
              {display.quickSpecs.map((q, i) => (
                <span key={q.label}>
                  {i > 0 && ' · '}
                  <span className="font-medium text-text-primary">{q.value}</span> {q.label}
                </span>
              ))}
            </p>
          )}

          {display.description && (
            <p className="mt-5 text-lg leading-relaxed text-text-secondary">{display.description}</p>
          )}

          {(powerOptions.length > 0 || showCCT) && (
            <div className="mt-7 space-y-5">
              {powerOptions.length > 0 && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary">
                    Power Consumption
                    <span className="ml-1.5 normal-case tracking-normal text-text-secondary">
                      — {hasRealPowerVariant ? activeVariant?.attributes.power : currentDemoPower}
                    </span>
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Power Consumption">
                    {powerOptions.map((option) => {
                      const isSelected = hasRealPowerVariant ? activeVariant?.attributes.power === option : currentDemoPower === option
                      return (
                        <button
                          key={option}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => {
                            if (hasRealPowerVariant) {
                              const variant = product.variants?.find((v) => v.attributes.power === option)
                              if (variant) setSelectedVariantId(variant.id)
                            } else {
                              setDemoPower(option)
                            }
                          }}
                          className={`h-10 min-w-[3.25rem] rounded-md border px-4 text-sm font-medium transition-colors duration-150 ${
                            isSelected
                              ? 'border-interactive-default bg-interactive-default text-interactive-inverse'
                              : 'border-border-strong text-text-primary hover:border-interactive-default'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {showCCT && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary">
                    CCT
                    <span className="ml-1.5 normal-case tracking-normal text-text-secondary">— {currentCCT}</span>
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2" role="radiogroup" aria-label="CCT">
                    {cctOptions.map((option) => {
                      const isSelected = currentCCT === option
                      return (
                        <button
                          key={option}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => setSelectedCCT(option)}
                          className={`h-10 rounded-md border px-4 text-sm font-medium transition-colors duration-150 ${
                            isSelected
                              ? 'border-interactive-default bg-interactive-default text-interactive-inverse'
                              : 'border-border-strong text-text-primary hover:border-interactive-default'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton to="/contact" variant="primary" className="!h-10 !px-5 !text-sm">
              Request Product Information
            </LinkButton>
            {documents.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {documents.map((doc) => (
                  <a
                    key={doc.url}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border-strong px-3 text-xs font-medium text-text-secondary transition-colors duration-150 hover:border-interactive-default hover:text-text-primary"
                  >
                    <Download size={13} strokeWidth={1.5} />
                    {doc.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {tabs.length > 0 && (
        <div className="mt-16 md:mt-20">
          <Tabs items={tabs} />
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-20 border-t border-border-default pt-13 md:mt-24 md:pt-16">
          <SectionHeader eyebrow={category?.name} title="Related Products" />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
