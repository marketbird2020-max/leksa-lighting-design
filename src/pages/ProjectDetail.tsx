import { Link, useParams } from 'react-router-dom'
import { getProject, projects, projectTagLabel } from '@/data/content'
import { SmartImage } from '@/components/SmartImage'
import { LinkButton } from '@/components/Button'
import { ProjectGrid } from '@/components/ProjectGrid'
import { NotFound } from '@/pages/NotFound'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) return <NotFound />

  const related = projects
    .filter((p) => p.slug !== project.slug && p.tags.some((t) => project.tags.includes(t)))
    .slice(0, 2)

  return (
    <div>
      <SmartImage src={project.image} alt={project.name} variant="dark" ratio="aspect-[16/8]" className="w-full" />

      <div className="content-width page-padding py-13 md:py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-tertiary">
          <Link to="/projects" className="hover:text-text-secondary">
            Projects
          </Link>
          <span>/</span>
          <span className="text-text-secondary">{project.name}</span>
        </nav>

        <div className="mt-5">
          {project.tags.length > 0 && <span className="eyebrow">{project.tags.map(projectTagLabel).join(' · ')}</span>}
          <h1 className="mt-2 text-3xl font-light text-text-primary md:text-4xl">{project.name}</h1>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border-default pt-13">
            <span className="eyebrow">Related Projects</span>
            <div className="mt-8">
              <ProjectGrid projects={related} />
            </div>
          </div>
        )}

        <LinkButton to="/contact" variant="primary" className="mt-13">
          Discuss a Similar Project
        </LinkButton>
      </div>
    </div>
  )
}
