import { Link, useParams } from 'react-router-dom'
import { getExpertise } from '@/data/content'
import { getCategory } from '@/data/categories'
import { SmartImage } from '@/components/SmartImage'
import { LinkButton } from '@/components/Button'
import { NotFound } from '@/pages/NotFound'

export function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getExpertise(slug) : undefined

  if (!item) return <NotFound />

  const category = getCategory(item.categorySlug)

  return (
    <div>
      <SmartImage src={category?.image} alt={item.name} variant="dark" ratio="aspect-[16/7]" className="w-full" />
      <div className="content-width page-padding py-13 md:py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/expertise" className="hover:text-text-secondary">
            Our Expertise
          </Link>
          <span>/</span>
          <span className="text-text-secondary">{item.name}</span>
        </nav>

        <h1 className="mt-5 text-3xl font-light text-text-primary md:text-4xl">{item.name}</h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">{item.description}</p>

        {category && (
          <div className="mt-12 border-t border-border-default pt-8">
            <span className="eyebrow">Related Products</span>
            <p className="mt-3 text-sm text-text-secondary">
              {category.productCount} {category.productCount === 1 ? 'product' : 'products'} in {category.name}.
            </p>
            <LinkButton to={`/products/${category.slug}`} variant="secondary" className="mt-6">
              View {category.name}
            </LinkButton>
          </div>
        )}

        <LinkButton to="/contact" variant="primary" className="mt-8">
          Discuss This Application
        </LinkButton>
      </div>
    </div>
  )
}
