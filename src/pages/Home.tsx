import { Link } from 'react-router-dom'
import { MapPin, Phone, BadgeCheck, Leaf, Award, ShieldCheck } from 'lucide-react'
import { BlueIconBadge } from '@/components/BlueIconBadge'
import { SmartImage } from '@/components/SmartImage'
import { HeroCarousel, type HeroSlide } from '@/components/HeroCarousel'
import { StatsCounter } from '@/components/StatsCounter'
import { FacilitiesStrip } from '@/components/FacilitiesStrip'
import { CategoryCarousel } from '@/components/CategoryCarousel'
import { LinkButton } from '@/components/Button'
import { SectionHeader } from '@/components/SectionHeader'
import { categories, getCategory } from '@/data/categories'
import { projects, expertise } from '@/data/content'
import { news } from '@/data/content'
import { company } from '@/data/company'

const architectural = getCategory('architectural-lighting')!
const featuredExpertise = expertise[0]

// Supplied replacement imagery for the homepage (optimized/resized from the
// originals).
const PRODUCTS_IMAGE = '/images/home/products-facade.jpg'
const PROJECTS_IMAGE = '/images/home/projects-vidhana.jpg'
const ARCHITECTURAL_IMAGE = '/images/home/architectural-heritage.jpg'
const EXPERIENCE_CENTRE_IMAGE = '/images/home/experience-centre.jpg'
// Reuses the supplied abstract spotlight photo (originally the alternate
// Products option) since it was still unused elsewhere on the homepage and
// fits the "precision" theme of this section.
const QUALITY_IMAGE = '/images/home/products-abstract.jpg'

const qualityFeatures = [
  { label: 'CE Certified', icon: BadgeCheck, shade: 0 },
  { label: 'RoHS Compliant', icon: Leaf, shade: 1 },
  { label: 'ISO 9001 Certified', icon: Award, shade: 2 },
  { label: 'BIS Approved', icon: ShieldCheck, shade: 4 },
]

const heroSlides: HeroSlide[] = [
  {
    videoSrc: 'https://papayawhip-mule-596854.hostingersite.com/wp-content/uploads/2026/07/VIDHANA-SOUDHA.mp4',
    posterSrc: architectural.image,
    title: 'Lighting Excellence.',
    eyebrow: 'LED Lighting Manufacturer',
    description:
      'Professional lighting solutions across Architectural, Stage, Studio, Landscape, Sports and more — delivering turnkey lighting solutions with 800+ projects completed globally.',
    primaryCta: { label: 'Explore Products', to: '/products' },
    secondaryCta: { label: 'View Projects', to: '/projects' },
  },
]

export function Home() {
  return (
    <div>
      {/* Pulled up beneath the transparent sticky header so the hero media
          fills the space behind the nav bar (header height = 84px). */}
      <div style={{ marginTop: 'calc(-1 * var(--header-height))' }}>
        <HeroCarousel slides={heroSlides} />
      </div>

      <StatsCounter />

      {/* Two-panel split: Products / Projects — compact fixed height so both
          cards are visible without an oversized scroll on desktop. */}
      <section className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:gap-5 md:p-5">
        <Link to="/products" className="group relative block overflow-hidden">
          <SmartImage
            src={PRODUCTS_IMAGE}
            alt="Products"
            variant="dark"
            ratio="h-[260px] sm:h-[320px] md:h-[420px]"
            className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 md:p-6">
            <h2 className="text-lg font-light text-white md:text-xl">Products</h2>
            <p className="mt-1 text-sm leading-relaxed text-white/80 md:text-md">500+ lighting products across 15+ verticals</p>
            <span className="mt-2.5 inline-block text-sm font-medium text-white underline decoration-white/50 underline-offset-4 group-hover:decoration-white">
              Explore More →
            </span>
          </div>
        </Link>

        <Link to="/projects" className="group relative block overflow-hidden">
          <SmartImage
            src={PROJECTS_IMAGE}
            alt="Projects"
            variant="dark"
            ratio="h-[260px] sm:h-[320px] md:h-[420px]"
            className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 md:p-6">
            <h2 className="text-lg font-light text-white md:text-xl">Projects</h2>
            <p className="mt-1 text-sm leading-relaxed text-white/80 md:text-md">800+ projects completed globally</p>
            <span className="mt-2.5 inline-block text-sm font-medium text-white underline decoration-white/50 underline-offset-4 group-hover:decoration-white">
              Explore More →
            </span>
          </div>
        </Link>
      </section>

      {/* EXISTING Manufacturing section — location, content and structure
          unchanged; only the icon treatment (FacilitiesStrip) was updated
          to be colourful. */}
      <section className="bg-surface-section">
        <div className="content-width page-padding py-13 md:py-16">
          <SectionHeader eyebrow="Manufacturing" title="Engineered in-house." align="center" />
          <div className="mt-6">
            <FacilitiesStrip facilities={company.facilities} />
          </div>
        </div>
      </section>

      {/* Expertise feature — Architectural & Facade Lighting */}
      <section className="bg-surface-page p-[23px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <SmartImage src={ARCHITECTURAL_IMAGE} alt={featuredExpertise.name} ratio="aspect-[4/3]" />
          <div>
            <span className="eyebrow">Our Expertise</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-text-primary md:text-4xl">{featuredExpertise.name}</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-text-secondary">{featuredExpertise.description}</p>
            <LinkButton to={`/expertise/${featuredExpertise.slug}`} variant="secondary" className="mt-8">
              Know More
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Explore our range - category carousel */}
      <section className="bg-surface-section p-[23px]">
        <SectionHeader eyebrow="Product Range" title="Explore our range." />
        <div className="mt-6">
          <CategoryCarousel categories={categories} viewAllHref="/products" viewAllLabel="View All Products" />
        </div>
      </section>

      {/* NEW section — Quality & Certifications. Same visual language as the
          Manufacturing section above (icon badges, clean spacing, centered
          professional tone) but a distinct image + description layout so it
          doesn't repeat that section verbatim. Sits directly before the
          Experience Centre, as requested. */}
      <section className="bg-surface-page p-[23px]">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <SmartImage
            src={QUALITY_IMAGE}
            alt="Precision-engineered LED lighting reflecting Leksa's certified quality standards"
            ratio="aspect-[4/3]"
          />
          <div>
            <span className="eyebrow">Quality &amp; Certifications</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-text-primary md:text-4xl">Built to Certified Standards.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-text-secondary">
              Every Leksa fixture is tested and certified to international benchmarks for performance, safety and
              reliability — validated through in-house LM-79 and LM-80 testing, and backed by CE, RoHS, BIS and ISO
              certification across our range.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-6">
              {qualityFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <BlueIconBadge icon={f.icon} shade={f.shade} size={44} iconSize={20} />
                  <p className="text-sm font-medium text-text-primary">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showroom banner: Experience Centre */}
      <section className="bg-surface-section p-[23px]">
        <div className="relative">
          <SmartImage src={EXPERIENCE_CENTRE_IMAGE} alt="Leksa Experience Centre" variant="dark" ratio="aspect-[4/5]" className="w-full sm:aspect-[16/10] md:aspect-[16/9]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/65 to-black/55 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-transparent" aria-hidden="true" />
          <div className="content-width page-padding absolute inset-0 flex flex-col justify-center">
            <div className="max-w-md">
              <span className="eyebrow text-white/70 max-md:!text-white">In-House</span>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">Leksa Experience Centre.</h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                See our complete range of lighting solutions in person at our in-house Experience Centre in
                Mangalore.
              </p>
              <LinkButton to="/company-profile" variant="secondary" className="mt-7 border-white text-white hover:bg-white hover:text-text-primary">
                Learn More
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* News & Events strip — appears before Our Branches */}
      <section className="bg-surface-page p-[23px]">
        <SectionHeader eyebrow="Stay Updated" title="News & Events." />
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {news.slice(0, 4).map((item) => (
            <Link key={item.slug} to="/news" className="group block">
              <SmartImage
                src={item.image}
                alt={item.title}
                ratio="aspect-square"
                className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.03]"
              />
              <p className="mt-3 line-clamp-2 text-lg leading-snug text-text-primary">{item.title}</p>
            </Link>
          ))}
        </div>
        <LinkButton to="/news" variant="ghost" withArrow className="group mt-8">
          View All News
        </LinkButton>
      </section>

      {/* Our Branches / Get in Touch — last content section before the footer */}
      <section className="bg-surface-inverse">
        <div className="content-width page-padding grid grid-cols-1 divide-y divide-white/15 py-13 md:grid-cols-2 md:divide-x md:divide-y-0 md:py-16">
          <div className="flex flex-col items-start pb-10 md:pb-0 md:pr-14">
            <MapPin size={32} strokeWidth={1.25} className="text-white" />
            <h3 className="mt-6 text-2xl font-light text-white">Our Branches</h3>
            <p className="mt-2 max-w-xs text-lg leading-relaxed text-white/70">
              {company.contact.branches.map((b) => b.city).join(' · ')}
            </p>
            <LinkButton
              to="/contact"
              variant="secondary"
              withArrow
              className="mt-6 border-white text-white hover:bg-white hover:text-text-primary"
            >
              Find Us
            </LinkButton>
          </div>
          <div className="flex flex-col items-start pt-10 md:pt-0 md:pl-14">
            <Phone size={32} strokeWidth={1.25} className="text-white" />
            <h3 className="mt-6 text-2xl font-light text-white">Get in Touch</h3>
            <p className="mt-2 text-lg leading-relaxed text-white/70">{company.contact.phone}</p>
            <LinkButton
              to="/contact"
              variant="secondary"
              withArrow
              className="mt-6 border-white text-white hover:bg-white hover:text-text-primary"
            >
              Contact Us
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  )
}
