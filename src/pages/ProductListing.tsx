import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { getCategory } from '@/data/categories'
import { getMainCategoryForSubcategory } from '@/data/productMainCategories'
import { getProductsByCategory } from '@/data/products'
import { ProductGrid, ProductGridSkeleton, EmptyProductState } from '@/components/ProductGrid'
import { FilterPanel, FilterDrawer, type FilterState } from '@/components/ProductFilter'
import { SmartImage } from '@/components/SmartImage'
import { NotFound } from '@/pages/NotFound'

const sortOptions = ['Featured', 'Name: A–Z', 'Name: Z–A'] as const

export function ProductListing() {
  // Supports both the original flat URL (/products/:categorySlug) and the
  // newer nested one reached from a main-category landing page
  // (/products/:mainSlug/:subSlug) — whichever param is present is used,
  // so every existing link and bookmark keeps resolving to this same page.
  const { categorySlug, subSlug } = useParams<{ categorySlug?: string; subSlug?: string }>()
  const slug = subSlug ?? categorySlug
  const category = slug ? getCategory(slug) : undefined
  const mainCategory = category ? getMainCategoryForSubcategory(category.slug) : undefined

  const allProducts = useMemo(
    () => (category ? getProductsByCategory(category.slug, category.sourceCategory) : []),
    [category],
  )

  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<FilterState>({})
  const [sort, setSort] = useState<(typeof sortOptions)[number]>('Featured')
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    setSelected({})
    const timer = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [slug])

  if (!category) {
    return <NotFound />
  }

  const filterGroups =
    category.subcategories.length > 0
      ? [{ key: 'subcategory', label: 'Type', options: category.subcategories }]
      : []

  function toggleFilter(groupKey: string, value: string) {
    setSelected((prev) => {
      const current = prev[groupKey] ?? []
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
      return { ...prev, [groupKey]: next }
    })
  }

  function clearFilters() {
    setSelected({})
  }

  let filtered = allProducts.filter((p) => {
    const subValues = selected.subcategory ?? []
    return subValues.length === 0 || (p.subcategory && subValues.includes(p.subcategory))
  })

  if (sort === 'Name: A–Z') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'Name: Z–A') filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name))

  const activeFilterCount = Object.values(selected).reduce((sum, v) => sum + v.length, 0)

  return (
    <div>
      <SmartImage
        src={category.image}
        alt={category.name}
        variant="dark"
        ratio="aspect-[16/6]"
        className="w-full"
      />

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
          <span>/</span>
          <span className="text-text-secondary">{category.name}</span>
        </nav>

        <div className="mt-6 max-w-2xl">
          <h1 className="text-3xl font-light text-text-primary md:text-4xl">{category.name}</h1>
          {category.description && <p className="mt-3 text-lg leading-relaxed text-text-secondary">{category.description}</p>}
        </div>

        <div className="mt-8 flex items-center justify-between border-y border-border-default py-3">
          <p className="text-sm text-text-secondary">
            {loading ? 'Loading…' : `${filtered.length} ${filtered.length === 1 ? 'Product' : 'Products'}`}
          </p>
          <div className="flex items-center gap-4">
            {filterGroups.length > 0 && (
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex min-h-11 items-center gap-1.5 px-1 text-sm font-medium text-text-primary lg:hidden"
              >
                <SlidersHorizontal size={14} strokeWidth={1.5} />
                Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
            )}
            {allProducts.length > 1 && (
              <label className="hidden items-center gap-2 text-sm text-text-secondary md:flex">
                Sort
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="border-b border-border-strong bg-transparent py-0.5 text-sm text-text-primary focus-visible:outline-none max-lg:py-2"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>

        <div className={`mt-10 grid grid-cols-1 gap-10 ${filterGroups.length > 0 ? 'lg:grid-cols-[200px_1fr]' : ''}`}>
          {filterGroups.length > 0 && (
            <aside className="hidden lg:block">
              <FilterPanel groups={filterGroups} selected={selected} onToggle={toggleFilter} onClear={clearFilters} />
            </aside>
          )}

          <div>
            {loading && <ProductGridSkeleton />}
            {!loading && filtered.length === 0 && <EmptyProductState onClear={clearFilters} />}
            {!loading && filtered.length > 0 && <ProductGrid products={filtered} />}
          </div>
        </div>

        {filterGroups.length > 0 && (
          <FilterDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            groups={filterGroups}
            selected={selected}
            onToggle={toggleFilter}
            onClear={clearFilters}
            resultCount={filtered.length}
          />
        )}
      </div>
    </div>
  )
}
