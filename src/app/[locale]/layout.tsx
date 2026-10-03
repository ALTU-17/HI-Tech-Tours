import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Devanagari, Playfair_Display } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/next'

import '../globals.css'

import { Footer } from '@/components/layout/Footer'
import { FloatingContact, HindiNotice } from '@/components/layout/FloatingContact'
import { Header } from '@/components/layout/Header'
import { Preloader } from '@/components/Preloader'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { organizationNode, localBusinessNode, websiteNode } from '@/lib/schema'
import { getDictionary, htmlLang, isLocale, locales } from '@/i18n'

/**
 * Fonts are downloaded and self-hosted at build time by `next/font`. Nothing
 * is requested from a third party at runtime, there is no layout shift while
 * they load, and `display: swap` keeps text visible while they arrive.
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  preload: true,
})

const deva = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-deva',
  preload: true,
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf7ef' },
    { media: '(prefers-color-scheme: dark)', color: '#04180f' },
  ],
  colorScheme: 'light',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

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
    path: '',
    title: d.meta.title,
    description: d.meta.description,
  })
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const d = getDictionary(locale)

  return (
    <html
      lang={htmlLang(locale)}
      className={`${inter.variable} ${playfair.variable} ${deva.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Without JavaScript the splash would never dismiss and would hide the
          entire site. One line of noscript CSS makes the page readable for
          everyone regardless of script execution.
        */}
        <noscript>
          <style>{`#preloader{display:none !important}`}</style>
        </noscript>
        {/* Cross-origin hints for the self-hosted font files. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-dvh antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [organizationNode(), localBusinessNode(), websiteNode({ locale })],
          }}
        />

        <Preloader locale={locale} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-forest-800 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-paper"
        >
          {d.common.skipToContent}
        </a>

        <Header locale={locale} />

        <main id="main" className="min-h-[60vh]">
          {children}
        </main>

        <Footer locale={locale} />
        <FloatingContact locale={locale} />
        <HindiNotice locale={locale} />

        {/*
          Vercel Analytics. Works with `output: 'export'` because it only
          injects a tracking script — the `/vercel/analytics` beacon is served
          by Vercel's edge network, not by this app, so nothing is needed at
          build or runtime here. Remove this block and the dependency if the site
          is ever hosted somewhere else; nothing else depends on it.
        */}
        <Analytics />
      </body>
    </html>
  )
}