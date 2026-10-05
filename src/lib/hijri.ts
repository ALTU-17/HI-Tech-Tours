/**
 * Gregorian and Hijri date formatting for the loading screen.
 *
 * Two rules govern everything here:
 *
 *  1. NEVER use `Intl.DateTimeFormat` for the rendered strings. ICU data is
 *     version-dependent and Node and browsers disagree: Node's ICU emits a
 *     zero-width joiner (U+091F) inside Devanagari month names where Chrome
 *     does not. The strings look identical but their code points differ, so
 *     React fails hydration with "Text content did not match" on every Hindi
 *     page. Month names are therefore spelled out below and the numeric parts
 *     are read from `getUTC*` directly. Output is byte-identical everywhere.
 *
 *  2. The Hijri conversion must use a real Julian Day Number. `HIJRI_EPOCH` is
 *     a genuine JDN (1948440 ≈ 1 Muharram AH 1, tabular), so the Gregorian
 *     side has to produce a genuine JDN too — the Unix epoch is JDN 2440588,
 *     not 719468. Pairing a true JDN with a false one yields a year of -3409.
 *
 * This is used only for the decorative date on the loading screen. The Hijri
 * reckoning here is tabular and approximate; it is deliberately not used
 * anywhere that would imply religious authority.
 */

/** Julian Day Number of 1970-01-01 (the Unix epoch). */
const UNIX_EPOCH_JDN = 2440588
/** Julian Day Number of 1 Muharram AH 1, tabular Islamic calendar. */
const HIJRI_EPOCH_JDN = 1948440

function julianDay(date: Date) {
  return (
    Math.floor((date.getTime() - Date.UTC(1970, 0, 1)) / 86400000) + UNIX_EPOCH_JDN
  )
}

/** @returns [hijriYear, hijriMonth, hijriDay] — month is 1-based. */
export function toHijri(date: Date): [number, number, number] {
  const days = julianDay(date) - HIJRI_EPOCH_JDN
  const year = Math.floor((days * 30) / 10631) + 1
  const monthStart = Math.floor(((year - 1) * 10631) / 30)
  const month = Math.floor((days - monthStart) / 29.5) + 1
  const day =
    days - Math.floor(((year - 1) * 10631) / 30) - Math.floor((month - 1) * 29.5) + 1
  return [year, month, Math.round(day)]
}

const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * Devanagari month names, written out rather than taken from ICU.
 * See rule 1 above — this list is the reason hydration passes on `/hi`.
 */
const MONTHS_HI = [
  'जनवरी',
  'फ़रवरी',
  'मार्च',
  'अप्रैल',
  'मई',
  'जून',
  'जुलाई',
  'अगस्त',
  'सितंबर',
  'अक्तूबर',
  'नवंबर',
  'दिसंबर',
]

const HIJRI_MONTHS_EN = [
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

const HIJRI_MONTHS_HI = [
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

const clampMonth = (m: number) => Math.min(11, Math.max(0, m - 1))

export function formatHijri(date: Date, locale: 'en' | 'hi') {
  const [year, month, day] = toHijri(date)
  const months = locale === 'hi' ? HIJRI_MONTHS_HI : HIJRI_MONTHS_EN
  const name = months[clampMonth(month)]
  return locale === 'hi'
    ? `${day} ${name} ${year} हिजरी`
    : `${day} ${name} ${year} AH`
}

export function formatGregorian(date: Date, locale: 'en' | 'hi') {
  const months = locale === 'hi' ? MONTHS_HI : MONTHS_EN
  const day = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${day} ${month} ${year}`
}