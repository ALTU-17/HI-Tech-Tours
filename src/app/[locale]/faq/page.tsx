import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { faqs } from '@/data/faq'
import { site } from '@/data/site'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  breadcrumbNode,
  faqNode,
  localBusinessNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from '@/lib/schema'
import { getDictionary, isLocale } from '@/i18n'

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
    path: 'faq',
    title: d.faqPage.title,
    description: d.faqPage.description,
  })
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/faq`
  const url = absoluteUrl(path)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.faqPage.title,
        description: d.faqPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.faq, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.faq, path },
      ]),
      // Every question is visible on this page, so every one may be marked up.
      faqNode(faqs, locale),
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
              { name: d.nav.faq, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.sections.faq.eyebrow}
            title={d.faqPage.title}
            lede={d.faqPage.lede}
            className="mt-6"
          />
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
          <div>
            <FaqAccordion items={faqs} locale={locale} defaultOpen={0} />
          </div>

          <aside className="space-y-5">
            <div className="card-surface p-6">
              <h2 className="font-display text-lg font-semibold text-ink">{d.cta.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{d.cta.body}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <a
                  href={telHref(site.phone)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {d.cta.primary}
                </a>
                <a
                  href={whatsappHref(enquiryMessage(locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-700/25 px-5 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {d.cta.secondary}
                </a>
              </div>
            </div>

            <Reveal>
              <div className="card-surface p-6">
                <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                  {d.nav.guides}
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    { slug: 'haj-vs-umrah', en: 'Haj vs Umrah', hi: 'हज बनाम उमरा' },
                    { slug: 'umrah-visa-for-indians', en: 'Umrah visa rules', hi: 'उमरा वीज़ा नियम' },
                    { slug: 'choosing-an-umrah-package', en: 'Choosing a package', hi: 'पैकेज कैसे चुनें' },
                    { slug: 'what-to-pack-for-umrah', en: 'What to pack', hi: 'क्या सामान लें' },
                  ].map((guide) => (
                    <li key={guide.slug}>
                      <Link
                        href={`/${locale}/guides/${guide.slug}`}
                        className="flex items-center gap-2 text-ink-soft transition-colors hover:text-forest-700"
                      >
                        {locale === 'hi' ? guide.hi : guide.en}
                        <Icon name="arrow" className="h-3.5 w-3.5 opacity-50 rtl:-scale-x-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </>
  )
}