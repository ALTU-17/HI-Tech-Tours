'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Icon } from '@/components/Icon'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { enquiryMessage, telHref, whatsappHref } from '@/lib/contact'
import { getDictionary, type Locale } from '@/i18n'

/**
 * Mobile call bar.
 *
 * A pilgrim on a phone is the primary audience, so calling and WhatsApp are
 * permanently one tap away. Desktop gets a slimmer version that only appears
 * after the hero has scrolled away, so it never competes with the hero CTAs.
 */
export function FloatingContact({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'no-print fixed inset-x-0 bottom-0 z-40 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
        'sm:inset-x-auto sm:bottom-6 sm:right-6',
        show ? 'translate-y-0' : 'translate-y-[130%] sm:translate-y-6 sm:opacity-0',
      )}
    >
      <div className="border-t border-sand/70 bg-paper/95 px-4 py-3 backdrop-blur-xl sm:border sm:rounded-2xl sm:shadow-[var(--shadow-lift)] sm:px-3 sm:py-3">
        <div className="flex items-center gap-2 sm:flex-col sm:gap-2">
          <a
            href={telHref(site.phone)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-forest-800 px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-forest-700 sm:flex-none sm:py-2.5"
          >
            <Icon name="phone" className="h-4 w-4" />
            {d.nav.callNow}
          </a>
          <a
            href={whatsappHref(enquiryMessage(locale))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-forest-700/30 px-4 py-3 text-sm font-semibold text-forest-800 transition-colors hover:bg-forest-100/60 sm:flex-none sm:py-2.5"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {d.nav.whatsapp}
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * Hindi upgrade banner.
 *
 * Deliberately NOT an automatic redirect. Forcing Hindi-speaking visitors to a
 * translated URL they did not ask for is hostile, and an auto-redirect from `/`
 * also splits crawl equity. An unobtrusive, dismissible offer behaves better
 * on both counts.
 */
export function HindiNotice({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (locale !== 'en') return
    let dismissed = false
    try {
      dismissed = window.sessionStorage.getItem('hitech.hi.notice') === '1'
    } catch {
      /* ignore */
    }
    if (dismissed) return

    const prefersHindi = /(^|,)(hi|mar|mr)(-|,|$)/i.test(navigator.language || '')
    if (!prefersHindi) return

    const id = window.setTimeout(() => setVisible(true), 1800)
    return () => window.clearTimeout(id)
  }, [locale])

  if (!visible) return null

  return (
    <div
      className="no-print fixed inset-x-3 bottom-24 z-40 mx-auto max-w-md sm:bottom-24"
      role="status"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-sand bg-cream px-4 py-3 shadow-[var(--shadow-lift)]">
        <p className="flex-1 text-sm text-ink-soft">{d.nav.switchTo}</p>
        <Link
          href="/hi"
          hrefLang="hi"
          className="rounded-full bg-forest-800 px-3.5 py-1.5 text-xs font-semibold text-paper"
          onClick={() => {
            try {
              window.sessionStorage.setItem('hitech.hi.notice', '1')
            } catch {
              /* ignore */
            }
          }}
        >
          हिंदी
        </Link>
        <button
          type="button"
          aria-label={d.nav.close}
          onClick={() => {
            setVisible(false)
            try {
              window.sessionStorage.setItem('hitech.hi.notice', '1')
            } catch {
              /* ignore */
            }
          }}
          className="rounded-full p-1 text-ink-muted transition-colors hover:text-ink"
        >
          <Icon name="plus" className="h-4 w-4 rotate-45" />
        </button>
      </div>
    </div>
  )
}