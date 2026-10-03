import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { faqs } from '@/data/faq'
import { packages } from '@/data/packages'
import { site } from '@/data/site'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  breadcrumbNode,
  faqNode,
  itemListNode,
  localBusinessNode,
  offerCatalogNode,
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
    path: 'umrah-packages',
    title: `${d.packagesPage.title} — Jalna, Marathwada`,
    description: d.packagesPage.description,
  })
}

export default async function UmrahPackagesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/umrah-packages`
  const url = absoluteUrl(path)

  const packageFaqs = faqs.slice(0, 4)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.packagesPage.title,
        description: d.packagesPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.packagesPage.title, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.packagesPage.title, path },
      ]),
      offerCatalogNode(
        packages.map((p) => ({
          name: t_(p.badge, locale),
          description: t_(p.summary, locale),
          url: absoluteUrl(`${path}#${p.slug}`),
        })),
      ),
      itemListNode(
        d.packagesPage.title,
        packages.map((p) => ({ name: t_(p.badge, locale), url: absoluteUrl(`${path}#${p.slug}`) })),
      ),
      faqNode(packageFaqs, locale),
    ].filter(Boolean),
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
              { name: d.packagesPage.title, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.sections.packages.eyebrow}
            title={d.packagesPage.title}
            lede={d.packagesPage.lede}
            className="mt-6"
          />
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        <div className="space-y-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} as="article">
              <section id={pkg.slug} className="card-surface scroll-mt-28 overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[1fr_1.15fr]">
                  {/* Left: identity */}
                  <div className="relative border-b border-sand/70 bg-paper-2/50 p-6 sm:p-8 lg:border-r lg:border-b-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl font-semibold text-ink">
                          {t_(pkg.badge, locale)}
                        </h2>
                        <p className="mt-1.5 inline-flex items-center gap-2 rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-800">
                          <Icon name="clock" className="h-3.5 w-3.5" />
                          {t_(pkg.duration, locale)}
                        </p>
                      </div>
                      <span className="font-display text-3xl font-bold text-forest-100 select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {t_(pkg.summary, locale)}
                    </p>

                    <div className="mt-5 rounded-xl border border-forest-700/15 bg-cream p-4">
                      <p className="text-xs font-bold tracking-wider text-forest-700 uppercase">
                        {d.common.idealFor}
                      </p>
                      <p className="mt-1.5 text-sm leading-snug text-ink-soft">
                        {t_(pkg.idealFor, locale)}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-2.5">
                      <a
                        href={telHref(site.phone)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
                      >
                        <Icon name="phone" className="h-4 w-4" />
                        {d.common.callForRate}
                      </a>
                      <a
                        href={whatsappHref(enquiryMessage(locale, 'package'))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-700/25 px-5 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
                      >
                        <Icon name="whatsapp" className="h-4 w-4" />
                        {d.common.whatsappUs}
                      </a>
                    </div>
                  </div>

                  {/* Right: the full, honest breakdown */}
                  <div className="p-6 sm:p-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-forest-700 uppercase">
                          <Icon name="check" strokeWidth={2.6} className="h-4 w-4" />
                          {d.common.inclusions}
                        </h3>
                        <ul className="mt-3.5 space-y-2">
                          {pkg.inclusions.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm leading-snug text-ink-soft"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-plum-600 uppercase">
                          <Icon name="minus" className="h-4 w-4" />
                          {d.common.exclusions}
                        </h3>
                        <ul className="mt-3.5 space-y-2">
                          {pkg.exclusions.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm leading-snug text-ink-muted"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-plum-500/40" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        {/* Pricing note */}
        <Reveal className="mt-12">
          <div className="flex items-start gap-4 rounded-card border border-gold-500/30 bg-gold-100/50 p-6">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">
                {d.packagesPage.noteTitle}
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                {d.packagesPage.note}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Service links — internal linking to the twelve service pages */}
        <Reveal className="mt-12">
          <SectionHeading title={d.sections.pillars.title} kicker={d.nav.services} />
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { slug: 'umrah-visa', key: 'visa' },
              { slug: 'air-ticket', key: 'ticket' },
              { slug: 'hotel', key: 'hotel' },
              { slug: 'ziyarat', key: 'ziyarat' },
            ].map((s) => (
              <Link
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                className="rounded-full border border-sand bg-cream px-4 py-2 text-sm text-ink-soft transition-colors hover:border-forest-700/40 hover:text-forest-800"
              >
                {locale === 'hi' ? SERVICE_LABELS_HI[s.key] : SERVICE_LABELS_EN[s.key]}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  )
}

const SERVICE_LABELS_EN: Record<string, string> = {
  visa: 'Umrah visa',
  ticket: 'Air ticket',
  hotel: 'Hotel',
  ziyarat: 'Ziyarat',
}

const SERVICE_LABELS_HI: Record<string, string> = {
  visa: 'उमरा वीज़ा',
  ticket: 'एयर टिकट',
  hotel: 'होटल',
  ziyarat: 'ज़ियारत',
}