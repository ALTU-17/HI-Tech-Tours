import type { Metadata } from 'next'
import Link from 'next/link'
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
  serviceNode,
  webPageNode,
  websiteNode,
} from '@/lib/schema'
import { faqs } from '@/data/faq'
import { getDictionary, isLocale } from '@/i18n'

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
    path: 'hajj',
    title: d.hajjPage.title,
    description: d.hajjPage.description,
  })
}

export default async function HajjPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)
  const path = `/${locale}/hajj`
  const url = absoluteUrl(path)

  const hajjFaqs = [faqs[0], faqs[2], faqs[5], faqs[9]]

  const facts =
    locale === 'hi'
      ? [
          {
            title: 'आवेदन का सही माध्यम',
            body: 'भारत में हज का आवंटन केवल हज कमेटी ऑफ इंडिया द्वारा किया जाता है, जो अल्पसंख्यक मंत्रालय का संवैधिक निकाय है। आवेदन hajcommittee.gov.in या हज सुविधा ऐप पर होता है।',
          },
          {
            title: 'एजेंसी क्या कर सकती है — और क्या नहीं',
            body: 'हम दस्तावेज़ों की तैयारी, पासपोर्ट वैधता, फोटो और चिकित्सा कागज़ात की जाँच कर सकते हैं। हम कोटा आवंटित या बेच नहीं सकते, और यह दावा भी नहीं करते।',
          },
          {
            title: 'नियम समय के साथ बदलते हैं',
            body: 'हर चक्र में नीतियाँ बदलती हैं। हमारी सलाह हमेशा उस वर्ष हज कमेटी ऑफ इंडिया की आधिकारिक सूचना पर आधारित होती है, न कि पुराने अनुभव पर।',
          },
        ]
      : [
          {
            title: 'The correct application channel',
            body: 'Hajj quota in India is allotted only by the Haj Committee of India, a statutory body under the Ministry of Minority Affairs. Applications run through hajcommittee.gov.in or the Haj Suvidha app.',
          },
          {
            title: 'What an agency can and cannot do',
            body: 'We can prepare documents, verify passport validity, photographs and medical papers. We cannot allocate or sell quota, and we do not claim to.',
          },
          {
            title: 'Rules change between cycles',
            body: 'Policy changes every cycle. Our guidance follows the current official Haj Committee of India notification, not what worked in a previous year.',
          },
        ]

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      localBusinessNode(),
      websiteNode({ locale }),
      webPageNode({
        name: d.hajjPage.title,
        description: d.hajjPage.description,
        url,
        locale,
        breadcrumbs: [
          { name: d.nav.home, path: `/${locale}` },
          { name: d.nav.hajj, path },
        ],
      }),
      breadcrumbNode([
        { name: d.nav.home, path: `/${locale}` },
        { name: d.nav.hajj, path },
      ]),
      serviceNode({
        name: locale === 'hi' ? 'हज आवेदन सहायता' : 'Hajj application assistance',
        description: d.hajjPage.description,
        url,
      }),
      faqNode(hajjFaqs, locale),
    ].filter(Boolean),
  }

  return (
    <>
      <JsonLd data={graph} />

      <header className="relative overflow-hidden bg-forest-950 py-14 text-paper sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.07]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-gold-500/10 blur-[120px]"
          aria-hidden="true"
        />
        <div className="relative container-page">
          <div className="[&_a]:text-paper/60 [&_a:hover]:text-gold-300 [&_span[aria-current]]:text-paper">
            <Breadcrumbs
              trail={[
                { name: d.nav.home, href: `/${locale}` },
                { name: d.nav.hajj, href: path },
              ]}
            />
          </div>
          <SectionHeading
            kicker={d.nav.hajj}
            title={d.hajjPage.title}
            lede={d.hajjPage.lede}
            tone="dark"
            className="mt-6"
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={telHref(site.phone)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-forest-950 transition-colors hover:bg-gold-400"
            >
              <Icon name="phone" className="h-4 w-4" />
              {d.common.callUs}
            </a>
            <a
              href={whatsappHref(enquiryMessage(locale, 'hajj'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper/60"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              {d.common.whatsappUs}
            </a>
          </div>
        </div>
      </header>

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              {d.hajjPage.factTitle}
            </h2>
            <div className="mt-8 space-y-5">
              {facts.map((fact, i) => (
                <Reveal key={fact.title} delay={i * 60} className="card-surface flex gap-5 p-6">
                  <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-100 text-lg font-bold text-forest-800">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{fact.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{fact.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 rounded-card border border-plum-600/20 bg-plum-100/40 p-6">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                <Icon name="shield" className="h-5 w-5 text-plum-600" />
                {locale === 'hi'
                  ? 'जो हम नहीं करेंगे'
                  : 'What we will not do'}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {(locale === 'hi'
                  ? [
                      'हज कोटा आवंटित या बेचने का वादा — यह केवल हज कमेटी ऑफ इंडिया करती है।',
                      'पुराने वर्ष के अनुभव के आधार पर बदली हुई नीतियों की सलाह देना।',
                      'पूरी तरह वैध दस्तावेज़ के बिना आवेदन जमा करवाना, ताकि वह खारिज न हो।',
                    ]
                  : [
                      'Promise Hajj quota — the Haj Committee of India is the only body that can allot it.',
                      'Give advice based on a previous year’s process when the policy has changed.',
                      'Submit an application without complete valid documents, only to have it rejected.',
                    ]
                ).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                    <Icon name="minus" className="mt-1 h-4 w-4 shrink-0 text-plum-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="card-surface p-6">
              <h2 className="font-display text-lg font-semibold text-ink">{d.hajjPage.ctaTitle}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {d.hajjPage.ctaBody}
              </p>
              <a
                href={telHref(site.phone)}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest-800 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
              >
                <Icon name="phone" className="h-4 w-4" />
                {d.cta.primary}
              </a>
            </div>

            <div className="card-surface p-6">
              <h2 className="text-xs font-bold tracking-[0.18em] text-forest-700 uppercase">
                {locale === 'hi' ? 'आधिकारिक स्रोत' : 'Official sources'}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://hajcommittee.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-forest-800 link-underline"
                  >
                    hajcommittee.gov.in
                    <Icon name="external" className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.minorityaffairs.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-forest-800 link-underline"
                  >
                    minorityaffairs.gov.in
                    <Icon name="external" className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                {locale === 'hi'
                  ? 'नीतियों में बदलाव होते हैं। हमेशा उस वर्ष की आधिकारिक सूचना पढ़ें।'
                  : 'Policy changes between cycles. Always read the notification for the current year.'}
              </p>
            </div>

            <div className="card-surface p-6">
              <h2 className="font-display text-lg font-semibold text-ink">{d.nav.umrah}</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                {locale === 'hi'
                  ? 'जो जायरीन हज की तैयारी कर रहे हैं, वे अक्सर पहले उमरा करते हैं।'
                  : 'Most pilgrims preparing for Hajj perform Umrah first.'}
              </p>
              <Link
                href={`/${locale}/umrah-packages`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 link-underline"
              >
                {d.sections.packages.eyebrow}
                <Icon name="arrow" className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}