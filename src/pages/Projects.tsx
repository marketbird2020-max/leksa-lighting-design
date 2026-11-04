import { useState } from 'react'
import { SmartImage } from '@/components/SmartImage'
import { SectionHeader } from '@/components/SectionHeader'
import { ProjectGrid } from '@/components/ProjectGrid'
import { projects, projectCategories, projectTagLabel } from '@/data/content'

export function Projects() {
  const [active, setActive] = useState<string>('All')
  const filtered = active === 'All' ? projects : projects.filter((p) => p.tags.map(projectTagLabel).includes(active))

  return (
    <div>
      <SmartImage src={projects[0]?.image} alt="Projects" variant="dark" ratio="aspect-[16/7]" className="w-full" />
      <div className="content-width page-padding py-13 md:py-16">
        <SectionHeader eyebrow="Projects" title="Case studies across every application." />

        <div className="mt-10 flex flex-wrap gap-2 border-b border-border-default pb-8" role="tablist" aria-label="Filter projects by category">
          {['All', ...projectCategories].map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`h-8 rounded-lg border px-4 text-sm font-medium max-lg:h-10 transition-colors duration-150 ${
                active === c
                  ? 'border-interactive-default bg-interactive-default text-interactive-inverse'
                  : 'border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {filtered.length > 0 ? (
            <ProjectGrid projects={filtered} />
          ) : (
            <div className="flex flex-col items-center gap-2 py-20 text-center">
              <p className="text-lg text-text-primary">No projects found for this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
