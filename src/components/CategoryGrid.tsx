import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SmartImage } from './SmartImage'
import type { Category } from '@/data/types'

export function CategoryCard({ category, to }: { category: Category; to?: string }) {
  return (
    <Link to={to ?? `/products/${category.slug}`} className="group block">
      <div className="overflow-hidden">
        <SmartImage
          src={category.image}
          alt={category.name}
          ratio="aspect-[4/5]"
          className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-normal max-sm:leading-snug text-text-primary sm:text-xl">{category.name}</h3>
          <p className="mt-1.5 text-xs font-medium text-text-primary underline decoration-border-strong decoration-1 underline-offset-4 group-hover:decoration-text-primary">
            View Products
          </p>
        </div>
        <ArrowUpRight
          size={20}
          strokeWidth={1.5}
          className="mt-1 shrink-0 text-text-primary transition-transform duration-250 ease-[var(--motion-ease)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </Link>
  )
}

export function CategoryGrid({ categories, getHref }: { categories: Category[]; getHref?: (category: Category) => string }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
      {categories.map((c) => (
        <CategoryCard key={c.slug} category={c} to={getHref?.(c)} />
      ))}
    </div>
  )
}
