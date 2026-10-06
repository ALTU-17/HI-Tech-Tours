/**
 * English dictionary. This object is the source of truth for the `Dictionary`
 * type — `hi.ts` is typed against it, so a missing or misspelled key is a
 * compile error rather than a blank spot on the page.
 *
 * Devanagari note: Devanagari needs more leading than Latin script and must
 * never carry letter-spacing. Both are handled in globals.css via the `hi`
 * language selector, not per-element.
 */

export const en = {
  meta: {
    title: 'Hi-Tech Haj Umrah Services — Haj & Umrah from Aurangabad, Marathwada',
    titleTemplate: '%s · Hi-Tech Haj Umrah Services',
    description:
      'Haj and Umrah travel services from Aurangabad serving all eight districts of Marathwada. Umrah packages, visa assistance, air tickets, hotels, ziyarat, Indian food and on-ground support in Makkah and Madinah.',
    ogAlt: 'Hi-Tech Haj Umrah Services, Aurangabad — Haj and Umrah packages for Marathwada',
  },

  nav: {
    home: 'Home',
    umrah: 'Umrah Packages',
    hajj: 'Hajj',
    services: 'Services',
    locations: 'Marathwada',
    guides: 'Guides',
    about: 'About',
    reviews: 'Reviews',
    faq: 'FAQ',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    switchTo: 'हिंदी में पढ़ें',
    switchToAria: 'Switch language to Hindi',
    languageLabel: 'Language',
    callNow: 'Call now',
    whatsapp: 'WhatsApp',
  },

  common: {
    learnMore: 'Learn more',
    viewAll: 'View all',
    viewPackage: 'See inclusions',
    callForRate: 'Call for current rate',
    inclusions: 'What is included',
    exclusions: 'Not included',
    idealFor: 'Best for',
    backTo: 'Back to',
    home: 'Home',
    breadcrumbLabel: 'Breadcrumb',
    lastUpdated: 'Last updated',
    verifiedOn: 'Verified on',
    minutes: 'min walk',
    approx: 'approximate',
    perGroup: 'per group',
    year: 'year',
    readingTime: 'min read',
    skipToContent: 'Skip to content',
    callUs: 'Call the office',
    whatsappUs: 'Message on WhatsApp',
    official: 'Official contacts',
  },

  hero: {
    eyebrow: 'Haj & Umrah from Marathwada',
    titleTop: 'Turn the dream of Umrah',
    titleBottom: 'into something real',
    subtitle:
      'Haj and Umrah packages for pilgrims across Marathwada, with the inclusions written down, the visa filed through the right channel, and someone to call on the ground in Makkah and Madinah.',
    chips: [
      'Three package tiers',
      'Group departures with local pickup',
      'Visa filed through the authorised channel',
      'Unlimited laundry included',
    ],
    stat1Label: 'Marathwada districts served',
    stat2Label: 'Direct contacts across the region',
    stat3Label: 'Umrah tiers to choose from',
    stat4Label: 'Years of service',
    statPending: 'Being confirmed with the office',
    scroll: 'Scroll',
  },

  sections: {
    packages: {
      eyebrow: 'Packages',
      title: 'Choose the tier that fits your journey',
      lede: 'Every package is quoted individually, because the rate depends on the month you travel and how many people are in your group. What never changes is what is included.',
    },
    inclusions: {
      eyebrow: 'Complimentary',
      title: 'Included at no extra charge',
      lede: 'The twelve items printed on our banner, honoured on every package — not as a promotion, but as standard.',
    },
    process: {
      eyebrow: 'How it works',
      title: 'Six steps from first call to return',
      lede: 'No step in this is a surprise. You always know what is happening and what comes next.',
    },
    pillars: {
      eyebrow: 'Why pilgrims choose us',
      title: 'Four commitments we can actually be held to',
      lede: 'Each one has a mechanism behind it, not just a promise.',
    },
    coverage: {
      eyebrow: 'Marathwada',
      title: 'Serving all eight districts of Marathwada',
      lede: 'Group pickups from your address, seats on the same flight, and a local number to call before you travel.',
    },
    reviews: {
      eyebrow: 'Reviews',
      title: 'What pilgrims from Marathwada say',
      lede: 'Real feedback from people who travelled with us.',
      googleCta: 'Read our reviews on Google',
      googleCtaPending: 'Create a Google Business Profile to publish verified reviews here',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Asked and answered, plainly',
      lede: 'The questions pilgrims ask most, answered without sales language.',
      more: 'Read the full FAQ',
    },
    branches: {
      eyebrow: 'Reach us',
      title: 'Eight numbers, one office',
      lede: 'Call the contact closest to you, or start at the Aurangabad head office.',
      mapTitle: 'Head office map',
      viewContact: 'Full contact page',
    },
  },

  home: {
    heroCtaPrimary: 'Call the Aurangabad head office',
    heroCtaSecondary: 'Ask on WhatsApp',
    reviewSampleNote:
      'Sample layout. These are placeholders — replace them with real customer reviews before launch. No ratings are shown in search results until genuine reviews are published.',
    reviewSampleChip: 'Sample',
    trustStrip: 'Nine districts · Six feeder cities · One office that answers',
    founderEyebrow: 'From the founder',
    founderTitle: 'The person at the other end of the line',
    founderLede:
      'Shaikh Ashfaq — Founder and Expedition Guide — leads every Aurangabad departure himself and carries the number you call when something needs sorting in Saudi Arabia.',
  },

  packagesPage: {
    title: 'Umrah packages',
    description:
      'Silver, Deluxe and Diamond Umrah tiers plus 15-day, 20-day and Ramzan Special departures, with the full inclusion list published for each.',
    lede: 'Six Umrah options and Hajj guidance, with every inclusion and exclusion listed in full. Rates are quoted per departure because the month you travel changes the price.',
    compareTitle: 'Which package should you pick?',
    noteTitle: 'On pricing',
    note: 'We do not publish fixed prices. Airline fares, hotel tariffs and group sizes all move, and a published number that turns out to be wrong costs you more trust than it earns. One call gives you an exact quote for your dates.',
  },

  hajjPage: {
    title: 'Hajj guidance and documentation',
    description:
      'Hajj in India is allotted only by the Haj Committee of India. We prepare your application, documents and pre-Hajj medical formalities correctly.',
    lede: 'Hajj quota in India comes from one place only: the Haj Committee of India, a statutory body under the Ministry of Minority Affairs. No agency can sell it, reserve it or allocate it. What we do is make sure that when you apply, nothing is rejected on a technicality.',
    factTitle: 'The three things to get right',
    ctaTitle: 'Talk to the Aurangabad head office about Hajj',
    ctaBody:
      'Bring your passport and any previous application paperwork. We will tell you exactly which step is yours and which ones we handle.',
  },

  servicesPage: {
    title: 'Services',
    description:
      'Umrah visa, air ticket, hotel, ziyarat, Indian food, AC bus transport, laundry, Zamzam, bag kit and Hajj application help.',
    lede: 'Twelve services, each with what it actually covers — and what it does not.',
  },

  locationsPage: {
    title: 'Marathwada and feeder cities',
    description:
      'Umrah and Hajj services for Jalna, CSN (Aurangabad), Nanded, Latur, Beed, Parbhani, Hingoli, Washim, Dharashiv and feeder cities, with the nearest airport and road distance for each.',
    lede: 'Pick your district for the nearest airport, the road distance, and the contact who handles your area.',
    nearestAirport: 'Nearest airport',
    airports: 'Airports we use',
    distance: 'Road distance',
    travelTime: 'Approx. travel time',
    localContact: 'Your contact',
    areaServed: 'We serve',
    inCity: 'In the city',
    pickupTitle: 'How pickup works here',
    pickupBody:
      'Passengers from this area are collected from their address, travel to the airport as one group, and are dropped back on return. Village pickups are combined with the nearest town pickup so nobody travels unaccompanied.',
    distanceNote:
      'Road distances are approximate and are shown for orientation. The exact itinerary, reporting time and collection point are confirmed by the office when a group is formed.',
  },

  contactPage: {
    title: 'Contact',
    description:
      'Call the Aurangabad head office or any of our eight branch contacts across CSN (Aurangabad) and Marathwada. Office hours, WhatsApp and directions.',
    lede: 'One call is usually enough to get an answer on packages, dates and the current rate.',
    headOffice: 'Head office',
    branchContacts: 'Branch contacts',
    hours: 'Office hours',
    directions: 'Get directions',
    branchesNote: 'Landmarks are reproduced as printed on our banner; full addresses are confirmed at the time of booking.',
    faqTitle: 'Before you call',
    pendingTitle: 'Information we are still confirming',
    pendingLede:
      'We would rather show you what is not yet confirmed than publish a number we cannot stand behind. These details are being verified with the office:',
  },

  aboutPage: {
    title: 'About us',
    description:
      'Hi-Tech Haj Umrah Services is a Haj and Umrah desk based in Aurangabad, Marathwada, with branch contacts across CSN (Aurangabad).',
    lede: 'A Haj and Umrah desk in Aurangabad, serving the eight districts of Marathwada with group departures that are planned and staffed locally.',
    storyTitle: 'How we work',
    story: [
      'We are based in Aurangabad, and most of the pilgrims who travel with us come from within a few hours of our door — Latur and Beed to the west, Nanded and Parbhani to the east, Washim and Hingoli to the north. That distance is the reason our office exists. A Haj and Umrah desk that is actually reachable changes how much help a family gets before they leave, and how much they can sort out when something goes wrong in a foreign country.',
      'The work is unglamorous and it is mostly preparation: checking that a passport has six months left, that a photograph is the right size and the right background, that a Hajj application names a previous attempt honestly. Most problems in this industry are not dramatic — they are a document that was slightly wrong, filed too late, or explained badly to someone who was nervous.',
      'So the promise is narrow on purpose. We will tell you the walking distance to the hotel before you pay. We will show you what is not included. We will not claim to get you Hajj quota, because nobody legitimately can. And when you are in Makkah, there will be a number you can call.',
    ],
    principlesTitle: 'What we will not do',
    principles: [
      'Promise Hajj quota. In India it is allocated by the Haj Committee of India and it cannot be bought, reserved or arranged by an agent.',
      'Tell you an Indian pilgrim can apply on Nusuk. They cannot — the visa goes through an authorised agent channel, which is the one we use.',
      'Publish a price that might be wrong by the time you read it.',
      'Add service charges after you have committed.',
      'Publish customer reviews we have not received.',
    ],
    teamTitle: 'Who you will speak to',
    teamLede: 'Eight named contacts across Marathwada, each with a direct number.',
  },

  reviewsPage: {
    title: 'Reviews',
    description: 'Pilgrim feedback from Marathwada for Hi-Tech Haj Umrah Services, Aurangabad.',
    lede: 'What people from across Marathwada have said after travelling with us.',
    sampleNote:
      'The reviews below are sample content showing how this page will look. They are not real customer reviews and are not published to search engines as such. Replace them with genuine reviews collected from pilgrims.',
    googleTitle: 'Verified reviews',
    googleBody:
      'Once a Google Business Profile is active for our Aurangabad head office, verified reviews will appear here and in search results. Until then, please ask anyone who travelled with us to leave a review — it is the most useful thing they can do for another pilgrim.',
  },

  faqPage: {
    title: 'Frequently asked questions',
    description:
      'Answers about Hajj and Umrah packages, the Umrah visa for Indian passport holders, Hajj quota in India, Ramadan Umrah, airports from Marathwada and what is included.',
    lede: 'Twelve questions pilgrims ask most, answered directly.',
  },

  guidesPage: {
    title: 'Guides',
    description:
      'Plain-language guides on Hajj and Umrah: the difference between them, the Umrah visa rules for Indians, how to choose a package, and planning from Marathwada.',
    lede: 'Written to answer the questions people actually ask — including the ones an AI assistant would give you a vague answer to.',
  },

  cta: {
    title: 'Talk to the Aurangabad head office',
    body: 'Tell us your district, how many pilgrims and roughly when you want to travel. We answer the same day with the packages that fit and a rate for your dates.',
    primary: 'Call now',
    secondary: 'WhatsApp',
  },

  footer: {
    tagline: 'Haj and Umrah services from Aurangabad, serving Marathwada.',
    quickLinks: 'Quick links',
    coverageLinks: 'Marathwada coverage',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
    disclaimer:
      'Hajj quota in India is allocated solely by the Haj Committee of India. No travel agency can allocate or sell Hajj quota, and none is claimed here.',
    builtNote: 'Information on this site is provided for guidance. Confirm current rates, visa rules and government policy with the office before you travel.',
  },

  loader: {
    preparing: 'Preparing your journey',
    fonts: 'Loading typography',
    content: 'Loading content',
    images: 'Loading imagery',
    ready: 'Bismillah — ready',
    verseEn: 'And undertake the Hajj for Allah',
    verseHi: 'और अल्लाह के लिए हज को अंजाम दें',
  },

  notFound: {
    title: 'Page not found',
    body: 'The page you were looking for is not here. Try the home page, or call the office and we will point you to the right place.',
    cta: 'Go to home page',
  },
}

// Deliberately NOT `as const`. Widening the literals to `string` is exactly
// what lets hi.ts satisfy `Dictionary` with different translated text — losing
// literal types costs nothing at runtime and buys compile-time completeness
// across both languages.
export type Dictionary = typeof en
