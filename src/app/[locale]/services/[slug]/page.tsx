import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/ui/SectionHeading'
import { getService, services } from '@/data/services'
import { site } from '@/data/site'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
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

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((service) => ({ locale, slug: service.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const service = getService(slug)
  if (!service) return {}
  const name = t_(service.summary, locale)
  return buildMetadata({
    locale,
    path: `services/${slug}`,
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} — ${site.name}, Jalna`,
    description: name,
  })
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const service = getService(slug)
  if (!service) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/services/${slug}`
  const url = absoluteUrl(path)
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const others = services.filter((s) => s.slug !== slug)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: title,
        description: t_(service.summary, locale),
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.services, path: `/${locale}/services` },
          { name: title, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.services, path: `/${locale}/services` },
        { name: title, path },
      ]),
      serviceNode({
        name: title,
        description: t_(service.detail, locale),
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
              { name: d.nav.services, href: `/${locale}/services` },
              { name: title, href: path },
            ]}
          />
          <div className="mt-8 flex items-center gap-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest-800 text-paper">
              <Icon name={service.icon} className="h-7 w-7" />
            </span>
            <h1 className="font-display text-[2rem] leading-tight font-semibold text-ink sm:text-[2.6rem]">
              {title}
            </h1>
          </div>
          <p className="mt-6 max-w-3xl text-[1.0625rem] leading-relaxed text-ink-soft">
            {t_(service.summary, locale)}
          </p>
        </div>
      </header>

      <div className="container-page py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <p className="text-[1.0625rem] leading-relaxed text-ink-soft">
              {t_(service.detail, locale)}
            </p>

            <h2 className="mt-10 font-display text-xl font-semibold text-ink">
              {d.common.inclusions}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point.en} className="card-surface flex items-start gap-3 px-4 py-3.5">
                  <Icon
                    name="check"
                    strokeWidth={2.6}
                    className="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                  />
                  <span className="text-sm leading-snug text-ink-soft">{point[locale]}</span>
                </li>
              ))}
            </ul>

            <Reveal className="mt-12">
              <h2 className="font-display text-xl font-semibold text-ink">{d.nav.umrah}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {['economy-umrah', 'silver-umrah', 'delhi-umrah', 'ramadan-special'].map((p) => (
                  <Link
                    key={p}
                    href={`/${locale}/umrah-packages#${p}`}
                    className="rounded-full border border-sand bg-cream px-4 py-2 text-sm text-ink-soft transition-colors hover:border-forest-700/40 hover:text-forest-800"
                  >
                    {locale === 'hi'
                      ? { 'economy-umrah': 'इकॉनॉमी', 'silver-umrah': 'सिल्वर', 'delhi-umrah': 'दिल्ली', 'ramadan-special': 'रमजान स्पेशल' }[p]
                      : { 'economy-umrah': 'Economy', 'silver-umrah': 'Silver', 'delhi-umrah': 'Delhi', 'ramadan-special': 'Ramadan Special' }[p]}
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <aside className="space-y-5">
            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {d.common.official}
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {locale === 'hi'
                  ? 'जानकारी और मौजूदा दर के लिए जालना कार्यालय को कॉल करें।'
                  : 'Call the Jalna office for details and the current rate.'}
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={telHref(site.phone)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {d.common.callUs}
                </a>
                <a
                  href={whatsappHref(enquiryMessage(locale, slug === 'umrah-visa' ? 'visa' : 'general'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-700/25 px-5 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {d.common.whatsappUs}
                </a>
              </div>
            </div>

            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {d.nav.services}
              </h2>
              <ul className="mt-4 space-y-2">
                {others.slice(0, 8).map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/${locale}/services/${other.slug}`}
                      className="flex items-center gap-2.5 text-sm text-ink-soft transition-colors hover:text-forest-700"
                    >
                      <Icon name={other.icon} className="h-4 w-4 shrink-0 text-forest-600" />
                      {other.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}