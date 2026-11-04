import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

export interface FilterGroup {
  key: string
  label: string
  options: string[]
}

export type FilterState = Record<string, string[]>

interface FilterPanelProps {
  groups: FilterGroup[]
  selected: FilterState
  onToggle: (groupKey: string, value: string) => void
  onClear: () => void
}

export function FilterPanel({ groups, selected, onToggle, onClear }: FilterPanelProps) {
  const activeCount = Object.values(selected).reduce((sum, v) => sum + v.length, 0)

  return (
    <div>
      <div className="flex items-center justify-between border-b border-border-default pb-3">
        <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-text-primary">Filter</h2>
        {activeCount > 0 && (
          <button type="button" onClick={onClear} className="text-xs font-medium text-text-secondary hover:text-text-primary">
            Clear ({activeCount})
          </button>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-6">
        {groups.map((group) => (
          <fieldset key={group.key}>
            <legend className="mb-2.5 text-xs font-medium uppercase tracking-[0.08em] text-text-tertiary">
              {group.label}
            </legend>
            <div className="flex flex-col gap-2">
              {group.options.map((option) => {
                const checked = selected[group.key]?.includes(option) ?? false
                return (
                  <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(group.key, option)}
                      className="h-3.5 w-3.5 shrink-0 accent-black"
                    />
                    {option}
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </div>
  )
}

interface FilterDrawerProps extends FilterPanelProps {
  open: boolean
  onClose: () => void
  resultCount: number
}

export function FilterDrawer({ open, onClose, resultCount, ...panelProps }: FilterDrawerProps) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/30 lg:hidden" style={{ animation: 'fadeIn var(--motion-fast) var(--motion-ease)' }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
        className="flex max-h-[85vh] flex-col rounded-t-lg bg-surface-page"
        style={{ animation: 'slideUp var(--motion-normal) var(--motion-ease)' }}
      >
        <div className="flex items-center justify-between border-b border-border-default px-5 py-3.5">
          <p className="text-sm font-medium text-text-primary">Filter</p>
          <button type="button" onClick={onClose} aria-label="Close filters" className="flex h-8 w-8 items-center justify-center">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FilterPanel {...panelProps} />
        </div>
        <div className="border-t border-border-default p-4">
          <Button variant="primary" onClick={onClose} className="w-full">
            Show {resultCount} {resultCount === 1 ? 'Product' : 'Products'}
          </Button>
        </div>
      </div>
    </div>
  )
}
