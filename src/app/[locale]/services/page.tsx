import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'
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
    path: 'services',
    title: d.servicesPage.title,
    description: d.servicesPage.description,
  })
}

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/services`
  const url = absoluteUrl(path)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.servicesPage.title,
        description: d.servicesPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.services, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.services, path },
      ]),
      itemListNode(
        d.servicesPage.title,
        services.map((s) => ({
          name: s.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          url: absoluteUrl(`${path}/${s.slug}`),
          description: t_(s.summary, locale),
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
              { name: d.nav.services, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.nav.services}
            title={d.servicesPage.title}
            lede={d.servicesPage.lede}
            className="mt-6"
          />
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const title = service.slug
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase())
            return (
              <Reveal as="li" key={service.slug} delay={i * 35}>
                <Link
                  href={`/${path}/${service.slug}`}
                  className="card-surface card-surface-hover group flex h-full flex-col p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-100 text-forest-800">
                    <Icon name={service.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h2 className="mt-5 font-display text-lg font-semibold text-ink">{title}</h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
                    {t_(service.summary, locale)}
                  </p>
                  <span className="mt-5 flex items-center gap-2 border-t border-sand/70 pt-4 text-sm font-semibold text-forest-700">
                    {d.common.learnMore}
                    <Icon
                      name="arrow"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="mt-14">
          <div className="flex flex-col items-center gap-4 rounded-card bg-forest-950 px-6 py-12 text-center text-paper">
            <h2 className="font-display text-2xl font-semibold">{d.servicesPage.title}</h2>
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-paper/70">{d.servicesPage.lede}</p>
            <Link
              href={`/${locale}/umrah-packages`}
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
            >
              {d.sections.packages.eyebrow}
              <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  )
}