import { SmartImage } from './SmartImage'

interface CategoryBannerProps {
  image: string | null
  title: string
  description?: string | null
  eyebrow?: string
}

/**
 * Full-width, premium hero banner for a category landing page: a large
 * image with the title and an optional short intro overlaid at the bottom,
 * in the same visual language as the homepage hero (dark scrim + white
 * type) so it feels consistent with the rest of the site rather than
 * introducing a new style.
 */
export function CategoryBanner({ image, title, description, eyebrow }: CategoryBannerProps) {
  return (
    <div className="relative">
      <SmartImage
        src={image}
        alt={title}
        variant="dark"
        ratio="aspect-[4/5]"
        className="w-full sm:aspect-[16/9] md:aspect-[16/7]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="content-width page-padding absolute inset-0 flex flex-col justify-end pb-10 md:pb-13">
        {eyebrow && <span className="text-sm font-medium uppercase tracking-[0.12em] text-white/70">{eyebrow}</span>}
        <h1 className="mt-2 max-w-2xl text-3xl font-light leading-[1.05] tracking-tight text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">{description}</p>}
      </div>
    </div>
  )
}
