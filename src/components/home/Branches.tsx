import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'
import { enquiryMessage, mapEmbedUrl, telHref, whatsappHref } from '@/lib/contact'
import { getDictionary, t_, type Locale } from '@/i18n'

export function BranchesSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const office = site.offices[0]

  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          kicker={d.sections.branches.eyebrow}
          title={d.sections.branches.title}
          lede={d.sections.branches.lede}
        />

        {/* Head office on the map — the pin every branch number starts from. */}
        <Reveal className="mt-12">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="overflow-hidden rounded-card border border-sand/80">
              <iframe
                title={d.sections.branches.mapTitle}
                src={mapEmbedUrl()}
                className="h-72 w-full sm:h-80 lg:h-full lg:min-h-[24rem]"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="card-surface flex flex-col justify-between gap-6 p-6">
              <div className="space-y-4 text-[0.9375rem] leading-relaxed">
                <p className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                  {d.contactPage.headOffice}
                </p>
                <p className="flex items-start gap-3">
                  <Icon name="pin" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-forest-600" />
                  <span>
                    {t_({ en: office.name, hi: office.nameHi }, locale)}
                    <br />
                    {t_({ en: office.street, hi: office.streetHi }, locale)}
                    <br />
                    {t_({ en: office.locality, hi: office.localityHi }, locale)} — {site.postalCode}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Icon name="clock" className="h-4.5 w-4.5 shrink-0 text-forest-600" />
                  <span>
                    {d.contactPage.hours}:{' '}
                    {t_({ en: office.hours, hi: office.hoursHi }, locale)}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <Icon name="phone" className="h-4.5 w-4.5 shrink-0 text-forest-600" />
                  <a
                    href={telHref(office.phone)}
                    className="font-semibold text-forest-800 tabular link-underline"
                  >
                    {office.phone}
                  </a>
                </p>
              </div>
              <a
                href={office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-forest-700/25 px-5 py-2.5 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
              >
                <Icon name="external" className="h-4 w-4" />
                {d.contactPage.directions}
              </a>
            </div>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {site.branches.map((branch, i) => (
            <Reveal as="li" key={branch.id} delay={i * 40} className="h-full">
              <a
                href={telHref(branch.phone)}
                className="card-surface card-surface-hover flex h-full flex-col justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    {t_({ en: branch.person, hi: branch.personHi }, locale)}
                  </p>
                  <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-ink-muted">
                    <Icon name="pin" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-forest-600" />
                    {t_({ en: branch.locality, hi: branch.localityHi }, locale)}
                  </p>
                </div>
                <p className="flex items-center justify-between gap-2 border-t border-sand/70 pt-3">
                  <span className="text-sm font-semibold text-forest-800 tabular">
                    {branch.phone}
                  </span>
                  <Icon name="phone" className="h-4 w-4 text-forest-600" />
                </p>
                {branch.note && (
                  <p className="text-[0.68rem] text-plum-600">{branch.note}</p>
                )}
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-6 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
          >
            {d.sections.branches.viewContact}
            <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
          <a
            href={whatsappHref(enquiryMessage(locale, 'general'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-forest-800 link-underline"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {d.common.whatsappUs}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Closing call-to-action band.
 *
 * The deepest green on the page, right before the footer — one clear action,
 * no competing links.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)

  return (
    <section className="relative overflow-hidden bg-forest-900 py-20 text-paper sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.07]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/12 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative container-page text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-[1.9rem] leading-tight text-paper sm:text-[2.6rem]">
            {d.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-paper/70">
            {d.cta.body}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={telHref(site.phone)}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-[0.9375rem] font-semibold text-forest-950 transition-colors hover:bg-gold-400 active:scale-[0.98] sm:w-auto"
            >
              <Icon name="phone" className="h-4.5 w-4.5" />
              {d.cta.primary}
            </a>
            <a
              href={whatsappHref(enquiryMessage(locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-paper/25 px-8 py-4 text-[0.9375rem] font-semibold text-paper transition-colors hover:border-paper/60 hover:bg-paper/8 sm:w-auto"
            >
              <Icon name="whatsapp" className="h-4.5 w-4.5" />
              {d.cta.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}