import { Link } from 'react-router-dom'
import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { company } from '@/data/company'

export function WhyLeksa() {
  return (
    <div>
      <SmartImage src={company.whyLeksaImage} alt="Why Leksa" variant="dark" ratio="aspect-[16/7]" className="w-full" />

      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader
          eyebrow="Why Leksa"
          title="Lighting excellence, engineered in India."
          description={company.profileParagraphs[0]}
        />

        <div className="mt-13 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {company.whyLeksaHub.map((item) => (
            <Link key={item.href} to={item.href} className="group block">
              <SmartImage
                src={item.image}
                alt={item.title}
                ratio="aspect-[4/3]"
                className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.02]"
              />
              <p className="mt-4 text-lg font-normal text-text-primary">{item.title}</p>
              <span className="mt-1 inline-block text-sm font-medium text-text-secondary group-hover:text-text-primary">
                Know More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
