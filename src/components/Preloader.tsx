'use client'

import { useEffect, useRef, useState } from 'react'

import { formatGregorian, formatHijri } from '@/lib/hijri'
import { getDictionary, type Locale } from '@/i18n'
import { LogoBadge } from './Logo'

/**
 * The loading screen.
 *
 * Design constraints that shaped it:
 *  - Rendered on the SERVER, not mounted client-side. A client-only splash is
 *    the classic source of a white flash before paint.
 *  - `position: fixed`, so removing it later cannot shift the page. CLS stays 0.
 *  - It does NOT gate the hero image. The hero starts downloading while this is
 *    on screen; the overlay simply fades out over it. LCP is never delayed.
 *  - Progress is tied to real signals (fonts.ready + window load), eased toward
 *    100% and floored by a minimum duration, so it never stalls at 98% and
 *    never blinks away in 40 ms on a warm cache.
 *  - Repeat visitors in the same session skip it — a splash that replays on
 *    every internal navigation reads as jank, not craft.
 *  - prefers-reduced-motion gets a static fade instead of the whole sequence.
 */

const STORAGE_KEY = 'hitech.preloader.seen'
const MIN_MS = 2500
const MAX_MS = 3500

type Stage = 'fonts' | 'content' | 'images' | 'ready'

export function Preloader({ locale }: { locale: Locale }) {
  const d = getDictionary(locale)
  const [status, setStatus] = useState<'enter' | 'dismiss'>('enter')
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<Stage>('fonts')
  const [gone, setGone] = useState(false)

  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number>(0)
  const signalsRef = useRef({ fonts: false, loaded: false })

  // --- Real load signals -------------------------------------------------
  useEffect(() => {
    let cancelled = false

    const markFonts = () => {
      if (!cancelled) signalsRef.current.fonts = true
    }
    const markLoaded = () => {
      if (!cancelled) signalsRef.current.loaded = true
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(markFonts).catch(markFonts)
    } else {
      markFonts()
    }
    if (document.readyState === 'complete') markLoaded()
    else window.addEventListener('load', markLoaded, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', markLoaded)
    }
  }, [])

  // --- Already-seen fast path -------------------------------------------
  useEffect(() => {
    let seen = false
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // Private browsing can throw on sessionStorage; treat as not seen.
    }
    if (seen) {
      setGone(true)
      try {
        window.sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
    }
  }, [])

  // --- Progress loop -----------------------------------------------------
  useEffect(() => {
    if (gone) return

    // Someone who has asked for reduced motion should not be held for 1.6s
    // watching geometry draw itself. They get a brief static card instead.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minMs = reduceMotion ? 320 : MIN_MS
    const capMs = reduceMotion ? 520 : MAX_MS

    const startedAt = performance.now()
    startRef.current = startedAt
    window.sessionStorage?.setItem(STORAGE_KEY, '1')

    const tick = (now: number) => {
      const elapsed = now - startedAt

      // Target progress combines elapsed time with how many signals have landed.
      const timeProgress = Math.min(1, elapsed / capMs)
      const { fonts, loaded } = signalsRef.current
      const signalProgress = (fonts ? 0.35 : 0) + (loaded ? 0.65 : 0)
      const ceiling = Math.min(timeProgress, 0.25 + signalProgress + 0.15)
      const floor = Math.min(timeProgress, minMs / capMs)

      // ease-out so the last stretch settles instead of lurching
      const eased = 1 - Math.pow(1 - Math.max(floor, ceiling), 2.1)
      setProgress(Math.min(100, Math.max(0, eased * 100)))

      setStage(!fonts ? 'fonts' : !loaded ? (signalsRef.current.loaded ? 'images' : 'content') : 'ready')

      const finished = elapsed >= minMs && (loaded || elapsed >= capMs)
      if (finished) {
        setProgress(100)
        setStage('ready')
        rafRef.current = null
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [gone])

  // --- Dismiss -----------------------------------------------------------
  useEffect(() => {
    if (gone) return
    if (progress < 99.5) return
    const id = window.setTimeout(() => {
      setStatus('dismiss')
      window.setTimeout(() => setGone(true), 620)
    }, 260)
    return () => window.clearTimeout(id)
  }, [progress, gone])

  if (gone) return null

  const pct = Math.round(progress)
  const now = new Date()

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950 transition-opacity duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ opacity: status === 'dismiss' ? 0 : 1 }}
      aria-hidden="true"
    >
      {/* Ambient geometry */}
      <div
        className="absolute inset-0 bg-arabesque opacity-[0.07]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[120px] animate-[breathe_5s_ease-in-out_infinite]"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-md flex-col items-center px-6 text-center">
        {/* ---- Animated mark ---- */}
        <div className="relative h-32 w-32 sm:h-40 sm:w-40">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="pl-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F0D98A" />
                <stop offset="55%" stopColor="#C9A227" />
                <stop offset="100%" stopColor="#8A6F14" />
              </linearGradient>
            </defs>

            {/* Outer eight-point star: two overlapping squares, drawn in. */}
            <g
              fill="none"
              stroke="url(#pl-gold)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              pathLength={1}
            >
              <path
                d="M100 12 L188 100 L100 188 L12 100 Z"
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{
                  animation: 'draw 1.5s cubic-bezier(0.16,1,0.3,1) 0.05s forwards',
                }}
              />
              <path
                d="M100 32 L168 100 L100 168 L32 100 Z"
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{
                  animation: 'draw 1.5s cubic-bezier(0.16,1,0.3,1) 0.22s forwards',
                }}
              />
              <circle
                cx="100"
                cy="100"
                r="46"
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{
                  animation: 'draw 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s forwards',
                }}
              />
            </g>

            {/* Tawaf: a light orbiting the Kaaba, tracing one circuit. */}
            <g
              style={{
                transformOrigin: '100px 100px',
                animation: 'orbit 3.6s linear infinite',
              }}
            >
              <circle cx="100" cy="100" r="72" fill="none" stroke="#C9A227" strokeWidth="0.7" strokeOpacity="0.35" />
              <circle cx="100" cy="28" r="4.5" fill="#F0D98A">
                <animate attributeName="opacity" values="0.45;1;0.45" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="28" r="9" fill="#F0D98A" opacity="0.18" />
            </g>

            {/* The Kaaba itself, scaled in once the frame has drawn. */}
            <g
              style={{
                transformOrigin: '100px 100px',
                animation: 'draw 1.2s cubic-bezier(0.16,1,0.3,1) 0.62s forwards',
              }}
            >
              <rect x="74" y="74" width="52" height="52" rx="3" fill="#FBF7EF" opacity="0.95" />
              <rect x="74" y="94" width="52" height="9" fill="url(#pl-gold)" />
              <rect x="94" y="74" width="9" height="52" fill="#C9A227" opacity="0.55" />
            </g>
          </svg>
        </div>

        {/* ---- Wordmark ---- */}
        <div className="mt-8 overflow-hidden">
          <p
            className="font-display text-[1.7rem] font-bold tracking-[0.16em] text-paper sm:text-[2.1rem]"
            style={{
              animation: 'rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both',
            }}
          >
            HI-TECH
          </p>
        </div>
        <div className="mt-2 h-px w-40 overflow-hidden">
          <div
            className="h-full w-full origin-left bg-gold-500"
            style={{ animation: 'draw 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s both' }}
          />
        </div>
        <p
          className="mt-3 text-[0.72rem] font-semibold tracking-[0.26em] text-gold-300 uppercase"
          style={{ animation: 'rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.78s both' }}
        >
          {locale === 'hi' ? 'हज उमरा सर्विस' : 'Haj Umrah Services'}
        </p>
        <p
          className="mt-5 max-w-xs text-sm text-paper/65 italic"
          style={{ animation: 'rise 0.8s cubic-bezier(0.16,1,0.3,1) 0.95s both' }}
        >
          “{d.loader.verseEn}”
        </p>

        {/* ---- Dual progress rails: LTR + mirrored RTL ---- */}
        <div className="mt-9 w-full max-w-[19rem]">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-paper/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 transition-[width] duration-100 ease-linear rtl:-scale-x-100"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div
            dir="rtl"
            className="mt-1.5 h-px w-full overflow-hidden rounded-full bg-paper/10"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-forest-300/70 transition-[width] duration-100 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-[0.68rem] tracking-[0.18em] text-paper/55 uppercase">
            <span className="tabular">{stageLabel(d, stage)}</span>
            <span className="tabular text-gold-300">{pct}%</span>
          </div>
        </div>

        {/*
          ---- Date ----

          This is a live "today", but the HTML is baked at build time and served
          as a static file. A visitor who opens the site on any day after the
          build would otherwise trigger a hydration mismatch on every page, so
          the two date spans opt out explicitly. The text is decorative and
          aria-hidden; suppressing here costs nothing real.
        */}
        <div className="mt-8 flex flex-col items-center gap-1 text-[0.66rem] tracking-[0.14em] text-paper/40 uppercase">
          <span suppressHydrationWarning>{formatHijri(now, locale)}</span>
          <span className="h-px w-6 bg-paper/20" />
          <span suppressHydrationWarning>{formatGregorian(now, locale)}</span>
        </div>
      </div>

      {/* ---- Brand corner ---- */}
      <div className="absolute top-6 left-6 opacity-70">
        <LogoBadge className="h-8 w-8" tone="light" />
      </div>
    </div>
  )
}

function stageLabel(d: ReturnType<typeof getDictionary>, stage: Stage) {
  switch (stage) {
    case 'fonts':
      return d.loader.fonts
    case 'content':
      return d.loader.content
    case 'images':
      return d.loader.images
    case 'ready':
      return d.loader.ready
  }
}