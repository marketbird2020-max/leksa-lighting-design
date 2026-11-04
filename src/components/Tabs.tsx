import { useState, type ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  content: ReactNode
}

export function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id)
  const activeItem = items.find((t) => t.id === active) ?? items[0]

  if (items.length === 0) return null

  return (
    <div>
      <div role="tablist" aria-label="Product details" className="flex gap-8 overflow-x-auto border-b border-border-default">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active === item.id}
            aria-controls={`tabpanel-${item.id}`}
            onClick={() => setActive(item.id)}
            className={`shrink-0 whitespace-nowrap border-b-2 py-3.5 text-sm font-medium transition-colors duration-150 ${
              active === item.id
                ? 'border-interactive-default text-text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {activeItem && (
        <div role="tabpanel" id={`tabpanel-${activeItem.id}`} aria-labelledby={`tab-${activeItem.id}`} className="pt-8">
          {activeItem.content}
        </div>
      )}
    </div>
  )
}
