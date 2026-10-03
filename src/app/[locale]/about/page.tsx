import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'
import { telHref } from '@/lib/contact'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  breadcrumbNode,
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
    path: 'about',
    title: d.aboutPage.title,
    description: d.aboutPage.description,
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/about`
  const url = absoluteUrl(path)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.aboutPage.title,
        description: d.aboutPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.about, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.about, path },
      ]),
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
              { name: d.nav.about, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.nav.about}
            title={d.aboutPage.title}
            lede={d.aboutPage.lede}
            className="mt-6"
          />
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {d.aboutPage.storyTitle}
            </h2>
            <div className="mt-6 space-y-5">
              {d.aboutPage.story.map((paragraph, i) => (
                <Reveal key={i} delay={i * 50}>
                  <p className="text-[1.0625rem] leading-relaxed text-ink-soft">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">
                {d.aboutPage.principlesTitle}
              </h2>
              <ul className="mt-6 space-y-3">
                {d.aboutPage.principles.map((principle) => (
                  <li
                    key={principle}
                    className="flex items-start gap-3 rounded-xl border border-plum-600/15 bg-plum-100/30 px-4 py-3.5 text-[0.9375rem] leading-relaxed text-ink-soft"
                  >
                    <Icon name="shield" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-plum-600" />
                    {principle}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="font-display text-2xl font-semibold text-ink">
                {d.aboutPage.teamTitle}
              </h2>
              <p className="mt-3 text-[0.9375rem] text-ink-muted">{d.aboutPage.teamLede}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {site.branches.map((branch) => (
                  <li key={branch.id}>
                    <a
                      href={telHref(branch.phone)}
                      className="card-surface card-surface-hover flex items-center justify-between gap-3 px-4 py-3.5"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">
                          {t_({ en: branch.person, hi: branch.personHi }, locale)}
                        </span>
                        <span className="block truncate text-xs text-ink-muted">
                          {t_({ en: branch.locality, hi: branch.localityHi }, locale)}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-forest-800 tabular">
                        {branch.phone}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="space-y-5">
            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {d.locationsPage.nearestAirport}
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-ink-muted">
                    {site.locality}
                  </dt>
                  <dd className="font-medium text-ink">
                    {site.locality}, {site.region} {site.postalCode}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{d.common.whatsappUs}</dt>
                  <dd>
                    <a href={telHref(site.phone)} className="font-semibold text-forest-800 tabular link-underline">
                      +91 {site.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {d.nav.guides}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { slug: 'haj-vs-umrah', en: 'Haj vs Umrah', hi: 'हज बनाम उमरा' },
                  { slug: 'umrah-visa-for-indians', en: 'Umrah visa for Indians', hi: 'भारतीयों के लिए उमरा वीज़ा' },
                  { slug: 'choosing-an-umrah-package', en: 'Choosing a package', hi: 'पैकेज कैसे चुनें' },
                  { slug: 'umrah-from-marathwada', en: 'Umrah from Marathwada', hi: 'मराठवाड़ा से उमरा' },
                  { slug: 'what-to-pack-for-umrah', en: 'What to pack', hi: 'क्या सामान लें' },
                ].map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/${locale}/guides/${guide.slug}`}
                      className="flex items-center gap-2 text-ink-soft transition-colors hover:text-forest-700"
                    >
                      {t_({ en: guide.en, hi: guide.hi }, locale)}
                      <Icon name="arrow" className="h-3.5 w-3.5 opacity-50 rtl:-scale-x-100" />
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