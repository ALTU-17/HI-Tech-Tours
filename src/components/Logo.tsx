import { cn } from '@/lib/cn'

/**
 * The logo lockup.
 *
 * Rebuilt as clean vector geometry from the banner artwork rather than traced
 * from the raster: an eight-fold star badge (a motif used throughout Islamic
 * art) enclosing a minimal Kaaba, with the bilingual wordmark beneath.
 *
 * Exported as a component for the page, and mirrored into /public/logo.svg so
 * schema.org has a stable, crawlable `logo` URL.
 */

type LogoProps = {
  /** `full` = badge + wordmark, `mark` = badge only. */
  variant?: 'full' | 'mark'
  className?: string
  tone?: 'light' | 'dark'
}

const wordmarkColor = {
  light: 'text-paper',
  dark: 'text-forest-900',
}

export function LogoBadge({ className, tone = 'dark' }: { className?: string; tone?: 'light' | 'dark' }) {
  const ring = tone === 'light' ? '#E0BC52' : '#C9A227'
  const star = tone === 'light' ? '#FBF7EF' : '#0B5D3B'
  const ground = tone === 'light' ? '#FBF7EF' : '#062E22'

  return (
    // `aria-hidden` because the wordmark beside it already names the brand.
    // No <title> child: the badge is decorative chrome and repeats the document
    // title once per placement, which muddies title parsing for crawlers.
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {/* Outer eight-point star, formed by two overlapping squares. */}
      <g fill="none" stroke={ring} strokeWidth="1.6" opacity="0.9">
        <path d="M32 3 L61 32 L32 61 L3 32 Z" />
        <path d="M32 11.7 L52.3 32 L32 52.3 L11.7 32 Z" opacity="0.5" />
        <circle cx="32" cy="32" r="29.4" opacity="0.35" />
      </g>

      {/* Minimal Kaaba: the cube with its gold band. */}
      <g>
        <rect x="20.5" y="24" width="23" height="23" rx="1.2" fill={star} opacity="0.94" />
        <rect x="20.5" y="32.4" width="23" height="3.6" fill={ring} />
        <rect x="34.6" y="24" width="3.4" height="23" fill={ring} opacity="0.65" />
        <rect x="20.5" y="46" width="23" height="1.6" fill={ground} opacity="0.22" />
      </g>
    </svg>
  )
}

export function Logo({ variant = 'full', className, tone = 'dark' }: LogoProps) {
  if (variant === 'mark') {
    return <LogoBadge className={cn('h-10 w-10', className)} tone={tone} />
  }

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <LogoBadge className="h-11 w-11 shrink-0" tone={tone} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.35rem] font-bold tracking-tight',
            wordmarkColor[tone],
          )}
        >
          HI-TECH
        </span>
        <span
          className={cn(
            'mt-1 text-[0.68rem] font-semibold tracking-[0.22em] uppercase',
            tone === 'light' ? 'text-gold-300' : 'text-forest-700',
          )}
        >
          Haj Umrah Services
        </span>
        <span
          className={cn(
            'mt-1 text-[0.62rem] font-medium tracking-[0.12em]',
            tone === 'light' ? 'text-paper/70' : 'text-ink-muted',
          )}
        >
          हज उमरा सर्विस
        </span>
      </span>
    </span>
  )
}