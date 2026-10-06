import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'
import { telHref } from '@/lib/contact'
import { getDictionary, t_, type Locale } from '@/i18n'

/**
 * Founder profile card.
 *
 * Surfaced on the home page so a pilgrim scrolling past the four commitments
 * reaches the person those commitments are made by. The phone number is the
 * same local number printed on the banner, so there is a single number to
 * remember; everything else is bilingual.
 */
export function FounderSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const founder = site.founder

  return (
    <section id="founder" className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          kicker={d.home.founderEyebrow}
          title={d.home.founderTitle}
          lede={d.home.founderLede}
          align="center"
        />

        <Reveal className="mt-12">
          <div className="card-surface card-surface-hover relative overflow-hidden p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:items-start">
              <div className="flex justify-center lg:justify-start">
                <Image
                  src="/images/founder-480.webp"
                  alt={t_({
                    en: `${founder.name}, ${founder.title}`,
                    hi: `${founder.nameHi}, ${founder.titleHi}`,
                  }, locale)}
                  width={480}
                  height={638}
                  className="w-44 rounded-2xl border border-sand shadow-sm sm:w-52 lg:w-60"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {t_({ en: founder.name, hi: founder.nameHi }, locale)}
                </h3>
                <p className="mt-1 text-lg font-medium text-forest-700">
                  {t_({ en: founder.title, hi: founder.titleHi }, locale)}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <Icon name="phone" className="h-5 w-5 shrink-0 text-forest-600" />
                  <a
                    href={telHref(founder.phone)}
                    className="font-semibold text-forest-800 tabular link-underline"
                  >
                    {founder.phone}
                  </a>
                </div>

                <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft">
                  {t_({ en: founder.description.en, hi: founder.description.hi }, locale)}
                </p>

                <Link
                  href={`/${locale}/guides/expedition-guide`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 link-underline"
                >
                  {d.common.learnMore}
                  <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
