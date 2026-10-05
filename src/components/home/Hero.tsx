import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { featuredPackages, packages } from '@/data/packages'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
import { getDictionary, t_, type Locale } from '@/i18n'

/**
 * Hero.
 *
 * Light rather than dark on purpose: the header sits above it, and a translucent
 * header over a dark hero would force either unreadable chrome or a JS-driven
 * colour flip that breaks without JavaScript. Contrast comes from the gradient
 * wash and the dark package card instead.
 */
export function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const stats = [
    { value: '9', label: d.hero.stat1Label },
    { value: '8', label: d.hero.stat2Label },
    { value: '3', label: d.hero.stat3Label },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Layered background: lattice, emerald wash, gold bloom. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-100/55 via-paper to-paper" />
        <div className="absolute inset-0 bg-lattice opacity-[0.35] mask-fade-b" />
        <div className="absolute -top-40 -right-32 h-[38rem] w-[38rem] rounded-full bg-forest-300/35 blur-[130px]" />
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-gold-300/40 blur-[120px]" />
      </div>

      {/*
        `lg:pt-0` drops the desktop top padding. The header is `sticky`, not
        `fixed`, so it already occupies its own space in flow — the extra 6rem
        was pure breathing room and pushed the hero content well down the fold.
        Mobile and tablet keep their padding, where vertical space matters more.
      */}
      <div className="container-page grid items-center gap-14 pt-14 pb-8 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-16 lg:pt-12">
        <div>
          <p className="kicker">{d.hero.eyebrow}</p>

          <h1 className="mt-5 text-[2.4rem] leading-[1.06] text-ink sm:text-[3.3rem] lg:text-[4rem]">
            {d.hero.titleTop}{' '}
            <span className="bg-gradient-to-r from-forest-700 via-forest-600 to-gold-600 bg-clip-text text-transparent">
              {d.hero.titleBottom}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
            {d.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={telHref(site.phone)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-forest-800 px-7 py-4 text-[0.9375rem] font-semibold text-paper shadow-[0_16px_38px_-14px_rgb(6_46_34/0.65)] transition-all duration-300 hover:bg-forest-700 active:scale-[0.98]"
            >
              <Icon name="phone" className="h-4.5 w-4.5" />
              {d.home.heroCtaPrimary}
            </a>
            <a
              href={whatsappHref(enquiryMessage(locale, 'package'))}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-forest-700/25 bg-cream/70 px-7 py-4 text-[0.9375rem] font-semibold text-forest-800 transition-all duration-300 hover:border-forest-700/60 hover:bg-forest-100/60 active:scale-[0.98]"
            >
              <Icon name="whatsapp" className="h-4.5 w-4.5" />
              {d.home.heroCtaSecondary}
            </a>
          </div>

          {/* Trust chips */}
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
            {d.hero.chips.map((chip) => (
              <li key={chip} className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon name="check" className="h-4 w-4 text-forest-600" strokeWidth={2.2} />
                {chip}
              </li>
            ))}
          </ul>

          {/* Stats */}
          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4 border-t border-sand/80 pt-0">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 mt-1 text-xs leading-snug text-ink-muted">{stat.label}</dt>
                <dd className="font-display text-[2.2rem] leading-none font-bold text-forest-800 tabular">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Package snapshot card — the dark mass that gives the hero weight. */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-forest-600/25 to-gold-400/25 blur-2xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-hero bg-forest-950 text-paper shadow-[var(--shadow-lift)]">
            <div className="relative p-6 sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.07]" aria-hidden="true" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">
                    {d.sections.packages.eyebrow}
                  </p>
                  <span className="rounded-full border border-gold-500/30 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-gold-300 uppercase">
                    {locale === 'hi' ? 'ऑन-रिक्वेस्ट' : 'On request'}
                  </span>
                </div>

                <ul className="mt-5 space-y-1">
                  {packages.slice(0, 6).map((pkg, i) => (
                    <li
                      key={pkg.slug}
                      className={cn(
                        'flex items-center justify-between gap-4 rounded-xl px-3.5 py-3 transition-colors',
                        i === 0 ? 'bg-paper/10' : 'hover:bg-paper/6',
                      )}
                    >
                      <Link
                        href={`/${locale}/umrah-packages#${pkg.slug}`}
                        className="flex min-w-0 items-center gap-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/30 font-display text-xs font-bold text-gold-300">
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-paper">
                            {t_(pkg.badge, locale)}
                          </span>
                          <span className="block truncate text-xs text-paper/55">
                            {t_(pkg.duration, locale)}
                          </span>
                        </span>
                      </Link>
                      <Icon
                        name="arrow"
                        className="h-4 w-4 shrink-0 text-gold-300/60 rtl:-scale-x-100"
                      />
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-paper/12 pt-5">
                  <p className="text-xs text-paper/50">{d.sections.packages.lede}</p>
                  <Link
                    href={`/${locale}/umrah-packages`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300 transition-colors hover:text-gold-200"
                  >
                    {d.common.viewAll}
                    <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-y border-sand/70 bg-cream/70">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-3.5 text-center text-[0.8125rem] font-medium text-ink-soft">
          <span className="flex items-center gap-2">
            <Icon name="shield" className="h-4 w-4 text-forest-600" />
            {locale === 'hi' ? 'हज कमेटी ऑफ इंडिया मार्ग' : 'Haj Committee of India route'}
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-sand sm:block" />
          <span className="flex items-center gap-2">
            <Icon name="pin" className="h-4 w-4 text-forest-600" />
            {locale === 'hi' ? 'अउरंगाबाद मुख्य कार्यालय' : 'Aurangabad head office'}
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-sand sm:block" />
          <span className="flex items-center gap-2">
            <Icon name="clock" className="h-4 w-4 text-forest-600" />
            {locale === 'hi' ? 'उसी दिन जवाब' : 'Same-day reply'}
          </span>
        </div>
      </div>
    </section>
  )
}

export { featuredPackages }