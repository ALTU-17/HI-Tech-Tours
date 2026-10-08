'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Icon } from '@/components/Icon'
import { Logo } from '@/components/Logo'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { telHref, whatsappHref, enquiryMessage } from '@/lib/contact'
import { getDictionary, localeNames, swapLocalePath, type Locale } from '@/i18n'

type NavItem = { href: string; label: string }

function navItems(locale: Locale, d: ReturnType<typeof getDictionary>): NavItem[] {
  return [
    { href: `/${locale}/umrah-packages`, label: d.nav.umrah },
    { href: `/${locale}/hajj`, label: d.nav.hajj },
    { href: `/${locale}/services`, label: d.nav.services },
    // Marathwada (/locations) is hidden from the nav at the owner's request.
    // The page itself is untouched — restore this line to show it again.
    // { href: `/${locale}/locations`, label: d.nav.locations },
    { href: `/${locale}/guides`, label: d.nav.guides },
    { href: `/${locale}/faq`, label: d.nav.faq },
  ]
}

export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const items = navItems(locale, d)
  const other = locale === 'en' ? 'hi' : 'en'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation and lock body scroll while it is open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[box-shadow,border-color] duration-300',
        // Always opaque: the hero is a light surface, so a transparent header
        // would put dark text on a pale wash and read as a bug, not as craft.
        'border-b border-sand/60 bg-paper/92 backdrop-blur-xl',
        scrolled && 'shadow-[0_1px_0_0_rgb(236_224_205),0_12px_28px_-24px_rgb(11_18_32/0.4)]',
        open && 'bg-paper',
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link href={`/${locale}`} aria-label={site.name} className="shrink-0">
          <Logo variant="full" className="scale-95 origin-left sm:scale-100" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-forest-800'
                    : 'text-ink-soft hover:bg-forest-100/60 hover:text-forest-800',
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language toggle — a real link, so it is crawlable and shareable. */}
          <Link
            href={swapLocalePath(pathname || `/${locale}`, other)}
            hrefLang={other}
            lang={other}
            aria-label={localeNames[locale].aria}
            title={localeNames[locale].aria}
            className="hidden rounded-full border border-forest-700/25 px-3 py-1.5 text-xs font-semibold text-forest-800 transition-colors hover:border-forest-700/60 hover:bg-forest-100/60 sm:inline-flex"
          >
            {localeNames[locale].other}
          </Link>

          <a
            href={telHref(site.phone)}
            className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            <Icon name="phone" className="h-4 w-4" />
            <span className="hidden sm:inline">{d.nav.callNow}</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? d.nav.close : d.nav.openMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-700/25 text-forest-800 lg:hidden"
          >
            <span className="relative block h-3.5 w-4.5">
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1.5 h-0.5 w-full rounded bg-current transition-all duration-200',
                  open ? 'opacity-0' : 'opacity-100',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={cn(
          'overflow-hidden border-t border-sand/60 bg-paper transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-forest-100/60"
            >
              {item.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-sand/70" />

          {[
            { href: `/${locale}/about`, label: d.nav.about },
            { href: `/${locale}/reviews`, label: d.nav.reviews },
            { href: `/${locale}/contact`, label: d.nav.contact },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-forest-100/60"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-3 flex items-center gap-2">
            <Link
              href={swapLocalePath(pathname || `/${locale}`, other)}
              hrefLang={other}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-forest-700/30 px-4 py-3 text-sm font-semibold text-forest-800"
            >
              {localeNames[locale].other}
            </Link>
            <a
              href={whatsappHref(enquiryMessage(locale))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-forest-800 px-4 py-3 text-sm font-semibold text-paper"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              {d.nav.whatsapp}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}