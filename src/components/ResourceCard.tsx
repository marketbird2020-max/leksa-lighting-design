import { Download, FileText } from 'lucide-react'
import type { Resource } from '@/data/types'

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border-default py-6">
      <div className="flex items-start gap-4">
        <FileText size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-text-tertiary" />
        <div>
          <p className="text-md font-medium text-text-primary">{resource.title}</p>
          <p className="mt-1 text-xs text-text-tertiary">{resource.fileType} File</p>
        </div>
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        download
        aria-label={`Download ${resource.title}`}
        className="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-interactive-default px-4 text-sm font-medium text-text-primary transition-colors duration-150 hover:bg-interactive-default hover:text-interactive-inverse"
      >
        <Download size={16} strokeWidth={1.5} />
        <span className="hidden sm:inline">Download</span>
      </a>
    </div>
  )
}
