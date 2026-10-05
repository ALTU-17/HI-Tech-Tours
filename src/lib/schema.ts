import { SITE_URL, site, postalAddress } from '@/data/site'
import { getDictionary, type Locale } from '@/i18n'
import { absoluteUrl, ogImagePath } from './seo'

/**
 * JSON-LD graph.
 *
 * Two rules are enforced here on purpose:
 *  1. No `aggregateRating` is ever emitted. Google treats invented ratings as
 *     structured-data spam, and a site with fake review markup can lose rich
 *     results entirely. `buildReviewNode` returns null until the owner has
 *     real, verifiable reviews in src/data/reviews.ts.
 *  2. Every node carries a stable `@id` so nodes can reference each other
 *     instead of duplicating the business name, address and phone — duplicate
 *     but inconsistent entity data is exactly what confuses an AI engine.
 */

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const BUSINESS_ID = `${SITE_URL}/#localbusiness`

type Ctx = { locale: Locale }

export function organizationNode() {
  return {
    '@type': 'TravelAgency',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: [site.nameHi, 'Haj Umrah Services', 'Hi-Tech Umrah', 'Hi-Tech Haj Umrah'],
    url: SITE_URL,
    description: site.shortDescription,
    logo: absoluteUrl('/logo.svg'),
    image: absoluteUrl(ogImagePath('en')),
    telephone: `+91-${site.phone}`,
    email: site.email,
    address: postalAddress('en'),
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Marathwada' },
      { '@type': 'City', name: 'Jalna' },
      { '@type': 'City', name: 'CSN (Aurangabad)' },
    ],
    knowsLanguage: ['en', 'hi', 'ur', 'ar'],
    parentOrganization: { '@id': ORG_ID },
    sameAs: Object.values(site.social).filter(Boolean),
  }
}

export function localBusinessNode() {
  return {
    '@type': 'TravelAgency',
    '@id': BUSINESS_ID,
    name: site.name,
    alternateName: site.nameHi,
    url: absoluteUrl('/en/contact'),
    image: absoluteUrl(ogImagePath('en')),
    telephone: `+91-${site.phone}`,
    email: site.email,
    priceRange: '$$',
    currenciesAccepted: 'INR',
    address: postalAddress('en'),
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Saturday',
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
        ],
        opens: '09:30',
        closes: '20:30',
      },
    ],
    parentOrganization: { '@id': ORG_ID },
    areaServed: { '@type': 'AdministrativeArea', name: 'Marathwada' },
    sameAs: Object.values(site.social).filter(Boolean),
  }
}

export function websiteNode({ locale }: Ctx) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl(`/${locale}`),
    name: site.name,
    inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbNode(trail: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqNode(items: Array<{ q: { en: string; hi: string }; a: { en: string; hi: string } }>, locale: Locale) {
  if (items.length === 0) return null
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q[locale],
      acceptedAnswer: { '@type': 'Answer', text: item.a[locale] },
    })),
  }
}

export function serviceNode(args: {
  name: string
  description: string
  url: string
  providerName?: string
}) {
  return {
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: args.url,
    serviceType: args.name,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'AdministrativeArea', name: 'Marathwada' },
  }
}

export function offerCatalogNode(
  items: Array<{ name: string; description: string; url: string }>,
) {
  return {
    '@type': 'OfferCatalog',
    name: 'Umrah packages',
    itemListElement: items.map((item) => ({
      '@type': 'Offer',
      name: item.name,
      description: item.description,
      url: item.url,
      // Deliberately no `price`: the rate is quoted per departure because it
      // depends on month and group size. An Offer without a price is valid and
      // honest; an Offer with an invented price is neither.
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
    })),
  }
}

export function itemListNode(
  name: string,
  items: Array<{ name: string; url: string; description?: string }>,
) {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

export function articleNode(args: {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  inLanguage: string
}) {
  return {
    '@type': 'Article',
    headline: args.headline,
    description: args.description,
    url: args.url,
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    inLanguage: args.inLanguage,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': args.url },
    image: absoluteUrl(ogImagePath(args.inLanguage.startsWith('hi') ? 'hi' : 'en')),
  }
}

export function webPageNode(args: {
  name: string
  description: string
  url: string
  locale: Locale
  breadcrumbs: Array<{ name: string; path: string }>
  dateModified?: string
}) {
  return {
    '@type': 'WebPage',
    '@id': `${args.url}#webpage`,
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: args.locale === 'hi' ? 'hi-IN' : 'en-IN',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    breadcrumb: breadcrumbNode(args.breadcrumbs),
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
  }
}

/**
 * Review node — returns null unless `verifiedReviews` is non-empty.
 * See the warning at the top of src/data/reviews.ts.
 */
export function reviewNode(verified: Array<{ name: string; city: string; quote: { en: string; hi: string }; rating?: number }>, locale: Locale) {
  if (verified.length === 0) return null
  return {
    '@type': 'ItemList',
    name: 'Customer reviews',
    itemListElement: verified.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        datePublished: '2026-01-01',
        reviewBody: r.quote[locale],
        ...(r.rating ? { reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 } } : {}),
        itemReviewed: { '@id': BUSINESS_ID },
      },
    })),
  }
}

/** Convenience wrapper that assembles a full page graph. */
export function pageGraph(locale: Locale, nodes: Array<object | null>) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      ...nodes.filter(Boolean),
    ],
  })
}

export { SITE_URL, absoluteUrl, getDictionary }
