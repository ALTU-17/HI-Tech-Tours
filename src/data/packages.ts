/**
 * Package catalogue. Prices are deliberately NOT modelled: rates move with
 * season, group size and airline availability, and publishing a stale number
 * is worse than publishing none. Every card routes to call / WhatsApp instead,
 * which also keeps the JSON-LD Offer honest (no `price` field invented).
 *
 * `order` drives display; `featured` drives the home page rail.
 */

export type Package = {
  slug: string
  badge: { en: string; hi: string }
  duration: { en: string; hi: string }
  summary: { en: string; hi: string }
  idealFor: { en: string; hi: string }
  inclusions: string[]
  exclusions: string[]
  featured: boolean
  order: number
}

export const packages: Package[] = [
  {
    slug: 'economy-umrah',
    badge: { en: 'Economy', hi: 'इकॉनॉमी' },
    duration: { en: 'Standard duration', hi: 'सामान्य अवधि' },
    summary: {
      en: 'Our most accessible package — a straightforward first Umrah covering the essential rites, with hotels within a reasonable walking distance of the Haram.',
      hi: 'हमारा सबसे किफायती पैकेज — पहली उमरा के लिए आसान, ज़रूरी अनुष्ठानों के साथ और हरम से ठीक दूरी में होटल।',
    },
    idealFor: {
      en: 'First-time pilgrims and families prioritising affordability over hotel distance.',
      hi: 'पहली बार जाने वाले जायरीन और वे परिवार जो कीमत को होटल की दूरी से आगे रखते हैं।',
    },
    inclusions: [
      'Round-trip air ticket on a scheduled airline',
      'Umrah visa arranged through the authorised channel',
      'Hotel in Makkah and Madinah',
      'Shared AC transport between cities',
      'Indian food and Zamzam 5 litre',
      'Ziyarat trip in Makkah and Madinah',
      'Unlimited laundry during the stay',
      'Luggage, shoes bag and document bag',
      'Umrah bag kit',
      'Guidance and on-ground support',
    ],
    exclusions: [
      'Qurbani (sacrifice) charges unless quoted',
      'Personal shopping and excess luggage',
      'Visa-on-arrival top-up for stay extensions',
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'silver-umrah',
    badge: { en: 'Silver', hi: 'सिल्वर' },
    duration: { en: 'Standard duration', hi: 'सामान्य अवधि' },
    summary: {
      en: 'The balanced middle of our range — a better hotel category and smoother transfers for pilgrims who want more comfort without moving up a full tier.',
      hi: 'हमारी रेंज का संतुलित बीच का विकल्प — बेहतर होटल श्रेणी और आरामदायक सफर, बिना ऊपरी श्रेणी पर जाए।',
    },
    idealFor: {
      en: 'Families and senior pilgrims travelling for the second or third time.',
      hi: 'वे परिवार और बुज़ुर्ग जायरीन जो दूसरी या तीसरी बार उमरा कर रहे हैं।',
    },
    inclusions: [
      'Round-trip air ticket on a scheduled airline',
      'Umrah visa arranged through the authorised channel',
      'Upgraded hotel category in Makkah and Madinah',
      'AC bus transport with more comfortable seating',
      'Indian food and Zamzam 5 litre',
      'Extended ziyarat with guide',
      'Unlimited laundry during the stay',
      'Luggage, shoes bag and document bag',
      'Umrah bag kit',
      'Dedicated group leader and on-ground support',
    ],
    exclusions: [
      'Qurbani (sacrifice) charges unless quoted',
      'Personal shopping and excess luggage',
      'Triple/quad room sharing differences',
    ],
    featured: true,
    order: 2,
  },
  {
    slug: 'delhi-umrah',
    badge: { en: 'Delhi', hi: 'दिल्ली' },
    duration: { en: 'Delhi departures', hi: 'दिल्ली से रवाना' },
    summary: {
      en: 'Group departures from Delhi, with Makkah and Madinah hotels arranged together and a full pre-departure briefing for the whole group.',
      hi: 'दिल्ली से समूह रवाना — मक्का और मदीना के होटल एक साथ तय, पूर्व-प्रस्थान ब्रीफिंग के साथ।',
    },
    idealFor: {
      en: 'Pilgrims from outside Maharashtra, or anyone who prefers a Delhi departure over a Maharashtra connection.',
      hi: 'महाराष्ट्र के बाहर के जायरीन, या जो महाराष्ट्र कनेक्शन की बजाय दिल्ली से रवाना पसंद करते हैं।',
    },
    inclusions: [
      'Delhi–Saudi return air ticket',
      'Umrah visa arranged through the authorised channel',
      'Hotel in Makkah and Madinah',
      'Delhi airport assistance and group briefing',
      'Shared AC transport between cities',
      'Indian food and Zamzam 5 litre',
      'Ziyarat trip in Makkah and Madinah',
      'Unlimited laundry during the stay',
      'Luggage, shoes bag and document bag',
      'Umrah bag kit',
    ],
    exclusions: [
      'Travel to and from Delhi origin city',
      'Qurbani (sacrifice) charges unless quoted',
      'Visa-on-arrival top-up for stay extensions',
    ],
    featured: true,
    order: 3,
  },
  {
    slug: 'umrah-15-days',
    badge: { en: 'Umrah 15 Days', hi: 'उमरा 15 दिन' },
    duration: { en: '15 days', hi: '15 दिन' },
    summary: {
      en: 'A compact 15-day Umrah: enough time for the core rites, the essential ziyarat and a relaxed pace without a long absence from work.',
      hi: 'संक्षिप्त 15 दिन की उमरा — मुख्य अनुष्ठान, ज़रूरी ज़ियारत और आरामदायक गति, काम से लंबी छुट्टी के बिना।',
    },
    idealFor: {
      en: 'Working pilgrims and young families with a fixed leave window.',
      hi: 'कामकाजी जायरीन और युवा परिवार जिनके पास छुट्टी की तय अवधि है।',
    },
    inclusions: [
      'Round-trip air ticket on a scheduled airline',
      'Umrah visa arranged through the authorised channel',
      'Hotel in Makkah and Madinah',
      'Shared AC transport between cities',
      'Indian food and Zamzam 5 litre',
      'Short ziyarat with guide',
      'Unlimited laundry during the stay',
      'Luggage, shoes bag and document bag',
      'Umrah bag kit',
    ],
    exclusions: ['Qurbani (sacrifice) charges unless quoted', 'Personal shopping'],
    featured: false,
    order: 4,
  },
  {
    slug: 'umrah-30-days',
    badge: { en: 'Umrah 30 Days', hi: 'उमरा 30 दिन' },
    duration: { en: '30 days', hi: '30 दिन' },
    summary: {
      en: 'A month-long stay for those who prefer to learn the rites properly, travel at their own pace and spend real time in both cities.',
      hi: 'पूरे महीने का ठहरना — जो अनुष्ठान ठीक से सीखना चाहते हैं, अपनी गति से घूमना चाहते हैं और दोनों शहरों में वक्त बिताना चाहते हैं।',
    },
    idealFor: {
      en: 'Retirees, families travelling together, and pilgrims preparing mentally for Hajj.',
      hi: 'सुविधा प्राप्त, परिवार के साथ यात्रा करने वाले, और हज की मानसिक तैयारी कर रहे जायरीन।',
    },
    inclusions: [
      'Round-trip air ticket on a scheduled airline',
      'Umrah visa arranged through the authorised channel',
      'Hotel stay in Makkah and Madinah',
      'Shared AC transport between cities',
      'Indian food and Zamzam 5 litre',
      'Zohrana ziyarat and short guided ziyarat',
      'Unlimited laundry during the stay',
      'Luggage, shoes bag and document bag',
      'Umrah bag kit',
      'Extended on-ground support for a full month',
    ],
    exclusions: ['Qurbani (sacrifice) charges unless quoted', 'Personal shopping'],
    featured: false,
    order: 5,
  },
  {
    slug: 'ramadan-special',
    badge: { en: 'Ramadan Special', hi: 'रमजान स्पेशल' },
    duration: { en: '32–40 days', hi: '32–40 दिन' },
    summary: {
      en: 'The flagship Ramadan departure of 32–40 days — built around Taraweeh, Qiyam and the closing ten nights, with a schedule that leaves room for rest.',
      hi: '32–40 दिन का प्रमुख रमजान रवाना — तारावीह, कियाम और आख़िरी दस रातों के लिए बनाया गया, आराम का समय रखते हुए।',
    },
    idealFor: {
      en: 'Pilgrims who want to experience Ramadan in Makkah and Madinah at a measured pace.',
      hi: 'जो जायरीन मक्का और मदीना में रमजान को संतुलित गति से जीना चाहते हैं।',
    },
    inclusions: [
      'Round-trip air ticket on a scheduled airline',
      'Umrah visa arranged through the authorised channel',
      'Hotel stay across the full Ramadan period',
      'Shared AC transport between cities',
      'Indian food and Zamzam 5 litre',
      'Zohrana ziyarat and short guided ziyarat',
      'Unlimited laundry during the stay',
      'Luggage, shoes bag and document bag',
      'Umrah bag kit',
      'Group leader available throughout the stay',
    ],
    exclusions: ['Qurbani (sacrifice) charges unless quoted', 'Personal shopping'],
    featured: false,
    order: 6,
  },
  {
    slug: 'hajj-guidance',
    badge: { en: 'Hajj Guidance', hi: 'हज मार्गदर्शन' },
    duration: { en: 'As per Haj Committee of India cycle', hi: 'हज कमेटी ऑफ इंडिया के चक्र के अनुसार' },
    summary: {
      en: 'Hajj guidance and documentation support. Hajj in India is allotted only through the Haj Committee of India — we help you prepare the application, documents and pre-Hajj medical formalities correctly.',
      hi: 'हज की मार्गदर्शिका और दस्तावेज़ सहायता। भारत में हज का आवंटन केवल हज कमेटी ऑफ इंडिया के माध्यम से होता है — हम आवेदन, दस्तावेज़ और प्री-हज चिकित्सा की तैयारी में मदद करते हैं।',
    },
    idealFor: {
      en: 'Prospective Hajj pilgrims who want their application and paperwork handled correctly the first time.',
      hi: 'भावी हज जायरीन, जिन्हें आवेदन और दस्तावेज़ पहली बार में सही तरीके से तैयार करवाने हैं।',
    },
    inclusions: [
      'Guidance on the Haj Committee of India application channel',
      'Document checklist and preparation support',
      'Passport and photo guidance',
      'Medical and vaccination checklist briefing',
      'Travel logistics guidance for allotted embarkation points',
      'Group coordination for pilgrims from the same area',
    ],
    exclusions: [
      'Hajj quota allocation, which is decided by the Haj Committee of India',
      'Any fee charged by the Haj Committee of India',
    ],
    featured: false,
    order: 7,
  },
]

export const featuredPackages = packages.filter((p) => p.featured).sort((a, b) => a.order - b.order)

export function getPackage(slug: string) {
  return packages.find((p) => p.slug === slug)
}
