import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, ChevronRight, ChevronDown } from 'lucide-react'
import { categories } from '@/data/categories'
import { productMainCategories } from '@/data/productMainCategories'

interface MobileMenuProps {
  onClose: () => void
}

const primaryLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Expertise', href: '/expertise' },
  { name: 'Projects', href: '/projects' },
  { name: 'Why Leksa', href: '/why-leksa' },
  { name: 'LEXRISE', href: '/lexrise' },
  { name: 'Career', href: '/career' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

export function MobileMenu({ onClose }: MobileMenuProps) {
  const [productsOpen, setProductsOpen] = useState(false)
  const [expandedMain, setExpandedMain] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col bg-surface-page"
      style={{ animation: 'fadeIn var(--motion-fast) var(--motion-ease)' }}
    >
      <div className="flex h-[var(--header-height)] items-center justify-between border-b border-border-default page-padding">
        <Link to="/" onClick={onClose} className="font-sans text-lg font-semibold tracking-tight text-text-primary">
          LEKSA
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-11 w-11 items-center justify-center text-text-primary"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto page-padding py-8">
        <div className="border-b border-border-default">
          <button
            type="button"
            onClick={() => setProductsOpen((v) => !v)}
            aria-expanded={productsOpen}
            className="flex w-full items-center justify-between py-5 text-left text-2xl font-light text-text-primary transition-colors duration-150 hover:text-nav-hover"
          >
            Products
            <ChevronDown
              size={20}
              strokeWidth={1.5}
              className="transition-transform duration-250"
              style={{ transform: productsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          {productsOpen && (
            <ul className="pb-6" style={{ animation: 'slideUp var(--motion-fast) var(--motion-ease)' }}>
              {productMainCategories.map((main) => {
                const isExpanded = expandedMain === main.slug
                return (
                  <li key={main.slug} className="border-t border-border-default first:border-t-0">
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/products/${main.slug}`}
                        onClick={onClose}
                        className="flex-1 py-3 text-md font-medium text-text-primary transition-colors duration-150 hover:text-nav-hover"
                      >
                        {main.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedMain(isExpanded ? null : main.slug)}
                        aria-expanded={isExpanded}
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${main.name}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center text-text-secondary"
                      >
                        <ChevronDown
                          size={16}
                          strokeWidth={1.5}
                          className="transition-transform duration-250"
                          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>
                    </div>
                    {isExpanded && (
                      <ul className="pb-3 pl-4" style={{ animation: 'slideUp var(--motion-fast) var(--motion-ease)' }}>
                        {main.subcategorySlugs.map((slug) => {
                          const cat = categories.find((c) => c.slug === slug)
                          if (!cat) return null
                          return (
                            <li key={slug}>
                              <Link
                                to={`/products/${main.slug}/${cat.slug}`}
                                onClick={onClose}
                                className="flex items-center justify-between py-2.5 text-sm text-text-secondary transition-colors duration-150 hover:text-nav-hover"
                              >
                                {cat.name}
                                <ChevronRight size={14} strokeWidth={1.5} />
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <ul className="mt-2">
          {primaryLinks.map((link) => (
            <li key={link.href} className="border-b border-border-default">
              <Link
                to={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-5 text-2xl font-light text-text-primary transition-colors duration-150 hover:text-nav-hover"
              >
                {link.name}
                <ChevronRight size={20} strokeWidth={1.5} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
