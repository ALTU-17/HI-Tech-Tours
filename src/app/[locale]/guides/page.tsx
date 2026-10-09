import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { guides } from '@/data/guides'
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
    path: 'guides',
    title: d.guidesPage.title,
    description: d.guidesPage.description,
  })
}

export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/guides`
  const url = absoluteUrl(path)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.guidesPage.title,
        description: d.guidesPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.guides, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.guides, path },
      ]),
      itemListNode(
        d.guidesPage.title,
        guides.map((g) => ({
          name: t_(g.title, locale),
          url: absoluteUrl(`${path}/${g.slug}`),
          description: t_(g.description, locale),
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
              { name: d.nav.guides, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.nav.guides}
            title={d.guidesPage.title}
            lede={d.guidesPage.lede}
            className="mt-6"
          />
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        <ul className="grid gap-5 md:grid-cols-2">
          {guides.map((guide, i) => (
            <Reveal as="li" key={guide.slug} delay={i * 45}>
              <Link
                href={`/${path}/${guide.slug}`}
                className="card-surface card-surface-hover group flex h-full flex-col p-6 sm:p-7"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-100 px-3 py-1 text-[0.68rem] font-semibold text-forest-800">
                    <Icon name="clock" className="h-3 w-3" />
                    <time dateTime={guide.dateModified}>{guide.dateModified}</time>
                  </span>
                  <Icon
                    name="arrow"
                    className="h-4 w-4 text-forest-600 opacity-50 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                  />
                </div>

                <h2 className="mt-4 font-display text-xl leading-snug font-semibold text-ink">
                  {t_(guide.title, locale)}
                </h2>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {t_(guide.description, locale)}
                </p>
                {/* <p className="mt-5 border-t border-sand/70 pt-4 text-sm font-semibold text-forest-700">
                  {d.common.learnMore}
                </p> */}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  )
}