/**
 * Review wall.
 *
 * IMPORTANT — read before editing.
 * The business has no indexed public review presence yet, so every entry below
 * is SAMPLE CONTENT. Sample entries render with a visible "Sample" chip and
 * are deliberately EXCLUDED from JSON-LD: publishing fabricated reviews, or an
 * `aggregateRating` that no real customer has given, is a manual-action risk in
 * Google search results and a trust problem everywhere else.
 *
 * To go live properly:
 *   1. Create the Google Business Profile and collect genuine reviews.
 *   2. Paste them into this file with `verified: true` and a real `name`.
 *   3. Add `googleUrl` below — the Review component then links to the live
 *      listing and `LocalBusiness.sameAs` gains a real citation.
 * Entries with `verified: true` are the only ones rendered into schema.
 */

export type Review = {
  id: string
  /** Real name once verified; a role label ("Pilgrim, Latur") while unverified. */
  name: string
  city: string
  cityHi: string
  quote: { en: string; hi: string }
  /** Only used for display on verified entries. */
  rating?: number
  verified: boolean
}

export const googleUrl = '' // TODO(owner): paste the Google Business Profile URL

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Pilgrim, Latur',
    city: 'Latur',
    cityHi: 'लातूर',
    verified: false,
    quote: {
      en: 'Sample text — the office called me back the same day, collected my passport, and told me the walking distance to the hotel before I paid anything. That clarity is what I remember.',
      hi: 'नमूना पाठ — कार्यालय ने उसी दिन मुझे वापस कॉल किया, मेरा पासपोर्ट लिया, और पैसे देने से पहले होटल से पैदल दूरी बता दी। यही स्पष्टता याद है।',
    },
  },
  {
    id: 'r2',
    name: 'Pilgrim, Nanded',
    city: 'Nanded',
    cityHi: 'नांदेड़',
    verified: false,
    quote: {
      en: 'Sample text — the whole group from our area went on one bus to Hyderabad, so nobody had to figure out the airport alone. The bus bag and shoes bag were already packed when we reached.',
      hi: 'नमूना पाठ — हमारे पूरे इलाके का समूह एक ही बस में हैदराबाद गया, किसी को अकेले हवाई अड्डा समझना नहीं पड़ा। पहुँचने पर ही बस बैग और शूज़ बैग तैयार मिले।',
    },
  },
  {
    id: 'r3',
    name: 'Pilgrim, CSN (Aurangabad)',
    city: 'CSN (Aurangabad)',
    cityHi: 'छत्रपति संभाजीनगर',
    verified: false,
    quote: {
      en: 'Sample text — the ziyarat trip and Indian food were included exactly as written, and the laundry being unlimited genuinely made a thirty-day stay bearable.',
      hi: 'नमूना पाठ — ज़ियारत यात्रा और भारतीय भोजन जैसा लिखा था वैसा ही मिला, और असीमित लॉन्ड्री ने तीस दिन का ठहरना सहनीय बना दिया।',
    },
  },
  {
    id: 'r4',
    name: 'Pilgrim, Jalna',
    city: 'Jalna',
    cityHi: 'जालना',
    verified: false,
    quote: {
      en: 'Sample text — I compared three agencies in Jalna. This was the only one that showed me the inclusions list item by item and told me what was not included.',
      hi: 'नमूना पाठ — मैंने जालना में तीन एजेंसियों की तुलना की। केवल इन्हीं ने शामिल चीज़ें एक-एक करके दिखाईं और बताया कि क्या शामिल नहीं है।',
    },
  },
  {
    id: 'r5',
    name: 'Pilgrim, Beed',
    city: 'Beed',
    cityHi: 'बीड',
    verified: false,
    quote: {
      en: 'Sample text — the Hajj application paperwork was checked before I submitted, which is exactly the part that gets applications rejected.',
      hi: 'नमूना पाठ — हज आवेदन के कागज़ात जमा करने से पहले ही जाँच लिए गए, और यही वह हिस्सा है जहाँ आवेदन अस्वीकार होते हैं।',
    },
  },
  {
    id: 'r6',
    name: 'Pilgrim, Parbhani',
    city: 'Parbhani',
    cityHi: 'परभणी',
    verified: false,
    quote: {
      en: 'Sample text — five litres of Zamzam reached my family safely, packed the way it should be. Small thing, but it was the last thing I was worried about.',
      hi: 'नमूना पाठ — पाँच लीटर ज़मज़म ठीक से पैक होकर मेरे परिवार तक पहुँचा। छोटी बात, पर यही आख़िरी चिंता थी।',
    },
  },
]

/** Only verified reviews ever reach JSON-LD. */
export const verifiedReviews = reviews.filter((r) => r.verified)
export const hasVerifiedReviews = verifiedReviews.length > 0
