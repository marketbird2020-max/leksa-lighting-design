import { useEffect, useRef, useState } from 'react'
import { SmartImage } from './SmartImage'

interface HeroMediaProps {
  videoSrc?: string | null
  posterSrc?: string | null
  alt: string
  className?: string
}

/**
 * Full-bleed hero background. Plays a muted, looping video when videoSrc is
 * provided and the browser/user preferences allow it; otherwise falls back
 * to the existing image treatment (SmartImage, same container/aspect-ratio/
 * dark overlay as before) so the layout never breaks.
 */
export function HeroMedia({ videoSrc, posterSrc, alt, className = '' }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion) {
      videoRef.current.play().catch(() => setVideoFailed(true))
    }
  }, [prefersReducedMotion])

  const showVideo = videoSrc && !videoFailed && !prefersReducedMotion

  if (!showVideo) {
    return <SmartImage src={posterSrc} alt={alt} variant="dark" ratio="aspect-[16/10]" className={`lg:aspect-[16/9] xl:aspect-[21/9] ${className}`} />
  }

  return (
    <div className={`aspect-[16/10] overflow-hidden bg-surface-inverse lg:aspect-[16/9] xl:aspect-[21/9] ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={videoSrc}
        poster={posterSrc ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        onError={() => setVideoFailed(true)}
      />
    </div>
  )
}
