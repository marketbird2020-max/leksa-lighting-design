import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { productMainCategories, type ProductMainCategory } from '@/data/productMainCategories'
import { SmartImage } from './SmartImage'

interface MegaMenuProps {
  onClose: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function MegaMenu({ onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].slug)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [onClose])

  const activeCategoryData = categories.find((c) => c.slug === activeCategory) ?? categories[0]
  const activeMainCategory: ProductMainCategory | undefined = productMainCategories.find((m) =>
    m.subcategorySlugs.includes(activeCategoryData.slug),
  )

  return (
    <div
      ref={containerRef}
      role="menu"
      aria-label="Products menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inset-x-0 top-full border-t border-border-default bg-surface-page shadow-subtle"
      style={{ animation: 'megaMenuIn var(--motion-normal) var(--motion-ease)' }}
    >
      <div className="content-width page-padding grid grid-cols-12 gap-8 py-12">
        <div className="col-span-8 grid grid-cols-4 gap-8">
          {productMainCategories.map((main) => (
            <div key={main.slug}>
              <Link
                to={`/products/${main.slug}`}
                onClick={onClose}
                role="menuitem"
                className="mb-4 block text-md font-medium tracking-wide text-text-primary transition-colors duration-150 hover:text-nav-hover"
              >
                {main.name}
              </Link>
              <ul className="space-y-3">
                {main.subcategorySlugs.map((slug) => {
                  const cat = categories.find((c) => c.slug === slug)
                  if (!cat) return null
                  return (
                    <li key={slug}>
                      <Link
                        to={`/products/${main.slug}/${cat.slug}`}
                        onClick={onClose}
                        role="menuitem"
                        onMouseEnter={() => setActiveCategory(cat.slug)}
                        className="text-md text-text-secondary transition-colors duration-150 hover:text-nav-hover"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="col-span-4">
          <Link
            to={`/products/${activeMainCategory ? `${activeMainCategory.slug}/` : ''}${activeCategoryData.slug}`}
            onClick={onClose}
            className="group block"
          >
            <SmartImage
              src={activeCategoryData.image}
              alt={activeCategoryData.name}
              ratio="aspect-[4/3]"
              className="transition-transform duration-500 ease-[var(--motion-ease)] group-hover:scale-[1.02]"
            />
            <p className="mt-4 text-md font-medium text-text-primary transition-colors duration-150 group-hover:text-nav-hover">
              {activeCategoryData.name}
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
