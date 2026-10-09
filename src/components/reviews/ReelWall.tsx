'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from 'react'

import { Icon } from '@/components/Icon'
import { formatDuration, reels } from '@/data/reels'
import { cn } from '@/lib/cn'

export type ReelCopy = {
  eyebrow: string
  title: string
  lede: string
  play: string
  pause: string
  replay: string
  soundOn: string
  soundOff: string
  mutedHint: string
  reel: string
  swipeHint: string
  note: string
  instagram: string
  all: string
}

/**
 * Reel wall.
 *
 * Five portrait reviews, shown the way a phone shows a reel: one full-height
 * card per swipe, a tap that starts it with the pilgrim's voice, and a speaker
 * to silence it. Nothing autoplays — sound on a page nobody asked to hear is
 * exactly the thing this is meant to avoid — and only one reel ever plays, so a
 * second card pauses the first.
 *
 * Data discipline: a reel is not even requested until its card is within 500px
 * of the viewport (five clips are ~88 MB together), and playback stops the
 * moment the card leaves the screen rather than narrating the rest of the page.
 */
export function ReelWall({
  copy,
  instagramHref,
  link,
  className,
}: {
  copy: ReelCopy
  instagramHref?: string
  /** Optional internal link shown beside the Instagram button (home uses it to
   *  send readers to the full reviews page). */
  link?: { href: string; label: string }
  className?: string
}) {
  const trackRef = useRef<HTMLUListElement | null>(null)
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})
  const barRefs = useRef<Record<string, HTMLSpanElement | null>>({})

  const [armed, setArmed] = useState<string[]>([])
  const [playing, setPlaying] = useState<string | null>(null)
  const [ended, setEnded] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [active, setActive] = useState(0)

  const count = reels.length

  // Arm the cards near the viewport only. A visitor who never scrolls this far
  // downloads nothing.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-reel]'))
    if (!cards.length) return

    if (typeof IntersectionObserver === 'undefined') {
      setArmed(cards.map((card) => card.dataset.reel ?? ''))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setArmed((previous) => {
          const next = [...previous]
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const id = (entry.target as HTMLElement).dataset.reel
            if (id && !next.includes(id)) next.push(id)
          }
          return next.length === previous.length ? previous : next
        })
      },
      { rootMargin: '500px' },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Which reel the counter is on, measured from the scroll position so it stays
  // correct when the browser restores a scroll or a resize reflows the track.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const read = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-reel]'))
      if (!cards.length) return
      const trackRect = track.getBoundingClientRect()
      const centre = trackRect.left + trackRect.width / 2
      let best = 0
      let bestDistance = Number.POSITIVE_INFINITY
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect()
        const distance = Math.abs(rect.left + rect.width / 2 - centre)
        if (distance < bestDistance) {
          bestDistance = distance
          best = i
        }
      })
      setActive(best)
    }

    read()
    track.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      track.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [])

  const start = useCallback(
    async (id: string) => {
      const el = videoRefs.current[id]
      if (!el) return

      // A card can be tapped before it was armed — a reel reached by a jump, or
      // one tapped the instant it scrolled in. Arm it and wait for the source to
      // arrive; calling play() on an element with nothing to play, or letting
      // the src land after play() has started, are both ways to lose the tap.
      if (!el.getAttribute('src')) {
        setArmed((previous) => (previous.includes(id) ? previous : [...previous, id]))
        for (let attempt = 0; attempt < 40 && !el.getAttribute('src'); attempt += 1) {
          await new Promise((resolve) => setTimeout(resolve, 25))
        }
        if (!el.getAttribute('src')) return
      }

      // One voice at a time.
      for (const [key, other] of Object.entries(videoRefs.current)) {
        if (other && key !== id) other.pause()
      }

      setPlaying(id)
      setEnded(null)
      el.muted = muted

      try {
        await el.play()
      } catch {
        // A browser is free to refuse an unmuted play() if it does not read the
        // tap as a gesture. Falling back to muted keeps the reel running and the
        // speaker button — plus the hint chip — turns the sound on from there.
        try {
          el.muted = true
          setMuted(true)
          await el.play()
        } catch {
          setPlaying(null)
        }
      }
    },
    [muted],
  )

  const toggle = (id: string) => {
    const el = videoRefs.current[id]
    if (!el) return
    if (playing === id) {
      el.pause()
      setPlaying(null)
      return
    }
    void start(id)
  }

  const setSound = (on: boolean) => {
    setMuted(!on)
    const el = playing ? videoRefs.current[playing] : null
    if (el) el.muted = !on
  }

  // Stop the reel once its card leaves the screen — a pilgrim's voice following
  // you down the page would be the wrong kind of memorable. The observer is on
  // the viewport, so this covers both swiping to the next reel and scrolling on.
  useEffect(() => {
    if (!playing) return
    if (typeof IntersectionObserver === 'undefined') return
    const card = trackRef.current?.querySelector<HTMLElement>(`[data-reel="${playing}"]`)
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && !entries[0].isIntersecting) {
          videoRefs.current[playing]?.pause()
          setPlaying(null)
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [playing])

  const onTimeUpdate =
    (id: string) =>
    (event: SyntheticEvent<HTMLVideoElement>): void => {
      const el = event.currentTarget
      const bar = barRefs.current[id]
      if (!bar || !Number.isFinite(el.duration) || el.duration <= 0) return
      bar.style.transform = `scaleX(${Math.min(1, el.currentTime / el.duration)})`
    }

  const onEnded = (id: string) => () => {
    setPlaying((current) => (current === id ? null : current))
    setEnded(id)
    const el = videoRefs.current[id]
    if (el) el.currentTime = 0
    const bar = barRefs.current[id]
    if (bar) bar.style.transform = 'scaleX(0)'
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] bg-forest-950 text-paper',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.07]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-forest-900/70 via-transparent to-forest-900/50"
        aria-hidden="true"
      />

      <div className="relative p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="kicker text-gold-300">{copy.eyebrow}</p>
            <h2 className="mt-3 text-[1.75rem] leading-[1.2] text-paper sm:text-[2.1rem]">
              {copy.title}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/70">{copy.lede}</p>
          </div>

          <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-2">
            <p className="tabular text-sm text-paper/60">
              <span className="text-[1.0625rem] font-semibold text-paper">
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="mx-1.5 text-paper/35">/</span>
              {String(count).padStart(2, '0')}
            </p>
            <p className="flex items-center gap-2 text-xs text-paper/60 lg:hidden">
              <Icon name="arrow" className="h-3.5 w-3.5" />
              {copy.swipeHint}
            </p>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {reels.map((reel, i) => {
            const number = String(i + 1).padStart(2, '0')
            const isPlaying = playing === reel.id
            const isEnded = ended === reel.id
            const label = isPlaying ? copy.pause : isEnded ? copy.replay : copy.play

            return (
              <li
                key={reel.id}
                data-reel={reel.id}
                className="w-[76vw] shrink-0 snap-center sm:w-[46vw] md:w-[34vw] lg:w-[calc((100%-4rem)/5)]"
              >
                <figure className="group/card">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.25rem] bg-forest-900 ring-1 ring-paper/10">
                    {/* Stands in for a poster frame until the video paints itself. */}
                    <span
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest-900 via-forest-950 to-black"
                      aria-hidden="true"
                    >
                      <span className="font-display text-[3rem] font-semibold text-paper/10">
                        {number}
                      </span>
                    </span>

                    <video
                      ref={(el) => {
                        videoRefs.current[reel.id] = el
                      }}
                      src={armed.includes(reel.id) ? reel.src : undefined}
                      preload="metadata"
                      playsInline
                      disablePictureInPicture
                      onTimeUpdate={onTimeUpdate(reel.id)}
                      onEnded={onEnded(reel.id)}
                      className="relative h-full w-full object-cover"
                    />

                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/5 to-forest-950/40"
                      aria-hidden="true"
                    />

                    <span className="tabular pointer-events-none absolute left-3 top-3 z-20 flex items-center rounded-full bg-forest-950/70 px-2.5 py-1 text-[0.6875rem] font-semibold text-gold-300 backdrop-blur-sm">
                      {number}
                    </span>

                    {isPlaying && (
                      <button
                        type="button"
                        onClick={() => setSound(muted)}
                        aria-label={muted ? copy.soundOn : copy.soundOff}
                        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-forest-950 shadow-[0_8px_20px_-8px_rgb(201_162_39/0.9)] transition-colors hover:bg-gold-400"
                      >
                        <Icon name={muted ? 'soundOff' : 'sound'} className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => toggle(reel.id)}
                      aria-label={label}
                      className="absolute inset-0 z-10 flex items-center justify-center"
                    >
                      <span
                        className={cn(
                          'flex items-center justify-center rounded-full border border-paper/30 text-paper backdrop-blur-sm transition-all duration-300',
                          isPlaying
                            ? 'h-11 w-11 bg-forest-950/35 opacity-65 group-hover/card:opacity-100 group-focus-visible/card:opacity-100'
                            : 'h-14 w-14 bg-forest-950/50 shadow-[0_0_0_6px_rgb(4_24_15/0.25)] group-hover/card:scale-105 group-hover/card:border-gold-400/70 group-hover/card:bg-forest-950/70',
                        )}
                      >
                        <Icon
                          name={isPlaying ? 'pause' : isEnded ? 'replay' : 'play'}
                          className={cn('h-6 w-6', !isPlaying && 'translate-x-[1px]')}
                          strokeWidth={1.8}
                        />
                      </span>
                    </button>

                    {isPlaying && muted && (
                      <p className="pointer-events-none absolute inset-x-0 bottom-3 z-20 mx-auto w-fit rounded-full bg-forest-950/85 px-3 py-1 text-[0.6875rem] text-gold-300">
                        {copy.mutedHint}
                      </p>
                    )}

                    <span
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[3px] bg-paper/15"
                      aria-hidden="true"
                    >
                      <span
                        ref={(el) => {
                          barRefs.current[reel.id] = el
                        }}
                        className="block h-full origin-left scale-x-0 bg-gold-400"
                      />
                    </span>
                  </div>

                  <figcaption className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[0.8125rem] font-medium text-paper/85">
                      {copy.reel} {number}
                    </span>
                    <span className="tabular text-xs text-paper/60">
                      {formatDuration(reel.duration)}
                    </span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-4 border-t border-paper/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-paper/65">{copy.note}</p>
          {(link || instagramHref) && (
            <div className="flex flex-wrap items-center gap-3">
              {link && (
                <Link
                  href={link.href}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-xs font-semibold text-forest-950 transition-colors hover:bg-gold-400"
                >
                  {link.label}
                  <Icon name="arrow" className="h-3.5 w-3.5 rtl:-scale-x-100" />
                </Link>
              )}
              {instagramHref && (
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-xs font-semibold text-paper/85 transition-colors hover:border-gold-400/60 hover:text-gold-300"
                >
                  <Icon name="instagram" className="h-4 w-4" />
                  {copy.instagram}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
