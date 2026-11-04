import type { LucideIcon } from 'lucide-react'

/**
 * One brand-blue palette for every icon badge on the homepage (laboratory /
 * facility icons and certification badges). Items stay distinguishable by
 * using different shades of the same Leksa blue (#0059FC family) rather than
 * unrelated colours.
 */
export const BRAND_BLUE_SHADES = [
  '#0059FC', // Leksa primary blue
  '#2F7BFF', // lighter
  '#0043C7', // deeper
  '#3F88FF', // soft light
  '#004FE0', // slightly deeper than primary
  '#1A68F0', // mid
] as const

interface BlueIconBadgeProps {
  icon: LucideIcon
  /** Index into BRAND_BLUE_SHADES (wraps around). */
  shade: number
  /** Badge diameter in px. */
  size?: number
  /** Icon size in px. */
  iconSize?: number
  className?: string
}

export function BlueIconBadge({ icon: Icon, shade, size = 64, iconSize = 28, className = '' }: BlueIconBadgeProps) {
  const color = BRAND_BLUE_SHADES[shade % BRAND_BLUE_SHADES.length]
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        // Soft blue gradient: a touch stronger top-left, fading out.
        background: `linear-gradient(135deg, ${color}2B 0%, ${color}10 100%)`,
        boxShadow: `inset 0 0 0 1px ${color}1F`,
      }}
    >
      <Icon size={iconSize} strokeWidth={1.5} style={{ color }} />
    </div>
  )
}
