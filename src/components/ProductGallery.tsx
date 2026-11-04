import { useState } from 'react'
import { SmartImage } from './SmartImage'

interface ProductGalleryProps {
  productName: string
  images: (string | null)[]
}

// Extra angles used to pad out the gallery to a minimum count when a
// product only has one or two real photos on file, so the multi-image
// gallery UI can always be reviewed. These render as the existing
// PlaceholderImage (distinct per label) until real photography replaces
// them — never a broken image.
const PLACEHOLDER_ANGLES = ['Front View', 'Side Angle', 'Installed View', 'Detail View']
const MIN_GALLERY_IMAGES = 4

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const realImages = images.length > 0 ? images : [null]
  const gallery: { src: string | null; alt: string }[] = realImages.map((src) => ({ src, alt: productName }))
  let angleIndex = 0
  while (gallery.length < MIN_GALLERY_IMAGES) {
    const angle = PLACEHOLDER_ANGLES[angleIndex % PLACEHOLDER_ANGLES.length]
    gallery.push({ src: null, alt: `${productName} — ${angle}` })
    angleIndex++
  }

  const [active, setActive] = useState(0)
  const activeImage = gallery[active] ?? gallery[0]

  function handleKeyDown(e: React.KeyboardEvent) {
    if (gallery.length < 2) return
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setActive((i) => (i + 1) % gallery.length)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') setActive((i) => (i - 1 + gallery.length) % gallery.length)
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div
        role="group"
        aria-label={`${productName} image`}
        tabIndex={gallery.length > 1 ? 0 : -1}
        onKeyDown={handleKeyDown}
        className="min-w-0 focus-visible:outline-none lg:flex-1"
      >
        <SmartImage src={activeImage.src} alt={activeImage.alt} ratio="aspect-square" className="w-full" />
      </div>

      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto lg:w-20 lg:flex-shrink-0 lg:flex-col lg:overflow-x-visible lg:overflow-y-auto">
          {gallery.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={active === i}
              className={`w-16 flex-shrink-0 overflow-hidden rounded-md transition-opacity lg:w-full ${
                active === i ? 'opacity-100 ring-1 ring-interactive-default' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <SmartImage src={img.src} alt={`${productName} thumbnail ${i + 1}`} ratio="aspect-square" />
            </button>
          ))}
        </div>
      )}

      {gallery.length > 1 && <p className="sr-only">Use the arrow keys to move through the gallery.</p>}
    </div>
  )
}
