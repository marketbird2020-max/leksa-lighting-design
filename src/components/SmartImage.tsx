import { useState } from 'react'
import { PlaceholderImage } from './PlaceholderImage'

interface SmartImageProps {
  src?: string | null
  alt: string
  ratio?: string
  className?: string
  variant?: 'light' | 'dark'
}

/**
 * Renders a real product/project/company photo from the Leksa dataset when a
 * URL is available and loads successfully. Falls back to the existing
 * geometric PlaceholderImage — same container, aspect ratio and background —
 * when no image is available or the source URL fails to load, so a broken
 * link never breaks the layout.
 */
export function SmartImage({ src, alt, ratio = 'aspect-[4/5]', className = '', variant = 'light' }: SmartImageProps) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return <PlaceholderImage label={alt} seed={alt} ratio={ratio} className={className} variant={variant} />
  }

  return (
    <div
      className={`overflow-hidden ${ratio} ${className}`}
      style={{ backgroundColor: variant === 'dark' ? '#111111' : '#F3F3F3' }}
    >
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
