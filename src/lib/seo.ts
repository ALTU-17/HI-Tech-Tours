import type { Metadata } from 'next'

import { SITE_URL, site } from '@/data/site'
import { getDictionary, htmlLang, hreflang, type Locale } from '@/i18n'

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}

/**
 * Social card filename for a locale.
 *
 * `output: 'export'` emits generated metadata images extensionless
 * (`out/en/opengraph-image`), which static hosts serve as `application/octet-stream`
 * — a format every social crawler rejects. scripts/postbuild.mjs copies those
 * to `og-<locale>.png` at a stable, cacheable path, and this is the URL the
 * metadata points at.
 */
export function ogImagePath(locale: Locale) {
  return `/og-${locale}.png`
}

/** Trim the home path to '' so we never emit a trailing slash on the root. */
function canonicalPath(locale: Locale, path: string) {
  const clean = path.replace(/^\/+|\/+$/g, '')
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

type BuildMetadataArgs = {
  locale: Locale
  /** Locale-less path, e.g. '/umrah-packages'. */
  path?: string
  title: string
  description: string
  /** Overrides the default per-locale social card. */
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

/**
 * Single builder for every route's metadata.
 *
 * Emits canonical + full hreflang alternates (en, hi, x-default) so the two
 * language trees are unambiguously linked as translations of each other —
 * without that, search engines treat them as competing duplicate pages.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex,
}: BuildMetadataArgs): Metadata {
  const d = getDictionary(locale)
  const canonical = absoluteUrl(canonicalPath(locale, path))
  const card = absoluteUrl(image ?? ogImagePath(locale))

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(canonicalPath('en', path)),
        hi: absoluteUrl(canonicalPath('hi', path)),
        'x-default': absoluteUrl(canonicalPath('en', path)),
      },
    },
    // SVG favicon: correct MIME type on every host. The generated 32px PNG
    // route is intentionally not referenced — see scripts/postbuild.mjs.
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      shortcut: ['/icon.svg'],
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      alternateLocale: locale === 'hi' ? 'en_IN' : 'hi_IN',
      images: [{ url: card, width: 1200, height: 630, alt: d.meta.ogAlt }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [card],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    other: { 'content-language': hreflang(locale) },
  }
}

export { htmlLang }
