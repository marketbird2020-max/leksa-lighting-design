import { useEffect, useRef, useState } from 'react'
import { SectionHeader } from './SectionHeader'

interface Stat {
  value: number
  suffix: string
  label: string
}

// Trimmed to the six strongest figures so the row fits on a single line on
// desktop without crowding. "Branch Offices" was dropped as the smallest,
// least distinctive number and the one most redundant with "Global Sales
// Network" — nothing else was invented or altered.
const stats: Stat[] = [
  { value: 800, suffix: '+', label: 'Projects Completed' },
  { value: 500, suffix: '+', label: 'Lighting Products' },
  { value: 15, suffix: '+', label: 'Lighting Verticals' },
  { value: 225, suffix: '+', label: 'Professional Team' },
  { value: 80000, suffix: '', label: 'Sq. Ft. Manufacturing Facility' },
  { value: 20, suffix: '+', label: 'Global Sales Network' },
]

// Single brand accent used as a quiet underline mark beneath each figure,
// in place of icon badges — a plainer, more restrained treatment.
const ACCENT = '#0059FC'

function StatItem({ stat }: { stat: Stat }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(stat.value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || startedRef.current) return
        startedRef.current = true
        const duration = 1400
        const start = performance.now()

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          setDisplay(Math.round(eased * stat.value))
          if (progress < 1) window.requestAnimationFrame(tick)
        }

        window.requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stat.value])

  return (
    <div ref={ref} className="flex min-w-0 flex-col items-center px-3 text-center sm:px-4 lg:px-5">
      <p className="text-2xl font-semibold tabular-nums text-text-primary md:text-3xl">
        {display.toLocaleString('en-US')}
        {stat.suffix}
      </p>
      <span className="mt-2 h-[2px] w-5 rounded-full" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
      <p className="mt-2 text-[11px] font-medium uppercase leading-snug tracking-[0.06em] text-text-secondary md:text-xs">
        {stat.label}
      </p>
    </div>
  )
}

export function StatsCounter() {
  return (
    <section className="bg-surface-page py-8 md:py-10">
      <div className="content-width page-padding">
        <SectionHeader
          title="Lighting Excellence in Numbers"
          description="Experience, expertise and a growing footprint built over the years."
          align="center"
        />

        <div className="mt-6 md:mt-8">
          {/* Mobile / tablet: a plain wrapped grid — no dividers, since
              divide-x produces stray borders once flex items wrap. */}
          <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-6 lg:hidden">
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>

          {/* Desktop: a single row with a thin vertical rule between each
              figure — no wrapping, so it reads as one continuous strip. */}
          <div className="hidden lg:flex lg:justify-center lg:divide-x lg:divide-border-default">
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
