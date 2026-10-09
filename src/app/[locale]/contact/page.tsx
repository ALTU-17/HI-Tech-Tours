import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { JsonLd } from '@/components/seo/JsonLd'
import { Breadcrumbs, SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import {
  breadcrumbNode,
  faqNode,
  localBusinessNode,
  organizationNode,
  webPageNode,
  websiteNode,
} from '@/lib/schema'
import { faqs } from '@/data/faq'
import { getDictionary, isLocale, t_ } from '@/i18n'

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
    path: 'contact',
    title: d.contactPage.title,
    description: d.contactPage.description,
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/contact`
  const url = absoluteUrl(path)
  const office = site.offices[0]

  const contactFaqs = [faqs[8], faqs[5], faqs[0]]

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.contactPage.title,
        description: d.contactPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.contact, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.contact, path },
      ]),
      faqNode(contactFaqs, locale),
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
              { name: d.nav.contact, href: path },
            ]}
          />
          <SectionHeading
            kicker={d.nav.contact}
            title={d.contactPage.title}
            lede={d.contactPage.lede}
            className="mt-6"
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref(site.phone)}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-forest-800 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
            >
              <Icon name="phone" className="h-4.5 w-4.5" />
              +91 {site.phone}
            </a>
            <a
              href={whatsappHref(enquiryMessage(locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-forest-700/25 bg-cream px-7 py-3.5 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-700/60 hover:bg-forest-100/50"
            >
              <Icon name="whatsapp" className="h-4.5 w-4.5" />
              {d.common.whatsappUs}
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-forest-700/25 bg-cream px-7 py-3.5 text-sm font-semibold text-forest-800 transition-colors hover:border-forest-700/60 hover:bg-forest-100/50"
            >
              <Icon name="instagram" className="h-4.5 w-4.5" />
              {d.nav.instagram}
            </a>
          </div>
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Head office */}
          <aside className="space-y-5">
            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {d.contactPage.branchContacts}
              </h2>
              <address className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed not-italic">
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
                {office.contacts.map((contact) => (
                  <p key={contact.phone} className="flex items-start gap-3">
                    <Icon name="phone" className="mt-0.5 h-4.5 w-4.5 shrink-0 text-forest-600" />
                    <span>
                      <span className="block font-medium text-ink">
                        {t_({ en: contact.person, hi: contact.personHi }, locale)}
                      </span>
                      <a href={telHref(contact.phone)} className="font-semibold text-forest-800 tabular link-underline">
                        {contact.phone}
                      </a>
                    </span>
                  </p>
                ))}
                <p className="flex items-center gap-3">
                  <Icon name="external" className="h-4.5 w-4.5 shrink-0 text-forest-600" />
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-forest-800 link-underline"
                  >
                    {d.contactPage.directions}
                  </a>
                </p>
              </address>
            </div>

            {/*
              Transparency block. Listing what is still unconfirmed builds more
              trust than quietly omitting it — and it is a standing to-do list
              for the owner.
            */}
            <div className="rounded-card border border-dashed border-gold-500/50 bg-gold-100/40 p-6">
              <h2 className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-gold-700 uppercase">
                <Icon name="shield" className="h-4 w-4" />
                {d.contactPage.pendingTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {d.contactPage.pendingLede}
              </p>
              <ul className="mt-4 space-y-2">
                {site.pendingFacts.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Branch contacts */}
          <div>
            <SectionHeading
              kicker={d.common.official}
              title={d.sections.branches.title}
              lede={d.sections.branches.lede}
            />
            <p className="mt-4 text-sm text-ink-muted">{d.contactPage.branchesNote}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {site.branches.map((branch, i) => (
                <Reveal as="li" key={branch.id} delay={i * 30}>
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
          </div>
        </div>
      </div>
    </>
  )
}