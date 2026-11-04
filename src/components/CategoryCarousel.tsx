import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SmartImage } from './SmartImage'
import { LinkButton } from './Button'
import type { Category } from '@/data/types'

interface CategoryCarouselProps {
  categories: Category[]
  viewAllHref?: string
  viewAllLabel?: string
}

export function CategoryCarousel({ categories, viewAllHref, viewAllLabel = 'View All' }: CategoryCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scrollBy(amount: number) {
    scrollerRef.current?.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="scrollbar-none flex gap-6 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {categories.map((c) => (
          <Link
            key={c.slug}
            to={`/products/${c.slug}`}
            className="group block w-64 shrink-0"
            style={{ scrollSnapAlign: 'start' }}
          >
            <SmartImage
              src={c.image}
              alt={c.name}
              ratio="aspect-[4/5]"
              className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.03]"
            />
            <p className="mt-4 text-lg leading-snug font-normal text-text-primary">{c.name}</p>
            <p className="mt-1 text-md text-text-tertiary">
              {c.productCount} {c.productCount === 1 ? 'Product' : 'Products'}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        {viewAllHref ? (
          <LinkButton to={viewAllHref} variant="ghost" withArrow className="group">
            {viewAllLabel}
          </LinkButton>
        ) : (
          <span />
        )}
        <div className="hidden gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-280)}
            aria-label="Scroll categories left"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-default text-text-primary hover:border-border-strong"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(280)}
            aria-label="Scroll categories right"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-default text-text-primary hover:border-border-strong"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}