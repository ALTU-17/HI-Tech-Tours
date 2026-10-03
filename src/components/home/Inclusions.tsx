import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { journey, standardInclusions, standardInclusionsHi } from '@/data/journey'
import { cn } from '@/lib/cn'
import { getDictionary, type Locale } from '@/i18n'

export function InclusionsSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const items = locale === 'hi' ? standardInclusionsHi : standardInclusions

  return (
    <section className="relative overflow-hidden bg-forest-950 py-20 text-paper sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.06]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-forest-600/30 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              kicker={d.sections.inclusions.eyebrow}
              title={d.sections.inclusions.title}
              lede={d.sections.inclusions.lede}
              tone="dark"
            />
            <div className="mt-8 flex items-center gap-3 text-gold-300">
              <Icon name="shield" className="h-5 w-5" />
              <p className="text-sm">
                {locale === 'hi'
                  ? 'हर पैकेज में, बिना अतिरिक्त शुल्क'
                  : 'On every package, at no extra charge'}
              </p>
            </div>
          </div>

          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={i * 40}
                className="flex items-start gap-3 border-b border-paper/10 pb-3.5"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20">
                  <Icon name="check" strokeWidth={3} className="h-3 w-3 text-gold-300" />
                </span>
                <span className="text-[0.9375rem] leading-snug text-paper/85">{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function JourneySection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)

  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          kicker={d.sections.process.eyebrow}
          title={d.sections.process.title}
          lede={d.sections.process.lede}
          align="center"
        />

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Connecting hairline on wide screens. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-sand to-transparent lg:block"
            aria-hidden="true"
          />
          {journey.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 60} className="relative">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold',
                    'bg-cream text-forest-800 ring-1 ring-sand shadow-[var(--shadow-soft)]',
                  )}
                >
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title[locale]}</h3>
              </div>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft ps-16">
                {step.body[locale]}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}