import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { ContactForm } from '@/components/ContactForm'
import { SectionHeader } from '@/components/SectionHeader'
import { SmartImage } from '@/components/SmartImage'
import { company } from '@/data/company'
import type { ContactPerson } from '@/data/company'

function PersonRow({ person }: { person: ContactPerson }) {
  return (
    <li className="border-t border-border-default py-5">
      <span className="eyebrow">{person.role}</span>
      <p className="mt-1.5 text-md font-medium text-text-primary">{person.name}</p>
      <p className="text-sm text-text-secondary">{person.title}</p>
      <div className="mt-2 flex flex-col gap-1">
        {person.phone && (
          <a
            href={`tel:${person.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary"
          >
            <Phone size={14} strokeWidth={1.5} />
            {person.phone}
          </a>
        )}
        <a
          href={`mailto:${person.email}`}
          className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary"
        >
          <Mail size={14} strokeWidth={1.5} />
          {person.email}
        </a>
      </div>
    </li>
  )
}

export function Contact() {
  const { headquarters, specialists, regions } = company.contact
  const [activeRegion, setActiveRegion] = useState(regions[0]?.key)
  const region = regions.find((r) => r.key === activeRegion) ?? regions[0]

  return (
    <div>
      <SmartImage
        src={company.whyLeksaImage}
        alt="Contact Leksa Lighting"
        variant="dark"
        ratio="aspect-[16/7]"
        className="w-full"
      />

      <div className="content-width page-padding py-13 md:py-16">
        <div className="grid grid-cols-1 gap-13 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h1 className="max-w-md text-3xl font-light leading-tight text-text-primary md:text-4xl">
              Let's create better spaces.
            </h1>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-text-secondary">
              Tell us about your project and a member of our team will follow up with product recommendations and
              next steps.
            </p>

            <div className="mt-13 space-y-6 border-t border-border-default pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">Call Us</p>
                <p className="mt-1 text-sm text-text-primary">{company.contact.phone}</p>
              </div>
              {headquarters && (
                <>
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">Headquarters</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-primary">{headquarters.companyName}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{headquarters.address}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">Email</p>
                    <a href={`mailto:${headquarters.email}`} className="mt-1 block text-sm text-text-primary hover:text-interactive-hover">
                      {headquarters.email}
                    </a>
                  </div>
                </>
              )}
              {company.contact.branches.map((b) => (
                <div key={b.city}>
                  <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">{b.city}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-primary">{b.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      {specialists && specialists.length > 0 && (
        <div className="content-width page-padding border-t border-border-default py-13 md:py-16">
          <SectionHeader
            eyebrow="Contacts"
            title="Department specialists."
            description="Meet the specialists dedicated to providing expert guidance, technical expertise, and personalized support for every lighting requirement."
          />
          <ul className="mt-8 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {specialists.map((person) => (
              <PersonRow key={person.email} person={person} />
            ))}
          </ul>
        </div>
      )}

      {regions && regions.length > 0 && region && (
        <div className="content-width page-padding border-t border-border-default py-13 md:py-16">
          <SectionHeader
            eyebrow="Our Network"
            title="Connect with our regional team."
            description="Find the right Leksa Lighting team across India. Select a region to view offices, sales leaders and regional contacts."
          />

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-border-default" role="tablist" aria-label="Region">
            {regions.map((r) => (
              <button
                key={r.key}
                type="button"
                role="tab"
                aria-selected={r.key === region.key}
                onClick={() => setActiveRegion(r.key)}
                className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors duration-150 max-lg:min-h-11 max-lg:px-1 ${
                  r.key === region.key
                    ? 'border-interactive-default text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <span className="eyebrow">{region.teamName}</span>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-text-tertiary">{region.office.note}</p>
              <p className="mt-1 text-md font-medium text-text-primary">{region.office.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">{region.office.companyName}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">{region.office.address}</p>
            </div>

            <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {region.contacts.map((person) => (
                <PersonRow key={person.email} person={person} />
              ))}
            </ul>
          </div>
        </div>
      )}

      {headquarters?.mapEmbedUrl && (
        <div className="border-t border-border-default">
          <iframe
            title="Leksa Lighting Headquarters location"
            src={headquarters.mapEmbedUrl}
            className="h-[360px] w-full md:h-[420px]"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  )
}
