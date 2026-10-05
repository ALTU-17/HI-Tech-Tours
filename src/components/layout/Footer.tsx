import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { site } from '@/data/site'
import { marathwada } from '@/data/locations'
import { getDictionary, t_, type Locale } from '@/i18n'
import { telHref, whatsappHref, enquiryMessage } from '@/lib/contact'

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)

  const quickLinks = [
    { href: `/${locale}/umrah-packages`, label: d.nav.umrah },
    { href: `/${locale}/hajj`, label: d.nav.hajj },
    { href: `/${locale}/services`, label: d.nav.services },
    { href: `/${locale}/locations`, label: d.nav.locations },
    { href: `/${locale}/guides`, label: d.nav.guides },
    { href: `/${locale}/about`, label: d.nav.about },
    { href: `/${locale}/reviews`, label: d.nav.reviews },
    { href: `/${locale}/faq`, label: d.nav.faq },
    { href: `/${locale}/contact`, label: d.nav.contact },
  ]

  return (
    <footer className="relative mt-24 overflow-hidden bg-forest-950 text-paper">
      <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.05]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-forest-600/25 blur-[110px]"
        aria-hidden="true"
      />

      {/* pt-16 only: the dev bar is the last child and carries its own
          bottom padding, so the footer does not add a second 64px below it. */}
      <div className="relative container-page pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + NAP */}
          <div>
            <Logo variant="full" tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">{d.footer.tagline}</p>

            <address className="mt-6 space-y-3 text-sm not-italic text-paper/75">
              <p className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 text-gold-400" />
                <span>
                  {t_({ en: site.street, hi: site.streetHi }, locale)}
                  <br />
                  {t_({ en: `${site.locality}, ${site.region} ${site.postalCode}`, hi: `${site.localityHi}, ${site.regionHi} ${site.postalCode}` }, locale)}
                </span>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="phone" className="h-4 w-4 text-gold-400" />
                <a href={telHref(site.phone)} className="link-underline tabular">
                  +91 {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Icon name="whatsapp" className="h-4 w-4 text-gold-400" />
                <a
                  href={whatsappHref(enquiryMessage(locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  {d.common.whatsappUs}
                </a>
              </p>
            </address>
          </div>

          {/* Quick links */}
          <nav aria-label={d.footer.quickLinks}>
            <h2 className="text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">
              {d.footer.quickLinks}
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm lg:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/70 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Marathwada coverage — internal links, the local SEO workhorse */}
          <nav aria-label={d.footer.coverageLinks}>
            <h2 className="text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">
              {d.footer.coverageLinks}
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm lg:grid-cols-1">
              {marathwada.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${locale}/locations/${loc.slug}`}
                    className="text-paper/70 transition-colors hover:text-gold-300"
                  >
                    {t_({ en: loc.name, hi: loc.nameHi }, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="my-10 h-px bg-paper/12" />

        {/* Compliance notes. Deliberately visible rather than buried. */}
        <div className="grid gap-4 text-xs leading-relaxed text-paper/55 md:grid-cols-2">
          <p>
            <strong className="font-semibold text-paper/75">Hajj:</strong> {d.footer.disclaimer}
          </p>
          <p>{d.footer.builtNote}</p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 text-xs text-paper/45 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. {d.footer.rights}
          </p>
          <nav aria-label="Language" className="flex items-center gap-4">
            <Link href={`/en`} hrefLang="en" className="transition-colors hover:text-gold-300">
              English
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-paper/20" />
            <Link href={`/hi`} hrefLang="hi" className="transition-colors hover:text-gold-300">
              हिन्दी
            </Link>
          </nav>
        </div>

        {/* ===== Developer Info Bar ===== */}
        <div className="border-t border-paper/10">
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-center gap-3 text-[12px] text-paper sm:text-[13px]">
              {/* Portfolio */}
              <a
                href="https://altamash-shaikh-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-1.5
                  text-paper
                  no-underline
                  transition-colors
                  duration-300
                  hover:text-forest-300
                "
                aria-label="Visit developer portfolio"
              >
                <Icon name="code" className="h-4 w-4 text-forest-500" />
                <span>Developed by: ALTAMASH SHAIKH</span>
              </a>

              {/* Divider */}
              <span className="h-3 w-px bg-forest-500/40" />

              {/* Phone */}
              <a
                href="tel:+919766220055"
                className="
                  flex
                  items-center
                  gap-1.5
                  text-paper
                  no-underline
                  transition-colors
                  duration-300
                  hover:text-forest-300
                "
                aria-label="Call developer"
              >
                <Icon name="phone" className="h-3.5 w-3.5 text-forest-500" />
                <span>+91 9766220055</span>
              </a>

              {/* Divider */}
              <span className="h-3 w-px bg-forest-500/40" />

              {/* Email */}
              <a
                href="mailto:skaltamsh789@gmail.com"
                className="
                  flex
                  items-center
                  gap-1.5
                  text-paper
                  no-underline
                  transition-colors
                  duration-300
                  hover:text-forest-300
                "
                aria-label="Email developer"
              >
                <Icon name="mail" className="h-3.5 w-3.5 text-forest-500" />
                <span>skaltamsh789@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}