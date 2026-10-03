import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { feederCities, locations, marathwada, marathwadaRegion } from '@/data/locations'
import { site } from '@/data/site'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  breadcrumbNode,
  itemListNode,
  localBusinessNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from '@/lib/schema'
import { getDictionary, isLocale, t_ } from '@/i18n'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const d = getDictionary(locale)
  return buildMetadata({
    locale,
    path: 'locations',
    title: d.locationsPage.title,
    description: d.locationsPage.description,
  })
}

export default async function LocationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/locations`
  const url = absoluteUrl(path)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.locationsPage.title,
        description: d.locationsPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.locations, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.locations, path },
      ]),
      itemListNode(
        d.locationsPage.title,
        locations.map((l) => ({
          name: t_({ en: l.name, hi: l.nameHi }, locale),
          url: absoluteUrl(`/${path}/${l.slug}`),
        })),
      ),
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
              { name: d.nav.locations, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.sections.coverage.eyebrow}
            title={d.locationsPage.title}
            lede={d.locationsPage.lede}
            className="mt-6"
          />
          <p className="mt-5 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-soft">
            {t_(marathwadaRegion.description, locale)}
          </p>
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        {/* Marathwada */}
        <SectionHeading
          kicker={d.sections.coverage.eyebrow}
          title={d.sections.coverage.title}
          lede={d.sections.coverage.lede}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marathwada.map((city, i) => (
            <Reveal as="li" key={city.slug} delay={i * 40}>
              <Link
                href={`/${path}/${city.slug}`}
                className="card-surface card-surface-hover group flex h-full flex-col justify-between gap-5 p-6"
              >
                <div>
                  <h2 className="font-display text-xl font-semibold text-ink">
                    {t_({ en: city.name, hi: city.nameHi }, locale)}
                  </h2>
                  <p className="mt-1.5 text-xs font-medium text-forest-700">
                    {t_(city.hub, locale)}
                  </p>
                </div>

                <dl className="space-y-2 border-t border-sand/70 pt-4 text-sm">
                  {city.airports.slice(0, 2).map((a) => (
                    <div key={a.code} className="flex items-center justify-between gap-3">
                      <dt className="flex items-center gap-2 text-ink-muted">
                        <Icon name="plane2" className="h-3.5 w-3.5 text-forest-600" />
                        {a.code}
                      </dt>
                      <dd className="font-medium text-ink-soft tabular">
                        {a.distanceKm === 0 ? d.locationsPage.inCity : `${a.distanceKm} km`}
                      </dd>
                    </div>
                  ))}
                </dl>

                <span className="flex items-center gap-2 text-sm font-semibold text-forest-700">
                  {d.common.learnMore}
                  <Icon
                    name="arrow"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* Feeder cities */}
        <Reveal className="mt-20">
          <SectionHeading kicker={d.sections.packages.eyebrow} title={d.sections.branches.title} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {feederCities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/${path}/${city.slug}`}
                  className="card-surface card-surface-hover flex items-center justify-between gap-3 px-5 py-4"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {t_({ en: city.name, hi: city.nameHi }, locale)}
                    </span>
                    <span className="block text-xs text-ink-muted">
                      {city.airports[0].code}
                      {city.airports[0].distanceKm > 0 ? ` · ${city.airports[0].distanceKm} km` : ''}
                    </span>
                  </span>
                  <Icon name="arrow" className="h-4 w-4 shrink-0 text-forest-600 rtl:-scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-16">
          <div className="flex flex-col items-center gap-5 rounded-card bg-forest-950 px-6 py-12 text-center text-paper">
            <h2 className="font-display text-2xl font-semibold">{d.cta.title}</h2>
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-paper/70">
              {locale === 'hi'
                ? 'अपना जिला बताएँ और हम उस इलाके का निकटतम संपर्क और उपलब्ध रवाना बताएँगे।'
                : 'Tell us your district and we will connect you with the nearest contact and the next available departure from that airport.'}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={telHref(site.phone)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
              >
                <Icon name="phone" className="h-4 w-4" />
                {d.cta.primary}
              </a>
              <a
                href={whatsappHref(enquiryMessage(locale, 'pickup'))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:border-paper/60"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                {d.cta.secondary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  )
}