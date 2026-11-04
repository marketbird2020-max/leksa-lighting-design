import { SectionHeader } from '@/components/SectionHeader'
import { ResourceCard } from '@/components/ResourceCard'
import { resources } from '@/data/content'

export function Resources() {
  return (
    <div className="content-width page-padding py-13 md:py-16">
      <SectionHeader
        eyebrow="Resources"
        title="Technical resources."
        description="Photometric IES files for specification and lighting design software."
      />

      <div className="mt-10">
        {resources.map((r) => (
          <ResourceCard key={r.id} resource={r} />
        ))}
      </div>
    </div>
  )
}
