import { SectionHeader } from '@/components/SectionHeader'
import { SmartImage } from '@/components/SmartImage'
import { news } from '@/data/content'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function News() {
  return (
    <div className="content-width page-padding py-13 md:py-16">
      <SectionHeader eyebrow="News & Events" title="From the Leksa Lighting team." />

      <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
        {news.map((item) => (
          <div key={item.slug}>
            <SmartImage src={item.image} alt={item.title} ratio="aspect-[4/3]" />
            <p className="mt-4 text-xs text-text-tertiary">{formatDate(item.date)}</p>
            <h3 className="mt-1 text-base font-normal max-sm:leading-snug text-text-primary sm:text-lg">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
