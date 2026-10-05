import type { ServiceIcon } from '@/data/services'
import { cn } from '@/lib/cn'

/**
 * Inline icon set.
 *
 * Hand-drawn as single-stroke 24×24 paths rather than pulled from an icon
 * package: it keeps the bundle free of a dependency, keeps every glyph on the
 * same grid, and means the service icons read as one family instead of seven
 * unrelated styles.
 */

const paths: Record<ServiceIcon | 'phone' | 'whatsapp' | 'pin' | 'clock' | 'check' | 'arrow' | 'star' | 'plus' | 'minus' | 'external' | 'shield' | 'plane2' | 'code' | 'mail', string> = {
  plane: 'M2.5 13.5 L21 4 L15.5 11.5 M14 12 L21 4 L11.5 14 L9 20 L7 16 L2.5 13.5 Z',
  hotel: 'M3 19V6.5h18V19M3 19h18M7.5 10h3M13.5 10h3M7.5 14h9M6.5 19v-2h3v2M14.5 19v-2h3v2',
  visa: 'M3.5 7.5h17v12h-17zM6.5 4.5h11v3h-11zM7.5 12.5h4M7.5 15.5h7M14.5 12.5h2.5v3h-2.5z',
  food: 'M4 4v7a3 3 0 0 0 6 0V4M7 11v9M16.5 4c-1.6 1.4-2.2 3.4-2.2 5.6 0 1.6.6 2.6 2.2 2.9V20',
  mosque: 'M12 3l2.2 3.2a2.4 2.4 0 0 1-3.1 3.6h0A2.4 2.4 0 0 1 9.8 6.2zM3 20v-4.5a4.5 4.5 0 0 1 5-4.5 4.5 4.5 0 0 1 5 4.5V20zM8.5 20v-2.5a3.5 3.5 0 0 1 7 0V20M16 20v-3.5a2.5 2.5 0 0 1 4 2V20',
  bus: 'M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5V16H4zM4 10.5h16M7 16v2M17 16v2M7.5 13h1.5M15 13h1.5M6.5 4V2.5M17.5 4V2.5',
  kaaba: 'M5 6h14v14H5zM5 11h14M12 6v14M2.5 20h19',
  guide: 'M12 3.2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4M12 7.6V15M12 15l-3 5.5M12 15l3 5.5M6.5 9.5l5.5 2 5.5-2',
  laundry: 'M5 4h14v16H5zM7.5 8h9M7.5 8a4.5 4.5 0 0 1 9 0M12 12.5a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2M9 15.2h.01M15 15.2h.01',
  zamzam: 'M12 3.5s5 5.2 5 8.8a5 5 0 0 1-10 0c0-3.6 5-8.8 5-8.8M9.5 13.5a2.6 2.6 0 0 0 2.6 2.6',
  luggage: 'M7 8h10a1.5 1.5 0 0 1 1.5 1.5V19H5.5V9.5A1.5 1.5 0 0 1 7 8M9.5 8V4.5h5V8M9 12v3.5M15 12v3.5M5.5 15.5h13',
  docs: 'M6 3h7l5 5v13H6zM13 3v5h5M9 12.5h6M9 16h4',
  phone: 'M5.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.7 2 2 0 0 1 5.5 3.5M18 3.2a5 5 0 0 1 2.8 2.8M18 6.6a1.8 1.8 0 0 1 1.4 1.4',
  whatsapp: 'M3.6 20.4l1.3-4.4A8.3 8.3 0 1 1 8 19.4zM8.7 8.2c-.2 0-.5.1-.6.4-.2.4-.7 1-.7 2.2s.7 2.5.8 2.7c.1.2 1.4 2.3 3.5 3.1 1.8.7 2.1.6 2.5.5.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1.2-.5-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4z',
  pin: 'M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7.5V12l3 2',
  check: 'M4.5 12.5l5 5 10-11',
  arrow: 'M5 12h13M13 6.5l5.5 5.5L13 17.5',
  star: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8-5.3-2.8-5.3 2.8 1.1-5.8L3.5 9.7l5.9-.8z',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  external: 'M14 4h6v6M20 4l-8.5 8.5M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10',
  shield: 'M12 3l7.5 3v6c0 4.5-3.2 7.6-7.5 9-4.3-1.4-7.5-4.5-7.5-9V6zM9 12l2.2 2.2L15.5 10',
  plane2: 'M3 12h7l3-2 3 2h5M12 5v7M12 12v7',
  code: 'M9 7.5 L4.5 12 L9 16.5M15 7.5 L19.5 12 L15 16.5M11.5 19 L13.5 5',
  mail: 'M3 5.5h18v13H3zM3.5 6.5L12 13l8.5-6.5',
}

export type IconName = keyof typeof paths

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-5 w-5 shrink-0', className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}