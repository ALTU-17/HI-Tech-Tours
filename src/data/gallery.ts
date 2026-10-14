/**
 * Gallery images.
 *
 * Unlike reviews, reels and packages — which are hand-written data files — the
 * gallery is a folder. This module reads `public/gallery/` at build time and
 * returns every file a browser can render, so adding a photograph is a
 * copy-paste and a rebuild with no code change.
 *
 * Build time is the operative phrase: this site is a static export with no
 * server, so the listing is baked into the generated HTML. Drop images into
 * `public/gallery/` and re-run `npm run build` (or restart `npm run dev`).
 *
 * Order is numeric-aware alphabetical by filename, so prefixed names
 * (`01-makkah-haram.jpg`, `02-madinah.jpg`) control the carousel order.
 */

import fs from 'node:fs'
import path from 'node:path'

const GALLERY_DIR = path.join(process.cwd(), 'public', 'gallery')

/** Formats a browser renders without any conversion step. */
const IMAGE_PATTERN = /\.(jpe?g|png|webp|avif|gif|svg)$/i

/**
 * Camera/app default names carry no information, so they must never become a
 * caption — labelling a photograph "WhatsApp Image 2026 10 14" is worse than
 * labelling it nothing.
 */
const AUTO_NAME =
  /^(img|dsc|dscn|gopr|pxl|photo|image|pic|whatsapp|screenshot|received|untitled|vid)[-_ ]?\d+/i

export type GalleryImage = {
  /** Public URL, e.g. `/gallery/01-makkah-haram.jpg`. */
  src: string
  /**
   * Human-readable label derived from the filename, or `''` when the name looks
   * like a camera default. The UI falls back to a generic alt text in that case.
   */
  label: string
}

function labelFromFile(file: string): string {
  const stem = file
    .replace(/\.[^.]+$/, '')
    // A leading `01-` is there to sort the files, not to caption the photo.
    .replace(/^\d+[-_ ]*/, '')
  if (!stem || AUTO_NAME.test(stem)) return ''
  const words = stem.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!words) return ''
  return words.charAt(0).toUpperCase() + words.slice(1)
}

/**
 * Every renderable image in `public/gallery`, ready to hand to the carousel.
 * Returns an empty array when the folder is missing or empty — an empty gallery
 * is not an error, and the section simply does not render.
 */
export function getGalleryImages(): GalleryImage[] {
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(GALLERY_DIR, { withFileTypes: true })
  } catch {
    return []
  }

  return entries
    .filter((entry) => entry.isFile() && IMAGE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' }))
    .map((file) => ({
      src: `/gallery/${encodeURIComponent(file)}`,
      label: labelFromFile(file),
    }))
}
