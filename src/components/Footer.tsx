import { Link } from 'react-router-dom'
import { NewsletterSignup } from './NewsletterSignup'
import { company } from '@/data/company'

const columns = [
  {
    title: 'Company',
    links: [
      { name: 'Why Leksa', href: '/why-leksa' },
      { name: 'Company Profile', href: '/company-profile' },
      { name: 'Our Team', href: '/our-team' },
      { name: "Director's Message", href: '/director-message' },
      { name: 'LEXRISE', href: '/lexrise' },
    ],
  },
  {
    title: 'Products',
    links: [
      { name: 'Architectural Lighting', href: '/products/architectural-lighting' },
      { name: 'Stage Lights', href: '/products/stage-lights' },
      { name: 'Studio Lighting', href: '/products/studio-lighting' },
      { name: 'Landscape Lighting', href: '/products/landscape-lighting' },
      { name: 'All Products', href: '/products' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'Our Expertise', href: '/expertise' },
      { name: 'Projects', href: '/projects' },
      { name: 'Resources', href: '/resources' },
      { name: 'News & Events', href: '/news' },
      { name: 'Contact', href: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-surface-footer">
      <div className="content-width page-padding grid grid-cols-1 gap-10 py-13 md:grid-cols-2 md:py-16">
        <div>
          <Link to="/" className="font-sans text-lg font-semibold tracking-tight text-white">
            LEKSA
          </Link>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/70">
            Leksa Lighting Technologies Pvt. Ltd. — turn-key lighting solutions for stage, architectural, studio,
            landscape, stadium and broadcast applications.
          </p>
        </div>
        <div className="md:justify-self-end">
          <p className="text-md font-medium text-white">Newsletter</p>
          <p className="mt-2 max-w-sm text-lg leading-relaxed text-white/70">
            Enter your email to receive news, project updates and product information from Leksa.
          </p>
          <div className="mt-4">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-width page-padding grid grid-cols-2 gap-10 py-13 md:grid-cols-4 md:py-16">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-md font-medium text-white">{col.title}</p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-md text-white/70 hover:text-white">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-md font-medium text-white">Call Us</p>
            <p className="mt-4 text-lg text-white/70">{company.contact.phone}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-width page-padding py-6">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Leksa Lighting Technologies Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
