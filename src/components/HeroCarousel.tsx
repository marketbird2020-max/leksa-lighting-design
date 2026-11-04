import { useEffect, useState } from 'react'
import { HeroMedia } from './HeroMedia'
import { LinkButton } from './Button'

export interface HeroSlide {
  videoSrc?: string | null
  posterSrc: string | null
  eyebrow?: string
  title: string
  description: string
  primaryCta: { label: string; to: string }
  secondaryCta?: { label: string; to: string }
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  intervalMs?: number
}

export function HeroCarousel({ slides, intervalMs = 7000 }: HeroCarouselProps) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || slides.length < 2) return
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [paused, slides.length, intervalMs])

  const slide = slides[active]

  return (
    <section
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div key={i} className={i === active ? 'absolute inset-0 lg:static' : 'hidden'}>
          <HeroMedia videoSrc={s.videoSrc} posterSrc={s.posterSrc} alt={s.title} className="h-full w-full lg:h-auto" />
        </div>
      ))}

      {/* Below lg the text block sizes the hero (so it can never be clipped or slide
          under the nav); from lg up it overlays a fixed-ratio image exactly as before. */}
      <div className="content-width page-padding relative flex min-h-[520px] flex-col justify-end pb-13 pt-[calc(var(--header-height)+2.5rem)] md:min-h-[480px] md:pb-16 lg:absolute lg:inset-0 lg:min-h-0 lg:pt-0">
        {/* On desktop the gradient is weighted to the bottom text band and fades out by
            roughly 60% of the hero's height, so the upper two-thirds of the
            image stays fully visible rather than tinting the whole photo. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_28%,rgba(0,0,0,0)_60%)] max-lg:bg-[linear-gradient(to_top,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.4)_100%)]"
          aria-hidden="true"
        />
        <div className="relative">
        {slide.eyebrow && <span className="text-sm font-medium uppercase tracking-[0.12em] text-white/70">{slide.eyebrow}</span>}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-hero">
          {slide.title}
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">{slide.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <LinkButton to={slide.primaryCta.to} variant="primary" className="bg-white text-text-primary hover:bg-white/85">
            {slide.primaryCta.label}
          </LinkButton>
          {slide.secondaryCta && (
            <LinkButton
              to={slide.secondaryCta.to}
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-text-primary"
            >
              {slide.secondaryCta.label}
            </LinkButton>
          )}
        </div>

        {slides.length > 1 && (
          <div className="mt-10 flex gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? '28px' : '14px',
                  backgroundColor: i === active ? '#ffffff' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  )
}
