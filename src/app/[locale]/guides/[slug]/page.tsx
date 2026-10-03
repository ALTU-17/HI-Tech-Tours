import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs } from '@/components/ui/SectionHeading'
import { guides } from '@/data/guides'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  articleNode,
  breadcrumbNode,
  localBusinessNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from '@/lib/schema'
import { getDictionary, isLocale, locales, t_ } from '@/i18n'

export function generateStaticParams() {
  return locales.flatMap((locale) => guides.map((guide) => ({ locale, slug: guide.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return {}

  return buildMetadata({
    locale,
    path: `guides/${slug}`,
    title: t_(guide.title, locale),
    description: t_(guide.description, locale),
    type: 'article',
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
  })
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/guides/${slug}`
  const url = absoluteUrl(path)
  const others = guides.filter((g) => g.slug !== slug)

  const readingMins = Math.max(
    1,
    Math.round(
      guide.sections.reduce((sum, s) => sum + s.body[locale].join(' ').split(/\s+/).length, 0) / 200,
    ),
  )

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: t_(guide.title, locale),
        description: t_(guide.description, locale),
        url,
        locale,
        dateModified: guide.dateModified,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.guides, path: `/${locale}/guides` },
          { name: t_(guide.title, locale), path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.guides, path: `/${locale}/guides` },
        { name: t_(guide.title, locale), path },
      ]),
      articleNode({
        headline: t_(guide.title, locale),
        description: t_(guide.description, locale),
        url,
        datePublished: guide.datePublished,
        dateModified: guide.dateModified,
        inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
      }),
    ],
  }

  return (
    <>
      <JsonLd data={graph} />

      <article>
        <header className="relative overflow-hidden border-b border-sand/70 bg-gradient-to-b from-forest-100/50 to-paper py-14 sm:py-18">
          <div className="pointer-events-none absolute inset-0 bg-lattice opacity-25 mask-fade-b" aria-hidden="true" />
          <div className="relative container-page">
            <Breadcrumbs
              trail={[
                { name: d.nav.home, href: `/${locale}` },
                { name: d.nav.guides, href: `/${locale}/guides` },
                { name: t_(guide.title, locale), href: path },
              ]}
            />

            <h1 className="mt-6 max-w-3xl font-display text-[2rem] leading-[1.15] font-semibold text-ink sm:text-[2.6rem]">
              {t_(guide.title, locale)}
            </h1>

            {/* Freshness signals — deliberately visible, not buried in metadata. */}
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-3.5 w-3.5 text-forest-600" />
                {readingMins} {d.common.readingTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="check" className="h-3.5 w-3.5 text-forest-600" />
                {d.common.lastUpdated}:{' '}
                <time dateTime={guide.dateModified}>{guide.dateModified}</time>
              </span>
            </p>

            {/* The quotable one-sentence answer. */}
            <div className="mt-8 max-w-3xl rounded-card border-l-4 border-gold-500 bg-cream p-6">
              <p className="text-[1.0625rem] leading-relaxed font-medium text-ink">
                {t_(guide.answer, locale)}
              </p>
            </div>
          </div>
        </header>

        <div className="container-page py-14 sm:py-18">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
            <div className="space-y-10">
              {guide.sections.map((section, i) => (
                <Reveal key={section.heading.en} delay={i * 40}>
                  <section>
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      {section.heading[locale]}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.body[locale].map((paragraph, p) => (
                        <p key={p} className="text-[1.0625rem] leading-relaxed text-ink-soft">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}

              {/* Answer-shaped closing CTA. */}
              <Reveal className="rounded-card bg-forest-950 p-7 text-paper">
                <h2 className="font-display text-xl font-semibold">{d.cta.title}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/70">
                  {d.cta.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
                  >
                    {d.cta.primary}
                    <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                  <Link
                    href={`/${locale}/umrah-packages`}
                    className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-paper/60"
                  >
                    {d.nav.umrah}
                    <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <aside>
              <div className="card-surface sticky top-24 p-6">
                <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                  {d.nav.guides}
                </h2>
                <ul className="mt-4 space-y-3">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/${locale}/guides/${other.slug}`}
                        className="group flex items-start gap-2 text-sm text-ink-soft transition-colors hover:text-forest-700"
                      >
                        <Icon
                          name="arrow"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                        />
                        {t_(other.title, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  )
}