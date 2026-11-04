import projectsRaw from './leksa/projects.json'
import newsRaw from './leksa/news.json'
import resourcesRaw from './leksa/resources.json'
import expertiseRaw from './leksa/expertise.json'
import type { ProjectItem, NewsItem, Resource, ExpertiseItem } from './types'

export const projects = projectsRaw as ProjectItem[]
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

// Real tag values as found on the source site, normalised only for display
// casing (e.g. "Dj-pub" -> "DJ & Pub") — no categories invented.
const TAG_LABELS: Record<string, string> = {
  'Architectural': 'Architectural',
  'Stage Lighting': 'Stage Lighting',
  'TV Studio': 'TV Studio',
  'Dj-pub': 'DJ & Pub',
  'stadium-lighting': 'Stadium',
  'video-conference': 'Video Conference',
  'landscape-lighting': 'Landscape',
}

export const projectTagLabel = (tag: string) => TAG_LABELS[tag] ?? tag

export const projectCategories = Array.from(
  new Set(projects.flatMap((p) => p.tags).map(projectTagLabel)),
).sort()

export const news = newsRaw as NewsItem[]

export const resources = resourcesRaw as Resource[]

export const expertise = expertiseRaw as ExpertiseItem[]
export const getExpertise = (slug: string) => expertise.find((e) => e.slug === slug)
