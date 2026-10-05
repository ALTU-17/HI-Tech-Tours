import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BranchesSection, CtaBand } from '@/components/home/Branches'
import { CoverageSection, PillarsSection } from '@/components/home/Coverage'
import { Hero } from '@/components/home/Hero'
import { InclusionsSection, JourneySection } from '@/components/home/Inclusions'
import { PackagesSection } from '@/components/home/Packages'
import { ReviewsSection } from '@/components/home/Reviews'
import { JsonLd } from '@/components/seo/JsonLd'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { faqs } from '@/data/faq'
import { site } from '@/data/site'
import { buildMetadata, absoluteUrl } from '@/lib/seo'
import {
  articleNode,
  breadcrumbNode,
  faqNode,
  itemListNode,
  offerCatalogNode,
  organizationNode,
  localBusinessNode,
  reviewNode,
  serviceNode,
  webPageNode,
  websiteNode,
} from '@/lib/schema'
import { verifiedReviews } from '@/data/reviews'
import { getDictionary, isLocale, locales } from '@/i18n'

/**
 * One home page per language. `output: 'export'` requires every page that sits
 * under a dynamic segment to enumerate its own params — the root layout's
 * generateStaticParams does not cover this page.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

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
    path: '',
    title: d.meta.title,
    description: d.meta.description,
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const url = absoluteUrl(`/${locale}`)

  // Only the four featured questions get FAQPage markup on the home page; the
  // rest live on /faq where they are all visibly rendered.
  const homeFaqs = faqs.slice(0, 4)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.meta.title,
        description: d.meta.description,
        url,
        locale,
        breadcrumbs: [{ name: d.nav.home, path: `/${locale}` }],
      }),
      breadcrumbNode([{ name: d.nav.home, path: `/${locale}` }]),
      offerCatalogNode(
        // Prices are intentionally absent — see lib/schema.ts.
        ['economy-umrah', 'silver-umrah', 'delhi-umrah', 'ramadan-special'].map((slug) => ({
          name: `Umrah package: ${slug.replace(/-/g, ' ')}`,
          description: site.shortDescription,
          url: absoluteUrl(`/${locale}/umrah-packages#${slug}`),
        })),
      ),
      itemListNode(
        d.sections.packages.title,
        [
          { name: 'Economy Umrah', url: absoluteUrl(`/${locale}/umrah-packages#economy-umrah`) },
          { name: 'Silver Umrah', url: absoluteUrl(`/${locale}/umrah-packages#silver-umrah`) },
          { name: 'Delhi Umrah', url: absoluteUrl(`/${locale}/umrah-packages#delhi-umrah`) },
          { name: 'Ramadan Umrah Special', url: absoluteUrl(`/${locale}/umrah-packages#ramadan-special`) },
        ],
      ),
      serviceNode({
        name: 'Hajj and Umrah travel services',
        description: site.shortDescription,
        url: absoluteUrl(`/${locale}/services`),
      }),
      faqNode(homeFaqs, locale),
      reviewNode(verifiedReviews, locale),
      articleNode({
        headline: d.hero.titleTop + ' ' + d.hero.titleBottom,
        description: d.hero.subtitle,
        url,
        datePublished: '2026-01-01',
        dateModified: '2026-10-01',
        inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
      }),
    ].filter(Boolean),
  }

  return (
    <>
      <JsonLd data={graph} />

      <Hero locale={locale} />
      <PackagesSection locale={locale} />
      <InclusionsSection locale={locale} />
      <JourneySection locale={locale} />
      <PillarsSection locale={locale} />
      <CoverageSection locale={locale} />
      <ReviewsSection locale={locale} />

      <section className="py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            kicker={d.sections.faq.eyebrow}
            title={d.sections.faq.title}
            lede={d.sections.faq.lede}
            align="center"
          />
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={homeFaqs} locale={locale} />
          </Reveal>
          <div className="mt-8 flex justify-center">
            <a
              href={`/${locale}/faq`}
              className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-6 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
            >
              {d.sections.faq.more}
              <IconArrow />
            </a>
          </div>
        </div>
      </section>

      <BranchesSection locale={locale} />
      <CtaBand locale={locale} />
    </>
  )
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h13M13 6.5l5.5 5.5L13 17.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}