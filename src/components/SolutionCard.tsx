import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ExpertiseItem } from '@/data/types'

export function SolutionCard({ item }: { item: ExpertiseItem }) {
  return (
    <Link
      to={`/expertise/${item.slug}`}
      className="group flex items-center justify-between border-b border-border-default py-8 transition-colors duration-150 hover:bg-surface-subtle"
    >
      <div className="px-1">
        <h3 className="text-2xl font-light text-text-primary md:text-3xl">{item.name}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">{item.description}</p>
      </div>
      <ArrowUpRight
        size={24}
        strokeWidth={1.5}
        className="ml-6 shrink-0 text-text-primary transition-transform duration-250 ease-[var(--motion-ease)] group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  )
}
