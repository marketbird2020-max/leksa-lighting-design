import { Mail, MapPin, Phone } from 'lucide-react'
import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { CareerApplicationForm } from '@/components/CareerApplicationForm'
import { company } from '@/data/company'

export function Career() {
  const { headquarters, phone } = company.contact
  const highlightStats = company.stats.filter((s) =>
    ['225+', '15+', '80,000 sqft'].includes(s.value),
  )

  return (
    <div>
      <SmartImage
        src={company.whyLeksaImage}
        alt="Careers at Leksa Lighting"
        variant="dark"
        ratio="aspect-[16/7]"
        className="w-full"
      />

      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader
          eyebrow="Careers"
          title="Build your career in lighting."
          description="Our teams design, engineer and manufacture lighting for architecture, stage, studio, landscape and broadcast — we're always glad to hear from people who want to build something at scale."
        />

        {highlightStats.length > 0 && (
          <div className="mt-13 grid grid-cols-1 gap-8 border-t border-border-default pt-8 sm:grid-cols-3">
            {highlightStats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-light text-text-primary md:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-13 max-w-2xl border-t border-border-default pt-8">
          <h3 className="text-xl font-normal text-text-primary">Where you could work</h3>
          <p className="mt-3 text-md leading-relaxed text-text-secondary">
            Our manufacturing and R&amp;D campus in Mangaluru houses specialist facilities alongside branch offices
            across India, including:
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {company.facilities.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-text-primary">
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-text-tertiary" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="content-width page-padding border-t border-border-default py-13 md:py-16">
        <SectionHeader
          eyebrow="Apply"
          title="Send us your application."
          description="Tell us a bit about yourself and attach your resume — our HR team reviews every application personally."
        />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="space-y-6">
            {headquarters?.email && (
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">Email</p>
                <a
                  href={`mailto:${headquarters.email}`}
                  className="mt-1 flex items-center gap-2 text-sm text-text-primary hover:text-interactive-hover"
                >
                  <Mail size={16} strokeWidth={1.5} />
                  {headquarters.email}
                </a>
              </div>
            )}
            {phone && (
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">Call Us</p>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="mt-1 flex items-center gap-2 text-sm text-text-primary hover:text-interactive-hover"
                >
                  <Phone size={16} strokeWidth={1.5} />
                  {phone}
                </a>
              </div>
            )}
            {headquarters?.address && (
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">Headquarters</p>
                <p className="mt-1 flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                  {headquarters.address}
                </p>
              </div>
            )}
          </div>

          <CareerApplicationForm />
        </div>
      </div>
    </div>
  )
}
