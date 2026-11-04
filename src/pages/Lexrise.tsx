import { SectionHeader } from '@/components/SectionHeader'
import { company } from '@/data/company'

export function Lexrise() {
  const { lexrise } = company

  return (
    <div className="content-width page-padding py-13 md:py-16">
      <SectionHeader eyebrow="Brand" title="LEXRISE" description={lexrise.intro} />
      <p className="mt-2 text-xs text-text-tertiary">{lexrise.source}</p>

      <div className="mt-12 border-t border-border-default pt-8">
        <span className="eyebrow">Brand Lexrise Includes</span>
        <ul className="mt-4 flex flex-wrap gap-3">
          {lexrise.brands.map((b) => (
            <li key={b} className="border border-border-default px-4 py-2 text-sm text-text-secondary">
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
