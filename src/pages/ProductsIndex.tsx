import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { CategoryGrid } from '@/components/CategoryGrid'
import { categories } from '@/data/categories'

export function ProductsIndex() {
  return (
    <div>
      <SmartImage src={categories[0].image} alt="Leksa Lighting Products" variant="dark" ratio="aspect-[16/7]" className="w-full" />
      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader
          eyebrow="Products"
          title="Complete lighting solutions."
          description="Explore the full Leksa Lighting range, engineered across stage, architectural, studio, landscape, stadium and broadcast applications."
        />
        <div className="mt-12">
          <CategoryGrid categories={categories} />
        </div>
      </div>
    </div>
  )
}
