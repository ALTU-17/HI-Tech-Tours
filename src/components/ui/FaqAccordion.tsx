'use client'

import { useState } from 'react'

import type { FaqItem } from '@/data/faq'
import { cn } from '@/lib/cn'
import { getDictionary, type Locale } from '@/i18n'
import { Icon } from '../Icon'

/**
 * FAQ accordion.
 *
 * Rendered with real buttons and aria-expanded rather than a <details> stack,
 * because the answers are also the source for FAQPage structured data and the
 * two must stay visibly identical.
 *
 * The first item starts open — a collapsed accordion gives a crawler and a
 * first-time visitor the same thin slice of content, and on a page whose job
 * is answering questions that is the wrong first impression.
 */
export function FaqAccordion({
  items,
  locale,
  defaultOpen = 0,
}: {
  items: FaqItem[]
  locale: Locale
  defaultOpen?: number | null
}) {
  const d = getDictionary(locale)
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div className="divide-y divide-sand/70 overflow-hidden rounded-card border border-sand/80 bg-cream">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q.en} className={isOpen ? 'bg-forest-100/25' : undefined}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="text-[1.0625rem] leading-snug font-semibold text-ink">
                  {item.q[locale]}
                </span>
                <span
                  className={cn(
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                    isOpen
                      ? 'rotate-45 border-forest-700 bg-forest-800 text-paper'
                      : 'border-forest-700/25 text-forest-700',
                  )}
                >
                  <Icon name="plus" className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="px-5 pb-5 text-[0.9375rem] leading-relaxed text-ink-soft sm:px-6"
            >
              {item.a[locale]}
            </div>
          </div>
        )
      })}
      <p className="sr-only">{d.sections.faq.lede}</p>
    </div>
  )
}