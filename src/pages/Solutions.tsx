import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { SolutionCard } from '@/components/SolutionCard'
import { expertise } from '@/data/content'
import { categories } from '@/data/categories'

export function Solutions() {
  return (
    <div>
      <SmartImage src={categories[0].image} alt="Our Expertise" variant="dark" ratio="aspect-[16/7]" className="w-full" />
      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader eyebrow="Our Expertise" title="Discovery by application." />
        <div className="mt-12 border-t border-border-default">
          {expertise.map((e) => (
            <SolutionCard key={e.slug} item={e} />
          ))}
        </div>
      </div>
    </div>
  )
}
