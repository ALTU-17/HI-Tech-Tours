import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { googleUrl, reviews, verifiedReviews } from '@/data/reviews'
import { site } from '@/data/site'
import { telHref } from '@/lib/contact'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  breadcrumbNode,
  localBusinessNode,
  organizationNode,
  reviewNode,
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
    path: 'reviews',
    title: d.reviewsPage.title,
    description: d.reviewsPage.description,
  })
}

export default async function ReviewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/reviews`
  const url = absoluteUrl(path)

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.reviewsPage.title,
        description: d.reviewsPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.reviews, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.reviews, path },
      ]),
      // Returns null until genuine reviews exist — see lib/schema.ts.
      reviewNode(verifiedReviews, locale),
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
              { name: d.nav.reviews, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.sections.reviews.eyebrow}
            title={d.reviewsPage.title}
            lede={d.reviewsPage.lede}
            className="mt-6"
          />
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        {/* Verified reviews section */}
        <Reveal>
          <div className="flex flex-col gap-6 rounded-card bg-forest-950 p-7 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-semibold">{d.reviewsPage.googleTitle}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/70">
                {d.reviewsPage.googleBody}
              </p>
            </div>
            {googleUrl ? (
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
              >
                <Icon name="star" className="h-4 w-4" />
                {d.sections.reviews.googleCta}
              </a>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-dashed border-paper/25 px-5 py-3 text-sm text-paper/60">
                <Icon name="star" className="h-4 w-4 text-gold-400" />
                {d.sections.reviews.googleCtaPending}
              </span>
            )}
          </div>
        </Reveal>

        {/* Sample wall */}
        <div className="mt-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal as="li" key={review.id} delay={i * 45}>
                <figure className="card-surface flex h-full flex-col p-6">
                  <figcaption className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-100 text-sm font-bold text-forest-800">
                        {review.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{review.name}</span>
                        <span className="block text-xs text-ink-muted">
                          {locale === 'hi' ? review.cityHi : review.city}
                        </span>
                      </span>
                    </span>
                    {!review.verified && (
                      <span className="shrink-0 rounded-full bg-sand/70 px-2.5 py-1 text-[0.6rem] font-bold tracking-wider text-ink-muted uppercase">
                        {d.home.reviewSampleChip}
                      </span>
                    )}
                  </figcaption>
                  <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                    “{review.quote[locale]}”
                  </blockquote>
                  {review.rating && (
                    <p className="mt-4 flex gap-0.5 text-gold-500">
                      {Array.from({ length: review.rating }).map((_, s) => (
                        <Icon key={s} name="star" className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </p>
                  )}
                </figure>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 flex items-start gap-3 rounded-xl border border-dashed border-forest-700/25 bg-forest-100/25 p-5 text-sm leading-relaxed text-ink-muted">
            <Icon name="shield" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-forest-600" />
            {d.reviewsPage.sampleNote}
          </p>
        </div>

        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-[0.9375rem] text-ink-soft">{d.cta.body}</p>
            <a
              href={telHref(site.phone)}
              className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
            >
              <Icon name="phone" className="h-4 w-4" />
              {d.cta.primary}
            </a>
          </div>
        </Reveal>
      </div>
    </>
  )
}