import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { marathwada } from '@/data/locations'
import { pillars } from '@/data/journey'
import { getDictionary, t_, type Locale } from '@/i18n'

/**
 * Marathwada coverage.
 *
 * This grid is the highest-value asset on the site: nine genuinely distinct
 * district landing pages, each internally linked from here, from the footer and
 * from the nav. It is what turns "we serve the region" into pages that can rank
 * for "Umrah from Latur" and its eight equivalents.
 */
export function CoverageSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)

  return (
    <section id="coverage" className="relative overflow-hidden bg-paper-2 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-lattice opacity-20 mask-fade-b" aria-hidden="true" />

      <div className="relative container-page">
        <SectionHeading
          kicker={d.sections.coverage.eyebrow}
          title={d.sections.coverage.title}
          lede={d.sections.coverage.lede}
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {marathwada.map((loc, i) => {
            const nearest = loc.airports[0]
            return (
              <Reveal as="li" key={loc.slug} delay={i * 45}>
                <Link
                  href={`/${locale}/locations/${loc.slug}`}
                  className="card-surface card-surface-hover group flex h-full items-center justify-between gap-4 px-5 py-5"
                >
                  <span className="min-w-0">
                    <span className="block text-[1.0625rem] font-semibold text-ink">
                      {t_({ en: loc.name, hi: loc.nameHi }, locale)}
                    </span>
                    <span className="mt-1.5 flex items-center gap-2 text-xs text-ink-muted">
                      <Icon name="plane2" className="h-3.5 w-3.5 text-forest-600" />
                      <span className="tabular">
                        {nearest.code}
                        {nearest.distanceKm > 0 ? ` · ${nearest.distanceKm} km` : ''}
                      </span>
                    </span>
                  </span>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-700/20 text-forest-700 transition-all duration-300 group-hover:border-forest-700 group-hover:bg-forest-800 group-hover:text-paper"
                    aria-hidden="true"
                  >
                    <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/locations`}
            className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-6 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
          >
            {d.common.viewAll}
            <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Trust pillars.
 *
 * Each pillar pairs a claim with the mechanism behind it. A promise with no
 * mechanism is what aggregator sites win on — so the proof line is not optional
 * decoration, it is the argument.
 */
export function PillarsSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)

  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          kicker={d.sections.pillars.eyebrow}
          title={d.sections.pillars.title}
          lede={d.sections.pillars.lede}
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title.en}
              delay={i * 60}
              className="card-surface card-surface-hover relative overflow-hidden p-7"
            >
              <span
                className="pointer-events-none absolute -top-6 -right-3 font-display text-[5rem] leading-none font-bold text-forest-100 select-none"
                aria-hidden="true"
              >
                {i + 1}
              </span>

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-100">
                    <Icon name="shield" className="h-4.5 w-4.5 text-forest-700" />
                  </span>
                  <h3 className="text-lg font-semibold text-ink">{pillar.title[locale]}</h3>
                </div>

                <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {pillar.body[locale]}
                </p>

                <p className="mt-4 flex items-start gap-2.5 border-t border-sand/70 pt-4 text-sm text-forest-700">
                  <Icon name="check" strokeWidth={2.4} className="mt-0.5 h-4 w-4 shrink-0" />
                  <span className="leading-snug">{pillar.proof[locale]}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}