import Link from 'next/link'

import { cn } from '@/lib/cn'
import { Icon } from '../Icon'

export function SectionHeading({
  kicker,
  title,
  lede,
  align = 'left',
  tone = 'light',
  className,
}: {
  kicker?: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {kicker && (
        <p className={cn('kicker mb-3', dark && 'text-gold-300')}>{kicker}</p>
      )}
      <h2
        className={cn(
          'text-[1.75rem] leading-[1.15] sm:text-[2.1rem] lg:text-[2.5rem]',
          dark ? 'text-paper' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            'mt-4 text-[1.0625rem] leading-relaxed',
            dark ? 'text-paper/70' : 'text-ink-soft',
          )}
        >
          {lede}
        </p>
      )}
      {align === 'center' && <div className="rule-gold mx-auto mt-6 w-24" />}
    </div>
  )
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-forest-800 text-paper hover:bg-forest-700 shadow-[0_10px_30px_-12px_rgb(6_46_34/0.6)]',
  secondary:
    'border border-forest-700/25 text-forest-800 hover:border-forest-700/60 hover:bg-forest-100/60',
  ghost: 'text-forest-800 hover:bg-forest-100/60',
  gold: 'bg-gold-500 text-forest-950 hover:bg-gold-400 shadow-[0_10px_30px_-12px_rgb(201_162_39/0.7)]',
}

const sizes = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-[0.9375rem]',
}

export function ActionLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon = 'arrow',
  external,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: ButtonVariant
  size?: keyof typeof sizes
  icon?: 'arrow' | 'external' | null
  external?: boolean
  className?: string
}) {
  const inner = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon === 'external' ? 'external' : 'arrow'}
          className={cn(
            'h-4 w-4 transition-transform duration-300',
            icon === 'arrow' && 'rtl:-scale-x-100',
          )}
        />
      )}
    </>
  )
  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98]',
    variants[variant],
    sizes[size],
    className,
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  )
}

export function Breadcrumbs({
  trail,
}: {
  trail: Array<{ name: string; href: string }>
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-muted">
        {trail.map((item, i) => {
          const last = i === trail.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink-soft">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="transition-colors hover:text-forest-700">
                    {item.name}
                  </Link>
                  <Icon name="arrow" className="h-3 w-3 opacity-40 rtl:-scale-x-100" />
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}