import { en, type Dictionary } from './en'
import { hi } from './hi'

export type Locale = 'en' | 'hi'

export const locales: Locale[] = ['en', 'hi']
export const defaultLocale: Locale = 'en'

/** Human-readable names for the language switcher, in each language. */
export const localeNames: Record<Locale, { self: string; other: string; aria: string }> = {
  en: { self: 'English', other: 'हिंदी', aria: 'Switch language to Hindi' },
  hi: { self: 'हिंदी', other: 'English', aria: 'Switch language to English' },
}

const dictionaries: Record<Locale, Dictionary> = { en, hi }

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value)
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

/** Picks the right side of a `{ en, hi }` data object. */
export function t_(value: { en: string; hi: string }, locale: Locale): string {
  return value[locale] ?? value.en
}

/** Type guard for data-layer bilingual objects. */
export function isBilingual(value: unknown): value is { en: string; hi: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'en' in value &&
    'hi' in value &&
    typeof (value as { en: unknown }).en === 'string' &&
    typeof (value as { hi: unknown }).hi === 'string'
  )
}

/** Localised `<html lang>` plus BCP-47 tag used for hreflang. */
export function htmlLang(locale: Locale) {
  return locale === 'hi' ? 'hi-IN' : 'en-IN'
}
export function hreflang(locale: Locale) {
  return locale
}

/**
 * Builds a locale-aware path. `path` should be locale-less, e.g. `/umrah-packages`.
 */
export function localePath(locale: Locale, path = '') {
  const clean = path.replace(/^\/+|\/+$/g, '')
  return clean ? `/${locale}/${clean}` : `/${locale}`
}

/** Swaps the locale segment of an already-localised path, preserving the rest. */
export function swapLocalePath(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return `/${next}`
  if (isLocale(segments[0])) {
    segments[0] = next
  } else {
    segments.unshift(next)
  }
  return `/${segments.join('/')}`
}
