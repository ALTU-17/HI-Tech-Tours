/**
 * Approximate Gregorian → Hijri conversion (tabular Islamic calendar).
 *
 * Used only for the decorative date on the loading screen. It is accurate to
 * within about a day and is deliberately NOT used anywhere that would imply
 * religious authority — for anything date-sensitive in a pilgrimage context,
 * the office's own reckoning is authoritative.
 */

const GREGORIAN_EPOCH = 719468 // Julian day of 1 Jan 1970 in the tabular epoch
const HIJRI_EPOCH = 1948440 // Julian day of 1 Muharram AH 1

function julianDay(date: Date) {
  return (
    Math.floor((date.getTime() - Date.UTC(1970, 0, 1)) / 86400000) + GREGORIAN_EPOCH
  )
}

/** @returns [hijriYear, hijriMonth, hijriDay] */
export function toHijri(date: Date): [number, number, number] {
  const days = julianDay(date) - HIJRI_EPOCH
  const year = Math.floor((days * 30) / 10631) + 1
  const monthStart = Math.floor(((year - 1) * 10631) / 30)
  const month = Math.floor((days - monthStart) / 29.5) + 1
  const day = days - Math.floor(((year - 1) * 10631) / 30) - Math.floor((month - 1) * 29.5) + 1
  return [year, month, Math.round(day)]
}

export function formatHijri(date: Date, locale: 'en' | 'hi') {
  const [year, month, day] = toHijri(date)
  const monthsEn = [
    'Muharram',
    'Safar',
    "Rabī' al-Awwal",
    "Rabī' al-Thānī",
    'Jumādā al-Ūlā',
    'Jumādā al-Ākhirah',
    'Rajab',
    "Shaʿbān",
    'Ramadān',
    'Shawwāl',
    "Dhū al-Qaʿdah",
    'Dhū al-Ḥijjah',
  ]
  const monthsHi = [
    'मुहर्रम',
    'सफ़र',
    'रबीउल अव्वल',
    'रबीउस्सानी',
    'जुमादाउल अव्वल',
    'जुमादाउस्साकिया',
    'रजब',
    'शाबान',
    'रमज़ान',
    'शौवाल',
    'ज़ुलक़दा',
    'ज़ुलहिज्जा',
  ]
  const months = locale === 'hi' ? monthsHi : monthsEn
  const safeMonth = Math.min(11, Math.max(0, month - 1))
  return locale === 'hi'
    ? `${day} ${months[safeMonth]} ${year} हिजरी`
    : `${day} ${months[safeMonth]} ${year} AH`
}

export function formatGregorian(date: Date, locale: 'en' | 'hi') {
  return new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN-u-nu-latn' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}