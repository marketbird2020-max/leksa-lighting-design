import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Home } from '@/pages/Home'
import { ProductsIndex } from '@/pages/ProductsIndex'
import { ProductsSlugRoute } from '@/pages/ProductsSlugRoute'
import { ProductListing } from '@/pages/ProductListing'
import { ProductDetail } from '@/pages/ProductDetail'
import { Solutions } from '@/pages/Solutions'
import { SolutionDetail } from '@/pages/SolutionDetail'
import { Projects } from '@/pages/Projects'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { WhyLeksa } from '@/pages/WhyLeksa'
import { CompanyProfile } from '@/pages/CompanyProfile'
import { OurTeam } from '@/pages/OurTeam'
import { DirectorMessage } from '@/pages/DirectorMessage'
import { Lexrise } from '@/pages/Lexrise'
import { Career } from '@/pages/Career'
import { News } from '@/pages/News'
import { Resources } from '@/pages/Resources'
import { Contact } from '@/pages/Contact'
import { NotFound } from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-page">
      <ScrollToTop />
      <a
        href="#main"
        className="fixed left-4 top-4 z-50 -translate-y-20 bg-surface-inverse px-4 py-2 text-sm text-text-inverse transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsIndex />} />
          <Route path="/products/:categorySlug" element={<ProductsSlugRoute />} />
          <Route path="/products/:mainSlug/:subSlug" element={<ProductListing />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/expertise" element={<Solutions />} />
          <Route path="/expertise/:slug" element={<SolutionDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/why-leksa" element={<WhyLeksa />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/director-message" element={<DirectorMessage />} />
          <Route path="/lexrise" element={<Lexrise />} />
          <Route path="/career" element={<Career />} />
          <Route path="/news" element={<News />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
