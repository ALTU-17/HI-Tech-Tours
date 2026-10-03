import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { LogoBadge } from '@/components/Logo'
import { site } from '@/data/site'
import { telHref } from '@/lib/contact'
import { getDictionary, htmlLang } from '@/i18n'

/**
 * Locale-scoped 404.
 *
 * Next renders the nearest `not-found.tsx` inside the matched segment, so this
 * picks up the `[locale]` layout — including the correct language, header and
 * footer — rather than dropping the visitor on a bare page.
 */
export default function NotFound() {
  // Fall back to English; the segment may not have been matched at all.
  const locale = 'en' as const
  const d = getDictionary(locale)

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-lattice opacity-20 mask-fade-b" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-forest-300/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative container-page text-center" lang={htmlLang(locale)}>
        <LogoBadge className="mx-auto h-16 w-16" tone="dark" />

        <p className="mt-8 font-display text-[5rem] leading-none font-bold text-forest-100 select-none sm:text-[7rem]">
          404
        </p>

        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">{d.notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
          {d.notFound.body}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            {d.notFound.cta}
            <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
          <a
            href={telHref(site.phone)}
            className="inline-flex items-center gap-2 rounded-full border border-forest-700/25 px-6 py-3.5 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
          >
            <Icon name="phone" className="h-4 w-4" />
            {d.common.callUs}
          </a>
        </div>
      </div>
    </section>
  )
}