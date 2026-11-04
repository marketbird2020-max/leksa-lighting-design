import { Link, useParams } from 'react-router-dom'
import { getMainCategory, getSubcategoriesFor } from '@/data/productMainCategories'
import { CategoryBanner } from '@/components/CategoryBanner'
import { CategoryGrid } from '@/components/CategoryGrid'
import { NotFound } from '@/pages/NotFound'

export function ProductCategoryLanding() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const mainCategory = categorySlug ? getMainCategory(categorySlug) : undefined

  if (!mainCategory) return <NotFound />

  const subcategories = getSubcategoriesFor(mainCategory)

  return (
    <div>
      <CategoryBanner eyebrow="Products" title={mainCategory.name} description={mainCategory.description} image={mainCategory.image} />

      <div className="content-width page-padding py-13 md:py-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-text-tertiary">
          <Link to="/" className="hover:text-text-secondary">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-text-secondary">
            Products
          </Link>
          <span>/</span>
          <span className="text-text-secondary">{mainCategory.name}</span>
        </nav>

        <div className="mt-10">
          <CategoryGrid categories={subcategories} getHref={(c) => `/products/${mainCategory.slug}/${c.slug}`} />
        </div>
      </div>
    </div>
  )
}
