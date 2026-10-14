'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '@/components/Icon'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { GalleryImage } from '@/data/gallery'
import { cn } from '@/lib/cn'

export type GalleryCopy = {
  eyebrow: string
  title: string
  lede: string
  prev: string
  next: string
  close: string
  open: string
  alt: string
  note: string
}

/**
 * Gallery carousel.
 *
 * The photographs come from `public/gallery/` (see `src/data/gallery.ts`), so the
 * owner adds pictures by dropping files in a folder — not by editing code.
 *
 * Three behaviours matter here:
 *
 *  1. It is a real scroll container with scroll-snap, so it works like every
 *     native gallery: swipe on a phone, trackpad on a laptop, arrow keys when
 *     the strip has focus. The buttons are an enhancement, not the mechanism —
 *     nothing is trapped if JavaScript is slow.
 *  2. Every photograph is a button that opens it full size. The frame crops to
 *     a portrait card for a tidy row; the lightbox shows the whole picture.
 *  3. Motion respects `prefers-reduced-motion` — jumping instead of gliding.
 */
export function GalleryCarousel({
  images,
  copy,
  className,
}: {
  images: GalleryImage[]
  copy: GalleryCopy
  className?: string
}) {
  const trackRef = useRef<HTMLUListElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const lastOpenRef = useRef<number | null>(null)

  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: true })
  const [open, setOpen] = useState<number | null>(null)

  const count = images.length
  const isOpen = open !== null

  // Which card the counter is on, read from scroll position so it survives a
  // resize, a restored scroll, or a card being a different width per breakpoint.
  //
  // The active card is the offset in whole cards, not whatever sits nearest the
  // middle of the row: the strip snaps each card to its start, so on a wide
  // screen the card at the left edge is the one the counter is describing.
  const read = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'))
    const max = track.scrollWidth - track.clientWidth

    if (slides.length) {
      const last = slides.length - 1
      const first = slides[0].getBoundingClientRect()
      const gap = last > 0 ? slides[1].getBoundingClientRect().left - first.right : 0
      const stride = first.width + Math.max(0, gap)
      // No rounding to the final card at the far right: the counter names the
      // card sitting at the start of the row, which is what a scroll-snap offset
      // already says. (Six cards, four visible, means the last offset still
      // leaves card 3 at the left edge — and that is the honest number.)
      const index = max <= 8 ? 0 : Math.min(last, Math.max(0, Math.round(track.scrollLeft / stride)))
      setActive(index)
    }

    setProgress(max > 8 ? Math.min(1, Math.max(0, track.scrollLeft / max)) : 1)
    setEdges({ start: track.scrollLeft <= 2, end: max <= 8 || track.scrollLeft >= max - 2 })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    read()
    track.addEventListener('scroll', read, { passive: true })
    window.addEventListener('resize', read)
    return () => {
      track.removeEventListener('scroll', read)
      window.removeEventListener('resize', read)
    }
  }, [read])

  const goTo = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const slides = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'))
    const slide = slides[index]
    if (!slide) return
    const delta = slide.getBoundingClientRect().left - track.getBoundingClientRect().left
    track.scrollBy({ left: delta, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  const step = useCallback((direction: -1 | 1) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector<HTMLElement>('[data-slide]')
    const gap = 20 // gap-5
    const amount = slide
      ? (slide.getBoundingClientRect().width + gap) * direction
      : track.clientWidth * 0.8 * direction
    track.scrollBy({ left: amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [])

  // Keep the strip under the lightbox, so closing a photograph leaves the row
  // where the eye left it — and remember which card that was, for focus.
  useEffect(() => {
    if (open === null) return
    lastOpenRef.current = open
    goTo(open)
  }, [open, goTo])

  // While the lightbox is up: lock the page, take focus, and own the keyboard.
  useEffect(() => {
    if (!isOpen) return
    // Captured now, because a cleanup must not read a ref that may have moved on.
    const track = trackRef.current

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(null)
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setOpen((current) => (current === null ? current : Math.min(count - 1, current + 1)))
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setOpen((current) => (current === null ? current : Math.max(0, current - 1)))
        return
      }
      if (event.key !== 'Tab') return

      // Keep Tab inside the dialog rather than letting it walk the page behind.
      const node = dialogRef.current
      if (!node) return
      const focusable = node.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow

      // Return focus to the photograph the visitor was last looking at rather
      // than the one they originally opened: that keeps focus, the strip and the
      // counter on the same card instead of scrolling the row back.
      const slides = track?.querySelectorAll<HTMLElement>('[data-slide] button')
      const last = lastOpenRef.current
      const target = (last === null ? undefined : slides?.[last]) ?? triggerRef.current
      target?.focus()

      // Focusing a card scrolls the strip, and that scroll fires no event this
      // component listens for — so re-read the position once layout has settled.
      requestAnimationFrame(read)
    }
  }, [isOpen, count, read])

  const current = open === null ? null : images[open]

  return (
    <section
      id="gallery"
      className={cn(
        'relative scroll-mt-24 overflow-hidden bg-forest-950 py-20 text-paper sm:py-24',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-arabesque opacity-[0.06]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-forest-600/25 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative container-page">
        <Reveal>
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <SectionHeading
              kicker={copy.eyebrow}
              title={copy.title}
              lede={copy.lede}
              tone="dark"
            />

            {count > 1 && (
              <div className="flex shrink-0 items-center gap-4">
                <p className="tabular text-sm text-paper/60">
                  <span className="text-[1.0625rem] font-semibold text-paper">
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <span className="mx-1.5 text-paper/35">/</span>
                  {String(count).padStart(2, '0')}
                </p>

                <div className="flex gap-2">
                  {([
                    { dir: -1 as const, label: copy.prev, disabled: edges.start, flip: true },
                    { dir: 1 as const, label: copy.next, disabled: edges.end, flip: false },
                  ]).map((control) => (
                    <button
                      key={control.label}
                      type="button"
                      onClick={() => step(control.dir)}
                      disabled={control.disabled}
                      aria-label={control.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-gold-400/70 hover:text-gold-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-paper/25 disabled:hover:text-paper"
                    >
                      <Icon
                        name="arrow"
                        className={cn(
                          'h-4.5 w-4.5',
                          control.flip ? 'rotate-180 rtl:rotate-0 rtl:-scale-x-100' : 'rtl:-scale-x-100',
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <ul
            ref={trackRef}
            className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-1 [scroll-padding-inline:1.25rem] [scrollbar-width:none] md:-mx-8 md:px-8 md:[scroll-padding-inline:2rem] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((image, index) => (
              <li
                key={image.src}
                data-slide
                className="w-[78vw] shrink-0 snap-start sm:w-[52vw] md:w-[40vw] lg:w-[calc((100%-3.75rem)/4)]"
              >
                <figure className="group/card">
                  <button
                    type="button"
                    onClick={(event) => {
                      triggerRef.current = event.currentTarget
                      setOpen(index)
                    }}
                    aria-label={image.label ? `${copy.open}: ${image.label}` : copy.open}
                    className="relative block aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-forest-900 ring-1 ring-paper/10 transition-shadow duration-500 hover:ring-gold-400/50 focus-visible:ring-gold-400/70"
                  >
                    <Image
                      src={image.src}
                      alt={image.label || copy.alt}
                      fill
                      sizes="(min-width:1024px) 24vw, (min-width:768px) 40vw, (min-width:640px) 52vw, 78vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-[1.045]"
                    />

                    <span
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/5 to-transparent"
                      aria-hidden="true"
                    />

                    <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-forest-950/60 text-paper/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
                      <Icon name="expand" className="h-4 w-4" />
                    </span>

                    {image.label && (
                      <span className="pointer-events-none absolute inset-x-4 bottom-3.5 text-start font-display text-[0.9375rem] leading-snug text-paper">
                        {image.label}
                      </span>
                    )}
                  </button>
                </figure>
              </li>
            ))}
          </ul>

          <div className="mt-7 h-[2px] w-full overflow-hidden rounded-full bg-paper/10" aria-hidden="true">
            <span
              className="block h-full origin-left rounded-full bg-gold-400 transition-transform duration-300 ease-out"
              style={{
                transform: `scaleX(${Math.max(progress, 1 / Math.max(count, 1))})`,
              }}
            />
          </div>

          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-paper/65">{copy.note}</p>
        </Reveal>
      </div>

      {open !== null &&
        current &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(null)
            }}
            className="fixed inset-0 z-[90] flex flex-col bg-forest-950/95 backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="tabular text-sm text-paper/60">
                <span className="text-[1.0625rem] font-semibold text-paper">
                  {String(open + 1).padStart(2, '0')}
                </span>
                <span className="mx-1.5 text-paper/35">/</span>
                {String(count).padStart(2, '0')}
              </p>

              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(null)}
                aria-label={copy.close}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-gold-400/70 hover:text-gold-300"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-6">
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setOpen(Math.max(0, open - 1))}
                    disabled={open === 0}
                    aria-label={copy.prev}
                    className="absolute left-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-forest-950/70 text-paper ring-1 ring-paper/20 backdrop-blur-sm transition-colors hover:ring-gold-400/70 hover:text-gold-300 disabled:opacity-25 sm:left-3"
                  >
                    <Icon name="arrow" className="h-5 w-5 rotate-180 rtl:rotate-0 rtl:-scale-x-100" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(Math.min(count - 1, open + 1))}
                    disabled={open === count - 1}
                    aria-label={copy.next}
                    className="absolute right-1 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-forest-950/70 text-paper ring-1 ring-paper/20 backdrop-blur-sm transition-colors hover:ring-gold-400/70 hover:text-gold-300 disabled:opacity-25 sm:right-3"
                  >
                    <Icon name="arrow" className="h-5 w-5 rtl:-scale-x-100" />
                  </button>
                </>
              )}

              <figure className="relative h-full w-full max-w-5xl">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.label || copy.alt}
                  fill
                  sizes="100vw"
                  loading="eager"
                  className="object-contain"
                />
              </figure>
            </div>

            {current.label && (
              <p className="px-4 pb-6 text-center font-display text-[0.9375rem] text-paper/80">
                {current.label}
              </p>
            )}
          </div>,
          document.body,
        )}
    </section>
  )
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
