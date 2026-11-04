import { useParams } from 'react-router-dom'
import { getMainCategory } from '@/data/productMainCategories'
import { ProductCategoryLanding } from '@/pages/ProductCategoryLanding'
import { ProductListing } from '@/pages/ProductListing'

/**
 * `/products/:slug` is shared by two different kinds of page: the four new
 * main-category landing pages (e.g. "architectural-stage") and the
 * existing, still-valid flat subcategory listing pages (e.g.
 * "architectural-lighting"). This resolves which one a given slug means,
 * so every URL that worked before this change keeps working exactly as
 * it did — nothing is renamed or removed.
 */
export function ProductsSlugRoute() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const mainCategory = categorySlug ? getMainCategory(categorySlug) : undefined

  if (mainCategory) return <ProductCategoryLanding />
  return <ProductListing />
}
