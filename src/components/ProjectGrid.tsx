import { Link } from 'react-router-dom'
import type { ProjectItem } from '@/data/types'
import { SmartImage } from './SmartImage'
import { projectTagLabel } from '@/data/content'

export function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <SmartImage
        src={project.image}
        alt={project.name}
        ratio="aspect-[16/10]"
        variant="dark"
        className="transition-transform duration-700 ease-[var(--motion-ease)] group-hover:scale-[1.02]"
      />
      <div className="mt-3 flex items-start justify-between gap-4 sm:mt-5">
        <div>
          {project.tags.length > 0 && <span className="eyebrow">{project.tags.map(projectTagLabel).join(' · ')}</span>}
          <h3 className="mt-1.5 text-base font-normal max-sm:leading-snug text-text-primary sm:text-xl">{project.name}</h3>
        </div>
      </div>
      <span className="mt-3 inline-block text-sm font-medium text-text-primary">View Project →</span>
    </Link>
  )
}

export function ProjectGrid({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-8 sm:gap-y-14">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  )
}
