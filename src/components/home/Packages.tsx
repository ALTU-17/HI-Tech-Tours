import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredPackages, packages } from '@/data/packages'
import { cn } from '@/lib/cn'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
import { site } from '@/data/site'
import { getDictionary, t_, type Locale } from '@/i18n'

function PackageCard({
  pkg,
  locale,
  index,
  highlighted,
}: {
  pkg: (typeof packages)[number]
  locale: Locale
  index: number
  highlighted?: boolean
}) {
  const d = getDictionary(locale)

  return (
    <Reveal
      delay={index * 70}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-card border p-6 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
        highlighted
          ? 'border-forest-700/25 bg-forest-950 text-paper shadow-[var(--shadow-lift)] hover:-translate-y-1.5'
          : 'card-surface card-surface-hover hover:-translate-y-1.5',
      )}
    >
      {highlighted && (
        <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.07]" aria-hidden="true" />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h3
            className={cn(
              'font-display text-xl font-semibold',
              highlighted ? 'text-paper' : 'text-ink',
            )}
          >
            {t_(pkg.badge, locale)}
          </h3>
          <p
            className={cn(
              'mt-1 text-xs font-semibold tracking-wider uppercase',
              highlighted ? 'text-gold-300' : 'text-forest-600',
            )}
          >
            {t_(pkg.duration, locale)}
          </p>
        </div>
        {highlighted && (
          <span className="shrink-0 rounded-full bg-gold-500 px-2.5 py-1 text-[0.62rem] font-bold tracking-wider text-forest-950 uppercase">
            {locale === 'hi' ? 'लोकप्रिय' : 'Popular'}
          </span>
        )}
      </div>

      <p
        className={cn(
          'relative mt-4 text-[0.9375rem] leading-relaxed',
          highlighted ? 'text-paper/75' : 'text-ink-soft',
        )}
      >
        {t_(pkg.summary, locale)}
      </p>

      <div className={cn('relative mt-5 border-t pt-4', highlighted ? 'border-paper/12' : 'border-sand/80')}>
        <p
          className={cn(
            'text-xs font-semibold tracking-wider uppercase',
            highlighted ? 'text-gold-300' : 'text-forest-700',
          )}
        >
          {d.common.inclusions}
        </p>
        <ul className="mt-3 space-y-2">
          {pkg.inclusions.slice(0, 6).map((item) => (
            <li
              key={item}
              className={cn(
                'flex items-start gap-2 text-sm leading-snug',
                highlighted ? 'text-paper/80' : 'text-ink-soft',
              )}
            >
              <Icon
                name="check"
                strokeWidth={2.4}
                className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', highlighted ? 'text-gold-300' : 'text-forest-600')}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {pkg.inclusions.length > 6 && (
          <p className={cn('mt-3 text-xs', highlighted ? 'text-paper/45' : 'text-ink-muted')}>
            + {pkg.inclusions.length - 6} {locale === 'hi' ? 'और' : 'more'}
          </p>
        )}
      </div>

      <div className="relative mt-auto pt-6">
        <Link
          href={`/${locale}/umrah-packages#${pkg.slug}`}
          className={cn(
            'inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.98]',
            highlighted
              ? 'bg-gold-500 text-forest-950 hover:bg-gold-400'
              : 'border border-forest-700/25 text-forest-800 hover:border-forest-700/60 hover:bg-forest-100/60',
          )}
        >
          {d.common.callForRate}
          <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
      </div>
    </Reveal>
  )
}

export function PackagesSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)

  return (
    <section id="packages" className="relative py-20 sm:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            kicker={d.sections.packages.eyebrow}
            title={d.sections.packages.title}
            lede={d.sections.packages.lede}
          />
          <a
            href={telHref(site.phone)}
            className="hidden items-center gap-2 rounded-full border border-forest-700/25 px-5 py-2.5 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60 sm:inline-flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {d.common.callUs}
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} locale={locale} index={i} highlighted={i === 1} />
          ))}
        </div>

        {/* Every remaining package, listed compactly. */}
        <Reveal className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {packages
            .filter((p) => !p.featured)
            .map((pkg) => (
              <Link
                key={pkg.slug}
                href={`/${locale}/umrah-packages#${pkg.slug}`}
                className="card-surface card-surface-hover flex items-center justify-between gap-3 px-5 py-4"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {t_(pkg.badge, locale)}
                  </span>
                  <span className="block truncate text-xs text-ink-muted">
                    {t_(pkg.duration, locale)}
                  </span>
                </span>
                <Icon name="arrow" className="h-4 w-4 shrink-0 text-forest-600 rtl:-scale-x-100" />
              </Link>
            ))}
          <a
            href={whatsappHref(enquiryMessage(locale, 'package'))}
            target="_blank"
            rel="noopener noreferrer"
            className="card-surface card-surface-hover flex items-center justify-between gap-3 bg-forest-100/40 px-5 py-4"
          >
            <span className="flex items-center gap-2.5 text-sm font-semibold text-forest-800">
              <Icon name="whatsapp" className="h-4 w-4" />
              {d.home.heroCtaSecondary}
            </span>
            <Icon name="arrow" className="h-4 w-4 shrink-0 text-forest-600 rtl:-scale-x-100" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}