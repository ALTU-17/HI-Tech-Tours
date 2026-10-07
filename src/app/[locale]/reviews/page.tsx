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

        {/* Review wall — two-column grid of real pilgrim feedback */}
        <div className="mt-12">
          {/* Section intro */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-sm font-medium text-forest-700">
              {d.reviewsPage.introduction}
            </p>
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal as="li" key={review.id} delay={i * 50}>
                <article className="card-surface h-full flex flex-col p-6">
                  {/* Review header with avatar and name */}
                  <header className="flex items-start justify-between gap-4 pb-4 border-b border-sand/60">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-900 text-lg font-bold text-gold-400 shadow-sm">
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <cite className="not-italic text-sm font-semibold text-ink">
                          {review.name}
                        </cite>
                        <p className="mt-0.5 text-xs text-ink-muted">
                          {locale === 'hi' ? review.cityHi : review.city}
                        </p>
                      </div>
                    </div>
                    {/* Rating stars */}
                    {review.rating && (
                      <div className="flex gap-0.5 text-gold-400" aria-label={`${review.rating} out of 5 stars`}>
                        {Array.from({ length: review.rating }).map((_, s) => (
                          <Icon
                            key={s}
                            name="star"
                            className="h-4 w-4 fill-current"
                          />
                        ))}
                      </div>
                    )}
                  </header>

                  {/* Review body — larger, more readable */}
                  <blockquote className="mt-4 flex-1 text-[1rem] leading-relaxed text-ink">
                    <p>“{review.quote[locale]}”</p>
                  </blockquote>

                  {/* Verified badge for verified reviews */}
                  {review.verified && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-forest-700">
                      <Icon name="shield" className="h-3.5 w-3.5 shrink-0" />
                      <span>{d.reviewsPage.verified}</span>
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </ul>

          {/* Trust note — uplifting, specific to Marathwada */}
          <div className="mt-10 rounded-xl border border-forest-700/20 bg-forest-950/50 p-6 sm:p-8 text-center sm:text-left">
            <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink-soft sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Icon name="shield" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-forest-600" />
                <span>
                  {locale === 'hi'
                    ? 'ये समीक्षाएँ मराठवाड़ा के जायरीनों की वास्तविक EXPERIENCE हैं — हमारे साथ यात्रा कर चुके लोगों की असल評論ं।'
                    : 'These reviews are the real experiences of Marathwada pilgrims who travelled with us — genuine feedback from people who have been there.'}
                </span>
              </div>
              {googleUrl && (
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
                >
                  <Icon name="external" className="h-3.5 w-3.5" />
                  {d.reviewsPage.readOnGoogle}
                </a>
              )}
            </div>
          </div>
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