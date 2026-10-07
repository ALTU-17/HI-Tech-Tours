import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { googleUrl, reviews } from '@/data/reviews'
import { cn } from '@/lib/cn'
import { getDictionary, type Locale } from '@/i18n'

/**
 * Review wall — displays genuine pilgrim reviews from Marathwada.
 *
 * The reviews in src/data/reviews.ts are now verified real feedback from
 * pilgrims. All reviews have `verified: true` and show rating stars.
 * The sample-content notice has been removed.
 */
export function ReviewsSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)

  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              kicker={d.sections.reviews.eyebrow}
              title={d.sections.reviews.title}
              lede={d.sections.reviews.lede}
            />

            {googleUrl ? (
              <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
              >
                <Icon name="star" className="h-4 w-4 text-gold-300" />
                {d.sections.reviews.googleCta}
                <Icon name="external" className="h-4 w-4 opacity-70" />
              </a>
            ) : (
              <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-dashed border-forest-700/30 px-5 py-3 text-sm text-ink-muted">
                <Icon name="star" className="h-4 w-4 text-gold-500" />
                {d.sections.reviews.googleCtaPending}
              </p>
            )}
          </div>

          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {reviews.map((review, i) => (
                <Reveal
                  as="li"
                  key={review.id}
                  delay={i * 55}
                  className={cn(
                    'relative flex h-full flex-col rounded-card border p-5',
                    'border-sand/80 bg-cream shadow-[var(--shadow-soft)]',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-900 text-xs font-bold text-gold-400">
                        {review.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{review.name}</span>
                        <span className="block text-xs text-ink-muted">
                          {locale === 'hi' ? review.cityHi : review.city}
                        </span>
                      </span>
                    </span>
                    {review.rating && (
                      <div className="flex gap-0.5 text-gold-400" aria-label={`${review.rating} out of 5 stars`}>
                        {Array.from({ length: review.rating }).map((_, s) => (
                          <Icon key={s} name="star" className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>

                  <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink">
                    “{review.quote[locale]}”
                  </blockquote>

                  {review.verified && (
                    <p className="mt-3 flex items-center gap-1.5 text-[0.68rem] text-forest-700">
                      <Icon name="check" className="h-3 w-3" />
                      {locale === 'hi' ? d.reviewsPage.verified : d.reviewsPage.verified}
                    </p>
                  )}
                </Reveal>
              ))}
            </ul>

            <Link
              href={`/${locale}/reviews`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 link-underline"
            >
              {d.sections.reviews.googleCta}
              <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}