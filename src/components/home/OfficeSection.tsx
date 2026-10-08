import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'
import { telHref, whatsappHref, enquiryMessage } from '@/lib/contact'
import { getDictionary, type Locale } from '@/i18n'

/**
 * Two office sections displayed side by side.
 *
 * 1. Amaravati Branch (Mahavir Chowk, Ambad, Jalna) — uses the branch image
 * 2. Aurangabad Head Office (Jinsi Chowk) — uses the founder/office image
 */
export function OfficeSection({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const offices = site.offices

  return (
    <section id="offices" className="relative overflow-hidden bg-paper-2 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-lattice opacity-20 mask-fade-b" aria-hidden="true" />

      <div className="relative container-page">
        <SectionHeading
          kicker={d.sections.branches.eyebrow}
          title={d.sections.offices.title}
          lede={d.sections.offices.lede}
        />

        {/* Tagline display */}
        <Reveal>
          <div className="mt-10 rounded-xl border border-forest-700/20 bg-forest-950/40 p-6 sm:p-8 text-center">
            <p className="text-sm font-medium text-forest-700 uppercase tracking-wider">
              {d.sections.offices.taglineLabel}
            </p>
            <blockquote className="mt-4 flex flex-col items-center gap-2 text-center">
              <p className="font-display text-xl sm:text-2xl text-forest-800">
                <span className="italic">{d.hero.tagline}</span>
              </p>
              <p className="text-lg italic text-forest-700">
                {d.hero.taglineHi}
              </p>
            </blockquote>
          </div>
        </Reveal>

        {/* Two office cards */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {offices.map((office, idx) => (
            <Reveal
              key={office.id}
              delay={idx * 60}
              className="group rounded-card border border-sand/80 bg-white overflow-hidden"
            >
              {/* Office header area — image hidden, showing icon background */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-forest-800 to-forest-950">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="pin" className="h-16 w-16 text-white/10" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest-800 shadow-sm">
                    <Icon name="pin" className="h-3.5 w-3.5" />
                    {locale === 'hi' ? office.localityHi : office.locality}
                  </span>
                </div>
              </div>

              {/* Office details */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <p className="text-[0.68rem] font-bold tracking-[0.2em] text-forest-700 uppercase">
                    {locale === 'hi' ? office.nameHi : office.name}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    {office.type === 'head'
                      ? locale === 'hi' ? d.sections.offices.headOffice : d.sections.offices.headOffice
                      : locale === 'hi' ? d.sections.offices.branchOffice : d.sections.offices.branchOffice}
                  </h3>

                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                    <p className="flex items-start gap-3">
                      <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                      <span>
                        {locale === 'hi' ? office.streetHi : office.street}
                        <br />
                        <span className="font-medium text-ink">
                          {locale === 'hi' ? office.localityHi : office.locality}
                        </span>
                      </span>
                    </p>

                    <p className="flex items-center gap-3">
                      <Icon name="clock" className="h-4 w-4 shrink-0 text-forest-600" />
                      <span className="tabular-nums">
                        {locale === 'hi' ? office.hoursHi : office.hours}
                      </span>
                    </p>

                    {/* Named contacts — each with their own direct line and
                        WhatsApp, so a pilgrim reaches a person, not a desk. */}
                    {office.contacts.map((contact) => (
                      <div key={contact.phone} className="flex items-center gap-3">
                        <Icon name="phone" className="h-4 w-4 shrink-0 text-forest-600" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-ink">
                            {locale === 'hi' ? contact.personHi : contact.person}
                          </span>
                          <a
                            href={telHref(contact.phone)}
                            className="font-semibold tabular text-forest-800 link-underline"
                          >
                            {contact.phone}
                          </a>
                        </span>
                        <a
                          href={whatsappHref(enquiryMessage(locale, 'general'), contact.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`WhatsApp ${contact.person} — ${contact.phone}`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-700/20 text-forest-700 transition-colors hover:border-forest-700 hover:bg-forest-800 hover:text-paper"
                        >
                          <Icon name="whatsapp" className="h-4 w-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={telHref(office.contacts[0].phone)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
                  >
                    <Icon name="phone" className="h-4 w-4" />
                    {locale === 'hi' ? d.sections.offices.callOffice : d.sections.offices.callOffice}
                  </a>
                  <a
                    href={whatsappHref(enquiryMessage(locale, 'general'), office.contacts[0].phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-sand/60 px-5 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    {locale === 'hi' ? d.sections.offices.whatsApp : d.sections.offices.whatsApp}
                  </a>
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-forest-700/25 px-5 py-2.5 text-xs font-semibold text-forest-700 transition-colors hover:bg-forest-100/40"
                  >
                    <Icon name="external" className="h-3.5 w-3.5" />
                    {locale === 'hi' ? d.sections.offices.getDirections : d.sections.offices.getDirections}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Contact CTA */}
        <Reveal className="mt-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-ink-soft">
              {locale === 'hi'
                ? d.sections.offices.ctaBody
                : d.sections.offices.ctaBody}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={telHref(site.phone)}
                className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-700"
              >
                <Icon name="phone" className="h-4 w-4" />
                {d.cta.primary}
              </a>
              <a
                href={whatsappHref(enquiryMessage(locale))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-sand/60 px-6 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                {d.cta.secondary}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
