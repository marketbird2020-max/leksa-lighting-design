import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { company } from '@/data/company'

export function OurTeam() {
  return (
    <div>
      <SmartImage src={company.ourTeamImages[0]} alt="The Leksa Lighting team" variant="dark" ratio="aspect-[16/7]" className="w-full" />

      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader eyebrow="Our Team" title="Respect for people and team work." />

        <div className="mt-10 max-w-3xl space-y-5">
          {company.ourTeamParagraphs.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-text-secondary">
              {para}
            </p>
          ))}
        </div>

        {company.ourTeamImages.length > 1 && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {company.ourTeamImages.slice(1).map((img) => (
              <SmartImage key={img} src={img} alt="Leksa Lighting team" ratio="aspect-[4/3]" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
