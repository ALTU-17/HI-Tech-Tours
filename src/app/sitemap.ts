import type { MetadataRoute } from 'next'

import { guides } from '@/data/guides'
import { locations } from '@/data/locations'
import { packages } from '@/data/packages'
import { services } from '@/data/services'
import { SITE_URL } from '@/data/site'
import { locales, type Locale } from '@/i18n'

// Required by `output: 'export'`.
export const dynamic = 'force-static'

/**
 * Sitemap with hreflang alternates.
 *
 * Every entry lists both language URLs plus `x-default`, so crawlers are told
 * explicitly that `/hi/...` and `/en/...` are translations of one page rather
 * than two competing pages competing for the same query.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-10-01')

  const entry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
    lastMod: Date = lastModified,
  ) => ({
    lastModified: lastMod,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries([
        ...locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
        ['x-default', `${SITE_URL}/en${path}`],
      ]),
    },
  })

  const staticPaths: Array<[string, MetadataRoute.Sitemap[number]['changeFrequency'], number]> = [
    ['', 'weekly', 1],
    ['/umrah-packages', 'weekly', 0.95],
    ['/hajj', 'monthly', 0.8],
    ['/services', 'monthly', 0.85],
    ['/locations', 'monthly', 0.9],
    ['/guides', 'weekly', 0.8],
    ['/faq', 'monthly', 0.8],
    ['/about', 'yearly', 0.6],
    ['/reviews', 'monthly', 0.7],
    ['/contact', 'yearly', 0.85],
  ]

  const items: MetadataRoute.Sitemap = staticPaths.map(([path, freq, priority]) => ({
    url: `${SITE_URL}/en${path}`,
    ...entry(path, freq, priority),
  }))

  for (const loc of locations) {
    items.push({
      url: `${SITE_URL}/en/locations/${loc.slug}`,
      ...entry(`/locations/${loc.slug}`, 'monthly', loc.kind === 'marathwada' ? 0.85 : 0.7),
    })
  }

  for (const service of services) {
    items.push({
      url: `${SITE_URL}/en/services/${service.slug}`,
      ...entry(`/services/${service.slug}`, 'monthly', 0.75),
    })
  }

  for (const guide of guides) {
    items.push({
      url: `${SITE_URL}/en/guides/${guide.slug}`,
      ...entry(`/guides/${guide.slug}`, 'monthly', 0.8, new Date(guide.dateModified)),
    })
  }

  return items
}

/** Kept for parity checks: every package must be reachable from the site. */
export const packageSlugs = packages.map((p) => p.slug)
export const localeList: Locale[] = locales