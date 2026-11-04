import { FlaskConical, CircuitBoard, Lightbulb, ShieldCheck, Factory, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BlueIconBadge } from './BlueIconBadge'

const ICONS: Record<string, LucideIcon> = {
  'Photometric Lab': FlaskConical,
  'SMT Lab': CircuitBoard,
  'Research & Development Centre': Lightbulb,
  'IP Testing Facility': ShieldCheck,
  'Fabrication & Powder Coating Facility': Factory,
  'Experience Centre': Building2,
}

// Every facility uses Leksa blue; they differ only by shade (index into the
// shared BRAND_BLUE_SHADES palette), so the row reads as one brand system.
const SHADES: Record<string, number> = {
  'Photometric Lab': 0,
  'SMT Lab': 1,
  'Research & Development Centre': 2,
  'IP Testing Facility': 3,
  'Fabrication & Powder Coating Facility': 4,
  'Experience Centre': 5,
}

export function FacilitiesStrip({ facilities }: { facilities: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
      {facilities.map((name, i) => {
        const Icon = ICONS[name] ?? Building2
        const shade = SHADES[name] ?? i
        return (
          <div key={name} className="group flex flex-col items-center text-center">
            <BlueIconBadge
              icon={Icon}
              shade={shade}
              className="transition-transform duration-250 ease-[var(--motion-ease)] group-hover:scale-105"
            />
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">{name}</p>
          </div>
        )
      })}
    </div>
  )
}
