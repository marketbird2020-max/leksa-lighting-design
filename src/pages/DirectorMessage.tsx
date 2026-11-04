import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { company } from '@/data/company'

export function DirectorMessage() {
  return (
    <div>
      <SmartImage src={company.directorImage} alt="Director's Message" variant="dark" ratio="aspect-[16/7]" className="w-full" />

      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader eyebrow="Director's Message" title="A message from our Executive Director." />

        <div className="mt-10 max-w-3xl space-y-5">
          {company.directorMessageParagraphs.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-text-secondary">
              {para}
            </p>
          ))}

          <p className="pt-4 text-md font-medium text-text-primary">
            {company.directorName}
            <br />
            <span className="font-normal text-text-secondary">
              {company.directorTitle}
              <br />
              {company.directorCompany}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
