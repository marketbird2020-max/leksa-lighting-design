import { Link } from 'react-router-dom'
import type { Product } from '@/data/types'
import { SmartImage } from './SmartImage'
import { Button } from './Button'

export function ProductCard({ product }: { product: Product }) {
  const chips = [product.subcategory, product.model].filter(Boolean) as string[]
  const variantNote =
    product.variants && product.variantAttributes && product.variantAttributes.length > 0
      ? `${product.variants.length} ${product.variantAttributes[0].label.toLowerCase()} options`
      : null

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-surface-subtle">
        <SmartImage
          src={product.image}
          alt={product.name}
          ratio="aspect-square"
          className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-md font-medium tracking-wide text-text-primary">{product.name}</h3>
        {product.description && (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-text-secondary">{product.description}</p>
        )}
        {(chips.length > 0 || variantNote) && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {chips.map((m) => (
              <li key={m} className="text-xs text-text-tertiary">
                {m}
              </li>
            ))}
            {variantNote && (
              <li className="text-xs font-medium text-text-secondary">{variantNote}</li>
            )}
          </ul>
        )}
        <span className="mt-4 inline-block text-sm font-medium text-text-primary underline decoration-border-strong decoration-1 underline-offset-4 group-hover:decoration-text-primary">
          View Product →
        </span>
      </div>
    </Link>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-7 sm:gap-y-14 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  )
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-7 sm:gap-y-14 md:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square rounded-lg bg-surface-muted" />
          <div className="mt-5 h-4 w-3/4 bg-surface-muted" />
          <div className="mt-2 h-3 w-full bg-surface-muted" />
          <div className="mt-3 h-3 w-1/2 bg-surface-muted" />
        </div>
      ))}
    </div>
  )
}

export function EmptyProductState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 border border-border-default py-24 text-center">
      <p className="text-lg text-text-primary">No products found.</p>
      <p className="max-w-sm text-sm text-text-secondary">
        Try adjusting or clearing the current filters to see more products in this category.
      </p>
      <Button variant="secondary" onClick={onClear} className="mt-2">
        Clear Filters
      </Button>
    </div>
  )
}

export function ProductLoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 border border-border-default py-24 text-center">
      <p className="text-lg text-text-primary">Products could not be loaded.</p>
      <p className="max-w-sm text-sm text-text-secondary">
        Something went wrong while retrieving this category. Please try again.
      </p>
      <Button variant="secondary" onClick={onRetry} className="mt-2">
        Try Again
      </Button>
    </div>
  )
}
