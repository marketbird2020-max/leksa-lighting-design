import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { company } from '@/data/company'

export function CompanyProfile() {
  return (
    <div>
      <SmartImage src={company.whyLeksaImage} alt="Leksa Lighting Company Profile" variant="dark" ratio="aspect-[16/7]" className="w-full" />

      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader eyebrow="Company Profile" title="Leksa Lighting Technologies Pvt. Ltd." />

        <div className="mt-10 max-w-3xl space-y-5">
          {company.profileParagraphs.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-text-secondary">
              {para}
            </p>
          ))}
        </div>

        {company.profileImages.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {company.profileImages.map((img) => (
              <SmartImage key={img} src={img} alt="Leksa Lighting facility" ratio="aspect-[4/3]" />
            ))}
          </div>
        )}
      </div>

      <div className="border-y border-border-default bg-surface-subtle">
        <div className="content-width page-padding py-13 md:py-16">
          <SectionHeader eyebrow="By the Numbers" title="Leksa Lighting at a glance." />
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {company.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-light text-text-primary md:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-xs leading-relaxed text-text-tertiary">{company.foundingYearNote}</p>
        </div>
      </div>

      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader eyebrow="In-House Facilities" title="Built to control every stage of production." />
        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {company.facilities.map((f) => (
            <li key={f} className="border-t border-border-default pt-4 text-md text-text-primary">
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
