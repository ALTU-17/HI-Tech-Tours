/**
 * Single source of truth for the organisation's Name / Address / Phone (NAP).
 *
 * The same values feed the visible site, the JSON-LD graph, the sitemap,
 * llms.txt and the machine-readable feed at /data/packages.json. Entity
 * consistency across all of these is the strongest local-SEO and GEO signal
 * available, so nothing here may be duplicated anywhere else in the codebase.
 *
 * ---------------------------------------------------------------------------
 * OWNER ACTION REQUIRED — replace every value marked `TODO` below before going
 * live. See README.md § "Before you launch".
 * ---------------------------------------------------------------------------
 */

export const SITE_URL = 'https://hitech-haj-umrah.in'

export type Branch = {
  id: string
  person: string
  personHi: string
  phone: string
  locality: string
  localityHi: string
  area: string
  /** Flags a detail printed on the banner that still needs owner verification. */
  note?: string
}

export type Office = {
  id: string
  name: string
  nameHi: string
  type: string
  person: string
  personHi: string
  phone: string
  locality: string
  localityHi: string
  street: string
  streetHi: string
  hours: string
  hoursHi: string
  /** Owner-supplied map pin for this office. */
  mapUrl: string
}

export const site = {
  name: 'Hi-Tech Haj Umrah Services',
  nameHi: 'हज उमरा सर्विस',
  legalName: 'Hi-Tech Haj Umrah Services',
  tagline: 'Marathwada’s Haj & Umrah desk',
  taglineHi: 'मराठवाड़े की हज व उमरा सेवा',
  shortDescription:
    'Haj and Umrah travel services from Aurangabad, serving pilgrims across Marathwada with Umrah packages, visa assistance, air tickets, hotels, ziyarat and complete on-ground support in Makkah and Madinah.',
  shortDescriptionHi:
    'औरंगाबाद से हज व उमरा सेवाएँ — मराठवाड़े भर के जायरीनों के लिए उमरा पैकेज, वीज़ा सहायता, एयर टिकट, होटल, ज़ियारत और मक्का-मदीना में पूरी सहायता।',

  street: 'Jinsi Chowk, in front of Kelgaonkar Hospital, Jinsi Police Station Road',
  streetHi: 'जिन्सी चौक, केलगावकर हॉस्पिटल के सामने, जिन्सी पुलिस स्टेशन रोड',
  locality: 'Aurangabad',
  localityHi: 'औरंगाबाद',
  region: 'Maharashtra',
  regionHi: 'महाराष्ट्र',
  postalCode: '431203',
  country: 'IN',
  countryHi: 'भारत',
  /** Map pin of the head office, from the owner's maps link. */
  geo: { lat: 19.885166, lng: 75.340079 },

  /**
   * Confirmed by the owner (October 2026): +91 9303313313 is the single
   * business number printed on the banner, used for calls and WhatsApp.
   */
  phone: '9303313313',
  /** Confirmed same as `phone` — WhatsApp links open wa.me/919303313313. */
  whatsapp: '9303313313',
  email: 'info@hitech-haj-umrah.in', // TODO(owner)

  /** Claimed or to be confirmed before use. Rendered only once `verified`. */
  credentials: [
    {
      key: 'haj-umrah',
      value: 'Assisted Hajj & Umrah departures from Aurangabad, Marathwada',
      verified: true,
    },
    { key: 'iota', value: 'IATA recognised ticketing', verified: false },
    { key: 'tourism', value: 'Ministry of Tourism recognised tour operator', verified: false },
  ],

  /**
   * Banner groups. `verified: false` entries are rendered in the UI with a
   * "confirm with office" cue so we never assert an unconfirmed fact.
   */
  groups: [
    {
      name: 'Silver Umrah',
      nameHi: 'सिल्वर उमरा',
      duration: 'Standard duration',
      blurb: 'The entry tier — essential rites with hotels within a reasonable walking distance of the Haram.',
    },
    {
      name: 'Deluxe Umrah',
      nameHi: 'डीलक्स उमरा',
      duration: 'Standard duration',
      blurb: 'The balanced middle — upgraded hotel category and smoother transfers.',
    },
    {
      name: 'Diamond Umrah',
      nameHi: 'डायमंड उमरा',
      duration: 'Standard duration',
      blurb: 'The premium tier — closest hotel category to the Haram and priority handling.',
    },
    {
      name: 'Umrah 15 Days',
      nameHi: 'उमरा 15 दिन',
      duration: '15 days',
      blurb: 'A compact first-Umrah package built around the core rites and essential ziyarat.',
    },
    {
      name: 'Umrah 20 Days',
      nameHi: 'उमरा 20 दिन',
      duration: '20 days',
      blurb: 'Twenty unhurried days for the core rites, ziyarat and real time in both cities.',
    },
    {
      name: 'Ramzan Special Umrah',
      nameHi: 'रमजान स्पेशल उमरा',
      duration: '32–40 days',
      blurb: 'Extended stay across Ramadan for Taraweeh, Qiyam and the last ten nights.',
    },
  ],

  offices: [
    {
      id: 'aurangabad-head-office',
      name: 'Aurangabad Head Office',
      nameHi: 'औरंगाबाद मुख्य कार्यालय',
      type: 'head',
      person: 'Mohan Pathan',
      personHi: 'मोहन पठाण',
      phone: '9175107214',
      locality: 'Aurangabad, Maharashtra',
      localityHi: 'औरंगाबाद, महाराष्ट्र',
      street: 'Jinsi Chowk, in front of Kelgaonkar Hospital, Jinsi Police Station Road',
      streetHi: 'जिन्सी चौक, केलगावकर हॉस्पिटल के सामने, जिन्सी पुलिस स्टेशन रोड',
      hours: 'Sat–Thu, 9:30 am – 8:30 pm',
      hoursHi: 'शनि–गुरुवार, सवेरे ९:३० – रात्रि ८:३०',
      mapUrl: 'https://maps.app.goo.gl/oheuGFCW3mZ8R7mj7',
    },
  ] satisfies Office[],

  /**
   * Branch contacts printed on the banner. Several addresses are abbreviated
   * local landmarks rather than postal addresses; they are kept verbatim and
   * flagged so the owner can expand them.
   */
  branches: [
    {
      id: 'asgar',
      person: 'Sheikh Asfak',
      personHi: 'शेख अशफाक',
      phone: '9303313313',
      locality: 'Mahavir Chowk, Ambad',
      localityHi: 'महावीर चौक, अंबड',
      area: 'Jalna district',
    },
    {
      id: 'imran',
      person: 'Sheikh Imran',
      personHi: 'शेख इमरान',
      phone: '7276525242',
      locality: 'CSN (Aurangabad)',
      localityHi: 'छत्रपती संभाजीनगर(औरंगाबाद)',
      area: 'CSN (Aurangabad)',
    },
    {
      id: 'mohan',
      person: 'Mohan Pathan',
      personHi: 'मोहन पठाण',
      phone: '9175107214',
      locality: 'Jalna',
      localityHi: 'जालना',
      area: 'Jalna',
    },
    {
      id: 'yaseer',
      person: 'Yaseer Pathan',
      personHi: 'यासीर पठाण',
      phone: '9921834080',
      locality: 'In front of Kalareshwar Holisell, Railway Chowk, CSN (Aurangabad)',
      localityHi: 'केलारेश्वर हॉलिसेल के सामने, रेलवे चौक, छत्रपती संभाजीनगर(औरंगाबाद)',
      area: 'CSN (Aurangabad)',
    },
    {
      id: 'mustafa',
      person: 'Mohd Mujahid',
      personHi: 'मुहम्मद मुजाहिद',
      phone: '9028543538',
      locality: 'Near M.N. Bhavit, Manjeur, CSN (Aurangabad)',
      localityHi: 'एम.एन. भवित के पास, मंजूर, छत्रपति संभाजीनगर',
      area: 'CSN (Aurangabad)',
    },
    {
      id: 'riyaz',
      person: 'Maulana Riyaz Sahab',
      personHi: 'मौलाना रियाज साहब',
      phone: '9730229093',
      locality: 'Devgaon Kannad (Aurangabad)',
      localityHi: 'डेवगाँव कन्नड, औरंगाबाद',
      area: 'Devgaon Kannad (Aurangabad)',
    },
    {
      id: 'qari-akther',
      person: 'Qari Akther',
      personHi: 'कारी अख़्तर',
      phone: '8182828080',
      locality: 'Gevrai',
      localityHi: 'गेवराई',
      area: 'Beed district',
    },
    {
      id: 'ubaidullah',
      person: 'Ubaidullah Shah',
      personHi: 'उबेदुल्लाह शाह',
      phone: '9766633885',
      locality: 'Kamgar Chowk, Pandarpur, CSN (Aurangabad)',
      localityHi: 'कामगार चौक, पंडारपुर, औरंगाबाद',
      area: 'CSN (Aurangabad)',
    },
    // {
    //   id: 'qari-akbar',
    //   person: 'Qari Akbar',
    //   personHi: 'कारी अकबर',
    //   phone: '8182828080',
    //   locality: 'Pachma Ringana (landmark as printed on banner)',
    //   localityHi: 'पचमा रिंगणा (बैनर पर छपा निशान)',
    //   area: 'Jalna district',
    //   note: 'locality to be expanded by owner',
    // },
  ] as Branch[],

  /**
   * Founder profile — surfaced on the home page, About page, and in
   * the expedition guide article. Ashfaq Shaikh leads every Aurangabad
   * departure himself and carries the local number for the whole group.
   */
  founder: {
    name: 'Ashfaq Shaikh',
    nameHi: 'अशफ़ाक शेख़',
    title: 'Founder & Expedition Guide',
    titleHi: 'संस्थापक एवं प्रतिदिन मार्गदर्शक',
    phone: '9303313313',
    /** Multilingual bio rendered on /about and as the guide answer. */
    description: {
      en: 'Ashfaq Shaikh has led Umrah and Hajj groups from Aurangabad to Saudi Arabia for over a decade. He is hardworking from the first document check to the last return pickup, listing every detail so families never miss a step. He takes each and every pilgrim along with him — sab ku sath leke chalte hai — making sure no one is left to sort things out alone in a foreign country.',
      hi: 'अशफ़ाक शेख़ दशकों से औरंगाबाद से सऊदी अरब जाने वाले हज-उमरा समूहों का नेतृत्व करते हैं। वह पहली दस्तावेज़ जाँच से लेकर आखिरी वापसी पिकअप तक मेहनती रहते हैं, हर चीज़ को ध्यान में रखते हैं जिससे कोई परिवार कदम छोड़ न सके। वह हर एक जायरीन को साथ ले जाते हैं — सबकुछ साथ लेकर चलते हैं — यह सुनिश्चित करते हैं कि कोई विदेश में अकेला न रहे।',
    },
  },

  /**
   * Social handles — TODO(owner): create and confirm these profiles before
   * launch, then replace the placeholder handles below.
   */
  social: {
    facebook: 'https://www.facebook.com/hitech-haj-umrah-jalna',
    instagram: 'https://www.instagram.com/hitech.haj.umrah/',
    youtube: '',
  },

  /**
   * Aggregate facts. Only `verified` values are ever rendered as a number on
   * the page; the rest are suppressed rather than guessed.
   */
  stats: [
    { key: 'districts', value: 8, suffix: '', labelKey: 'stats.districts', verified: true },
    { key: 'contacts', value: 8, suffix: '', labelKey: 'stats.contacts', verified: true },
    { key: 'packageTiers', value: 3, suffix: '', labelKey: 'stats.packageTiers', verified: true },
    { key: 'years', value: null, suffix: '+', labelKey: 'stats.years', verified: false },
  ],

  /** Values the owner must supply; surfaced on /contact as a transparency note. */
  pendingFacts: [
    'Years in operation and total pilgrims served',
    'IATA / Ministry of Tourism registration numbers, if held',
    'Google Business Profile URL for verified customer reviews',
  ],
}

export type Site = typeof site

/** Full postal string used in schema.org and on the contact page. */
export function postalAddress(locale: 'en' | 'hi') {
  return {
    streetAddress: locale === 'hi' ? site.streetHi : site.street,
    addressLocality: locale === 'hi' ? site.localityHi : site.locality,
    addressRegion: locale === 'hi' ? site.regionHi : site.region,
    postalCode: site.postalCode,
    addressCountry: site.country,
  }
}

export const allContacts = [
  ...site.offices.map((o) => ({ ...o, isOffice: true as const })),
  ...site.branches.map((b) => ({ ...b, isOffice: false as const })),
]
