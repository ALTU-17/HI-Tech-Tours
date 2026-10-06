import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { getLocation, locations } from '@/data/locations'
import { site } from '@/data/site'
import { telHref, whatsappHref } from '@/lib/contact'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  breadcrumbNode,
  localBusinessNode,
  organizationNode,
  serviceNode,
  webPageNode,
  websiteNode,
} from '@/lib/schema'
import { getDictionary, isLocale, locales, t_ } from '@/i18n'

/** One page per district and feeder city, for both languages. */
export function generateStaticParams() {
  return locales.flatMap((locale) => locations.map((city) => ({ locale, city: city.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>
}): Promise<Metadata> {
  const { locale, city: citySlug } = await params
  if (!isLocale(locale)) return {}
  const city = getLocation(citySlug)
  if (!city) return {}

  const name = t_({ en: city.name, hi: city.nameHi }, locale)
  const title =
    locale === 'hi'
      ? `${name} से उमरा व हज सेवाएँ — हज उमरा सर्विस, औरंगाबाद`
      : `Umrah & Hajj from ${name} — Hi-Tech Haj Umrah Services, Aurangabad`

  const description =
    locale === 'hi'
      ? `${name} के जायरीनों के लिए उमरा पैकेज, वीज़ा सहायता और समूह पिकअप। ${city.airports[0].nameHi} (${city.airports[0].code}) लगभग ${city.airports[0].distanceKm} किमी दूर।`
      : `Umrah packages, visa assistance and group pickup for pilgrims in ${name}. Nearest airport ${city.airports[0].name} (${city.airports[0].code}), about ${city.airports[0].distanceKm} km away.`

  return buildMetadata({
    locale,
    path: `locations/${citySlug}`,
    title,
    description,
  })
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>
}) {
  const { locale, city: citySlug } = await params
  if (!isLocale(locale)) notFound()

  const city = getLocation(citySlug)
  if (!city) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/locations/${citySlug}`
  const url = absoluteUrl(path)
  const name = t_({ en: city.name, hi: city.nameHi }, locale)
  const nearest = city.airports[0]

  // The answer paragraph is the GEO payload: one self-contained, entity-named
  // sentence that an assistant can quote without reading further down the page.
  const answerText = city.answer[locale]({
    distance: nearest.distanceKm,
    branch: city.contactName,
    branchHi: city.contactNameHi,
  })

  const others = locations.filter((l) => l.slug !== city.slug)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: `${name} — ${site.name}`,
        description: answerText.slice(0, 300),
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.locations, path: `/${locale}/locations` },
          { name, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.locations, path: `/${locale}/locations` },
        { name, path },
      ]),
      serviceNode({
        name: locale === 'hi' ? `${name} से उमरा और हज सेवाएँ` : `Umrah and Hajj services from ${name}`,
        description: answerText.slice(0, 300),
        url,
      }),
    ],
  }

  return (
    <>
      <JsonLd data={graph} />

      <header className="relative overflow-hidden border-b border-sand/70 bg-gradient-to-b from-forest-100/50 to-paper py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-lattice opacity-25 mask-fade-b" aria-hidden="true" />
        <div className="relative container-page">
          <Breadcrumbs
            trail={[
              { name: d.nav.home, href: `/${locale}` },
              { name: d.nav.locations, href: `/${locale}/locations` },
              { name, href: path },
            ]}
          />

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[2.1rem] leading-tight font-semibold text-ink sm:text-[2.7rem]">
              {locale === 'hi'
                ? `${name} से उमरा व हज सेवाएँ`
                : `Haj & Umrah from ${name}`}
            </h1>
            <span className="rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">
              {t_(city.hub, locale)}
            </span>
          </div>

          {/* Answer-shaped opening paragraph. */}
          <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-soft">
            {answerText}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref(city.contactPhone)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
            >
              <Icon name="phone" className="h-4 w-4" />
              {city.contactPhone}
            </a>
            <a
              href={whatsappHref(
                locale === 'hi'
                  ? `अस्सलामु अलाइकुम। मैं ${name} से उमरा के लिए पूछना चाहता/चाहती हूँ।`
                  : `Assalamu alaikum. I would like to enquire about Umrah from ${city.name}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-700/25 bg-cream px-6 py-3.5 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-700/60 hover:bg-forest-100/50"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              {d.common.whatsappUs}
            </a>
          </div>
        </div>
      </header>

      <div className="container-page py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            {/* Airports */}
            <SectionHeading title={d.locationsPage.airports} kicker={d.locationsPage.distance} />
            <ul className="mt-6 space-y-3">
              {city.airports.map((airport) => (
                <li key={airport.code} className="card-surface flex items-center gap-4 px-5 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-100 font-display text-sm font-bold text-forest-800">
                    {airport.code}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">
                      {t_({ en: airport.name, hi: airport.nameHi }, locale)}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {airport.travelTime}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="block text-sm font-bold text-forest-800 tabular">
                      {airport.distanceKm === 0
                        ? d.locationsPage.inCity
                        : `${airport.distanceKm} km`}
                    </span>
                    <span className="block text-[0.65rem] text-ink-muted uppercase">
                      {d.common.approx}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-muted">
              <Icon name="shield" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
              {d.locationsPage.distanceNote}
            </p>

            {/* Pickup */}
            <div className="mt-12">
              <SectionHeading title={d.locationsPage.pickupTitle} />
              <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
                {d.locationsPage.pickupBody}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {d.locationsPage.localContact}
              </h2>
              <p className="mt-3 font-display text-xl font-semibold text-ink">
                {t_({ en: city.contactName, hi: city.contactNameHi }, locale)}
              </p>
              <a
                href={telHref(city.contactPhone)}
                className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-forest-800 tabular link-underline"
              >
                <Icon name="phone" className="h-4 w-4" />
                {city.contactPhone}
              </a>
            </div>

            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {d.sections.packages.eyebrow}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {['silver-umrah', 'deluxe-umrah', 'diamond-umrah', 'ramadan-special'].map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${locale}/umrah-packages#${slug}`}
                      className="flex items-center justify-between gap-3 text-sm text-ink-soft transition-colors hover:text-forest-700"
                    >
                      {locale === 'hi'
                        ? { 'silver-umrah': 'सिल्वर उमरा', 'deluxe-umrah': 'डीलक्स उमरा', 'diamond-umrah': 'डायमंड उमरा', 'ramadan-special': 'रमजान स्पेशल उमरा' }[slug]
                        : { 'silver-umrah': 'Silver Umrah', 'deluxe-umrah': 'Deluxe Umrah', 'diamond-umrah': 'Diamond Umrah', 'ramadan-special': 'Ramzan Special Umrah' }[slug]}
                      <Icon name="arrow" className="h-4 w-4 shrink-0 text-forest-600 rtl:-scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Neighbouring locations — the internal-link mesh across Marathwada. */}
        <Reveal className="mt-16">
          <SectionHeading title={d.locationsPage.title} kicker={d.sections.coverage.eyebrow} />
          <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/${locale}/locations/${other.slug}`}
                  className="card-surface card-surface-hover flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="truncate text-sm font-medium text-ink">
                    {t_({ en: other.name, hi: other.nameHi }, locale)}
                  </span>
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-forest-600 rtl:-scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </>
  )
}