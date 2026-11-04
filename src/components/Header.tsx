import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'
import { buttonBaseClasses } from './Button'

const navLinks = [
  { name: 'Our Expertise', href: '/expertise' },
  { name: 'Projects', href: '/projects' },
  { name: 'Why Leksa', href: '/why-leksa' },
  { name: 'Career', href: '/career' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

// How far (in px) the user has to scroll on the homepage for the header to go
// from fully transparent to fully solid. The fade is driven directly by
// scroll position (not a fixed-duration animation), so it tracks the
// scroll 1:1 and never feels like a sudden snap.
const FADE_DISTANCE = 160

type RGB = [number, number, number]
const WHITE: RGB = [255, 255, 255]
const TEXT_PRIMARY: RGB = [17, 17, 17]
const TEXT_SECONDARY: RGB = [102, 102, 102]
const BORDER_DEFAULT: RGB = [231, 231, 231]

function mix([r1, g1, b1]: RGB, [r2, g2, b2]: RGB, t: number) {
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

function mixAlpha([r, g, b]: RGB, t: number) {
  return `rgba(${r}, ${g}, ${b}, ${t})`
}

export function Header() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const productsCloseTimer = useRef<number | null>(null)

  function clearProductsCloseTimer() {
    if (productsCloseTimer.current != null) {
      window.clearTimeout(productsCloseTimer.current)
      productsCloseTimer.current = null
    }
  }

  // Opens immediately on hover, and cancels any pending close so moving the
  // pointer back in (e.g. while crossing from the "Products" link down into
  // the panel) keeps the menu open instead of flickering shut.
  function openProductsMenu() {
    clearProductsCloseTimer()
    setProductsOpen(true)
  }

  // Closes after a short grace period rather than instantly, so briefly
  // crossing the gap between the nav link and the dropdown panel below it
  // doesn't close the menu.
  function scheduleCloseProductsMenu() {
    clearProductsCloseTimer()
    productsCloseTimer.current = window.setTimeout(() => {
      setProductsOpen(false)
    }, 200)
  }

  useEffect(() => () => clearProductsCloseTimer(), [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Scroll position is sampled on every frame (via requestAnimationFrame) so
  // the header's colors interpolate continuously with the scroll itself,
  // rather than jumping once a threshold is crossed.
  useEffect(() => {
    let ticking = false
    function handleScroll() {
      if (!isHome) return
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // 0 = fully transparent (top of the homepage), 1 = fully solid white.
  // Opening the products dropdown or search always forces a solid header
  // immediately, since both need reliable contrast the moment they appear.
  const progress = !isHome || productsOpen || searchOpen ? 1 : Math.min(scrollY / FADE_DISTANCE, 1)
  const solidHover = progress > 0.5

  return (
    <header
      className="sticky top-0 z-40 border-b transition-colors duration-200"
      style={{
        backgroundColor: mixAlpha(WHITE, progress),
        borderColor: mixAlpha(BORDER_DEFAULT, progress),
      }}
    >
      <div className="content-width page-padding relative flex h-[var(--header-height)] items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="https://papayawhip-mule-596854.hostingersite.com/wp-content/uploads/2026/05/logo1.png"
            alt="LEKSA"
            className="h-7 w-auto object-contain transition-[filter] duration-200 md:h-8 lg:h-9"
            style={{ filter: `brightness(${progress * 100}%) invert(${(1 - progress) * 100}%)` }}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({ color: mix(WHITE, isActive ? TEXT_PRIMARY : TEXT_SECONDARY, progress) })}
            className="text-md font-medium transition-colors duration-200 hover:!text-nav-hover"
          >
            Home
          </NavLink>
          <button
            type="button"
            onClick={() => setProductsOpen((v) => !v)}
            onMouseEnter={openProductsMenu}
            onMouseLeave={scheduleCloseProductsMenu}
            aria-expanded={productsOpen}
            aria-haspopup="true"
            style={{ color: mix(WHITE, TEXT_PRIMARY, progress) }}
            className="text-md font-medium transition-colors duration-200 hover:!text-nav-hover"
          >
            Products
          </button>
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              style={({ isActive }) => ({ color: mix(WHITE, isActive ? TEXT_PRIMARY : TEXT_SECONDARY, progress) })}
              className="text-md font-medium transition-colors duration-200 hover:!text-nav-hover"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center md:flex">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  type="search"
                  placeholder="Search products"
                  aria-label="Search products"
                  className="h-10 w-56 border-b border-border-strong bg-transparent text-md text-text-primary placeholder:text-text-tertiary focus-visible:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="flex h-10 w-10 items-center justify-center text-text-secondary transition-colors duration-150 hover:text-text-primary"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                style={{ color: mix(WHITE, TEXT_PRIMARY, progress) }}
                className="flex h-10 w-10 items-center justify-center transition-colors duration-200 hover:opacity-70"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>

          <Link
            to="/contact"
            style={{
              borderColor: mix(WHITE, TEXT_PRIMARY, progress),
              color: mix(WHITE, TEXT_PRIMARY, progress),
            }}
            className={`hidden md:flex text-md border ${buttonBaseClasses} ${
              solidHover ? 'hover:!bg-interactive-default hover:!text-interactive-inverse' : 'hover:!bg-white hover:!text-text-primary'
            }`}
          >
            Enquire
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            style={{ color: mix(WHITE, TEXT_PRIMARY, progress) }}
            className="flex h-10 w-10 items-center justify-center transition-colors duration-200 lg:hidden"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>

        {productsOpen && (
          <MegaMenu onClose={() => setProductsOpen(false)} onMouseEnter={openProductsMenu} onMouseLeave={scheduleCloseProductsMenu} />
        )}
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  )
}
