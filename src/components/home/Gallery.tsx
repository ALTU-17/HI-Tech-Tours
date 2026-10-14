import { GalleryCarousel } from '@/components/gallery/GalleryCarousel'
import { getGalleryImages } from '@/data/gallery'
import { getDictionary, type Locale } from '@/i18n'

/**
 * Home page gallery.
 *
 * The photographs are not listed in code: `getGalleryImages()` reads
 * `public/gallery/` at build time, so the owner adds pictures by dropping files
 * into that folder and rebuilding. When the folder is empty the section is not
 * rendered at all — the page never carries an empty carousel.
 */
export function GallerySection({ locale }: { locale: Locale }) {
  const images = getGalleryImages()
  if (images.length === 0) return null

  const d = getDictionary(locale)

  return <GalleryCarousel images={images} copy={d.gallery} />
}
