interface PlaceholderImageProps {
  label: string
  seed?: string
  className?: string
  variant?: 'light' | 'dark'
  ratio?: string // tailwind aspect ratio class, e.g. 'aspect-[4/5]'
}

// Deterministic pseudo-random from a string seed, so the same product
// always renders the same placeholder composition.
function hashSeed(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

/**
 * Stand-in for real product / architectural photography.
 * Renders a restrained geometric composition on a neutral surface so page
 * layout, spacing and hover behaviour can be reviewed before real imagery
 * (from the CMS/DAM) replaces it.
 */
export function PlaceholderImage({ label, seed, className = '', variant = 'light', ratio = 'aspect-[4/5]' }: PlaceholderImageProps) {
  const h = hashSeed(seed ?? label)
  const cx = 30 + (h % 40)
  const cy = 30 + ((h >> 3) % 40)
  const r = 18 + ((h >> 6) % 14)
  const rot = (h >> 9) % 360
  const bg = variant === 'dark' ? '#111111' : '#F3F3F3'
  const stroke = variant === 'dark' ? 'rgba(255,255,255,0.35)' : 'rgba(17,17,17,0.18)'
  const strokeStrong = variant === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(17,17,17,0.35)'

  return (
    <div className={`relative overflow-hidden ${ratio} ${className}`} style={{ backgroundColor: bg }} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth="0.5" />
        <line x1="0" y1={cy} x2="100" y2={cy} stroke={stroke} strokeWidth="0.3" />
        <g transform={`rotate(${rot} ${cx} ${cy})`}>
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke={strokeStrong} strokeWidth="0.4" />
        </g>
        <rect x={cx - r * 0.4} y={cy - r * 0.4} width={r * 0.8} height={r * 0.8} fill="none" stroke={strokeStrong} strokeWidth="0.4" />
      </svg>
      <span
        className="absolute bottom-3 left-3 font-sans text-[10px] font-medium uppercase tracking-[0.1em]"
        style={{ color: variant === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(17,17,17,0.4)' }}
      >
        {label}
      </span>
    </div>
  )
}
