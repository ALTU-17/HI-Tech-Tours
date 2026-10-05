/**
 * Location pages — the core local-SEO asset.
 *
 * Nine Marathwada districts plus six feeder cities, each statically generated
 * at /[locale]/locations/[slug]. Distances are approximate road distances and
 * are labelled as such on the page; the office confirms the exact itinerary
 * when a group is formed.
 */

export type Airport = {
  code: string
  name: string
  nameHi: string
  distanceKm: number
  travelTime: string
}

export type Location = {
  slug: string
  name: string
  nameHi: string
  state: string
  kind: 'marathwada' | 'feeder'
  /** Shown in the coverage grid. */
  hub: { en: string; hi: string }
  airports: Airport[]
  /** Nearest HI-TECH contact for this area. */
  contactName: string
  contactNameHi: string
  contactPhone: string
  /** {en,hi} prose hook rendered as the page's answer-shaped first paragraph. */
  answer: { en: (v: LocationAnswerVars) => string; hi: (v: LocationAnswerVars) => string }
}

/**
 * Variables injected into a location's answer sentence. Kept minimal — only the
 * facts that actually vary per district, so the template stays readable and the
 * rendered prose stays natural.
 */
export type LocationAnswerVars = {
  /** Distance to the nearest airport, in km. */
  distance: number
  /** Contact name handling this district. */
  branch: string
  branchHi: string
}

const marathwadaDistricts: Location[] = [
  {
    slug: 'jalna',
    name: 'Jalna',
    nameHi: 'जालना',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by head office', hi: 'मुख्य कार्यालय से सेवा' },
    airports: [
      {
        code: 'IXU',
        name: 'CSN (Aurangabad) (Chikkalthana)',
        nameHi: 'छत्रपति संभाजीनगर (चिक्कलठाणा)',
        distanceKm: 65,
        travelTime: '1h 30m',
      },
      {
        code: 'BOM',
        name: 'Mumbai (Chhatrapati Shivaji Maharaj)',
        nameHi: 'मुंबई (छत्रपति शिवाजी महाराज)',
        distanceKm: 350,
        travelTime: '6h 30m',
      },
      {
        code: 'NAG',
        name: 'Nagpur (Dr. Babasaheb Ambedkar)',
        nameHi: 'नागपुर (डॉ. बाबासाहेब आंबेडकर)',
        distanceKm: 340,
        travelTime: '6h',
      },
    ],
    contactName: 'Mohan Pathan',
    contactNameHi: 'मोहन पठाण',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Hi-Tech Haj Umrah Services is based in Aurangabad, and the Aurangabad head office is where most Marathwada pilgrims start. Pilgrims from Jalna usually fly from CSN (Aurangabad) (IXU), about ${v.distance} km away, or from Mumbai. To begin a Umrah booking from Jalna, call ${v.branch} on the number below.`,
      hi: (v) =>
        `हज उमरा सर्विस का मुख्य कार्यालय अउरंगाबाद में है, और अधिकांश मराठवाड़ा जायरीन यहीं से यात्रा शुरू करते हैं। जालना के जायरीन आमतौर पर छत्रपति संभाजीनगर (IXU) से उड़ान भरते हैं, जो लगभग ${v.distance} किमी दूर है, या मुंबई से। जालना से उमरा बुकिंग शुरू करने के लिए नीचे दिए नंबर पर ${v.branchHi} से संपर्क करें।`,
    },
  },
  {
    slug: 'chhatrapati-sambhajinagar',
    name: 'CSN (Aurangabad)',
    nameHi: 'छत्रपति संभाजीनगर',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: '5 branch contacts', hi: '५ शाखा संपर्क' },
    airports: [
      {
        code: 'IXU',
        name: 'CSN (Aurangabad) (Chikkalthana)',
        nameHi: 'छत्रपति संभाजीनगर (चिक्कलठाणा)',
        distanceKm: 12,
        travelTime: '30m',
      },
      {
        code: 'BOM',
        name: 'Mumbai (Chhatrapati Shivaji Maharaj)',
        nameHi: 'मुंबई (छत्रपति शिवाजी महाराज)',
        distanceKm: 250,
        travelTime: '5h',
      },
      {
        code: 'HYD',
        name: 'Hyderabad (Rajiv Gandhi)',
        nameHi: 'हैदराबाद (राजीव गांधी)',
        distanceKm: 300,
        travelTime: '5h 30m',
      },
    ],
    contactName: 'Sheikh Asgar',
    contactNameHi: 'शेख असगर',
    contactPhone: '9303313313',
    answer: {
      en: (v) =>
        `CSN (Aurangabad) (formerly Aurangabad) has the closest airport to Makkah and Madinah of any city in Marathwada, which is why several HI-TECH groups depart from here. For bookings call ${v.branch}, or reach any of the five Sambhajinagar branch contacts listed below.`,
      hi: (v) =>
        `छत्रपति संभाजीनगर (पूर्व में औरंगाबाद) के पास मक्का-मदीना के सबसे करीब का हवाई अड्डा है, इसीलिए हज उमरा सर्विस के कई समूह यहाँ से रवाना होते हैं। बुकिंग के लिए ${v.branchHi} को कॉल करें, या नीचे दिए गए पाँच शाखा संपर्कों में से किसी से बात करें।`,
    },
  },
  {
    slug: 'nanded',
    name: 'Nanded',
    nameHi: 'नांदेड़',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by Aurangabad & Sambhajinagar', hi: 'अउरंगाबाद व संभाजीनगर से सेवा' },
    airports: [
      {
        code: 'HYD',
        name: 'Hyderabad (Rajiv Gandhi)',
        nameHi: 'हैदराबाद (राजीव गांधी)',
        distanceKm: 200,
        travelTime: '4h',
      },
      {
        code: 'NAG',
        name: 'Nagpur (Dr. Babasaheb Ambedkar)',
        nameHi: 'नागपुर (डॉ. बाबासाहेब आंबेडकर)',
        distanceKm: 270,
        travelTime: '4h 30m',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Pilgrims from Nanded most often fly from Hyderabad, roughly ${v.distance} km from the city. HI-TECH collects Nanded passengers from their address and sends them to the airport as a single group, so nobody travels to Hyderabad unaccompanied. Call ${v.branch} to register your group.`,
      hi: (v) =>
        `नांदेड़ के जायरीन सबसे अधिक हैदराबाद से उड़ान भरते हैं, जो शहर से लगभग ${v.distance} किमी दूर है। हज उमरा सर्विस नांदेड़ के यात्रियों को उनके पते से लेकर एक ही समूह में हवाई अड्डे के लिए भेजता है, ताकि कोई अकेला न जाए। अपना समूह दर्ज कराने के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'latur',
    name: 'Latur',
    nameHi: 'लातूर',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by Aurangabad head office', hi: 'अउरंगाबाद मुख्य कार्यालय से सेवा' },
    airports: [
      {
        code: 'HYD',
        name: 'Hyderabad (Rajiv Gandhi)',
        nameHi: 'हैदराबाद (राजीव गांधी)',
        distanceKm: 180,
        travelTime: '3h 30m',
      },
      {
        code: 'BOM',
        name: 'Mumbai (Chhatrapati Shivaji Maharaj)',
        nameHi: 'मुंबई (छत्रपति शिवाजी महाराज)',
        distanceKm: 620,
        travelTime: '11h',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `For pilgrims from Latur, the practical route is Hyderabad airport, about ${v.distance} km from Latur. HI-Tech arranges pickup from Latur and the return drop after the Umrah. Call ${v.branch} to discuss dates and package tier.`,
      hi: (v) =>
        `लातूर के जायरीनों के लिए व्यावहारिक मार्ग हैदराबाद हवाई अड्डा है, जो लातूर से लगभग ${v.distance} किमी दूर है। हज उमरा सर्विस लातूर से पिकअप और उमरा के बाद वापसी ड्रॉप की व्यवस्था करता है। तारीख़ों और पैकेज श्रेणी पर बात करने के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'beed',
    name: 'Beed',
    nameHi: 'बीड',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by Aurangabad head office', hi: 'अउरंगाबाद मुख्य कार्यालय से सेवा' },
    airports: [
      {
        code: 'HYD',
        name: 'Hyderabad (Rajiv Gandhi)',
        nameHi: 'हैदराबाद (राजीव गांधी)',
        distanceKm: 160,
        travelTime: '3h 15m',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Beed pilgrims generally travel via Hyderabad, around ${v.distance} km from Beed. The group is picked up from Beed, taken to the airport, and brought back to Beed on return. Call ${v.branch} for package options.`,
      hi: (v) =>
        `बीड के जायरीन आमतौर पर हैदराबाद मार्ग से जाते हैं, जो बीड से लगभग ${v.distance} किमी दूर है। समूह को बीड से लेकर हवाई अड्डे के लिए जाता है और वापसी पर बीड तक लाया जाता है। पैकेज विकल्पों के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'parbhani',
    name: 'Parbhani',
    nameHi: 'परभणी',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by Aurangabad head office', hi: 'अउरंगाबाद मुख्य कार्यालय से सेवा' },
    airports: [
      {
        code: 'HYD',
        name: 'Hyderabad (Rajiv Gandhi)',
        nameHi: 'हैदराबाद (राजीव गांधी)',
        distanceKm: 180,
        travelTime: '3h 30m',
      },
      {
        code: 'NAG',
        name: 'Nagpur (Dr. Babasaheb Ambedkar)',
        nameHi: 'नागपुर (डॉ. बाबासाहेब आंबेडकर)',
        distanceKm: 300,
        travelTime: '5h',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `From Parbhani, the Hyderabad route is roughly ${v.distance} km and is the most common choice for HI-TECH Umrah groups. Call ${v.branch} to be added to the next departure list.`,
      hi: (v) =>
        `परभणी से हैदराबाद मार्ग लगभग ${v.distance} किमी है और हज उमरा सर्विस के उमरा समूहों के लिए यही सबसे आम चुनाव है। अगली रवाना सूची में शामिल होने के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'hingoli',
    name: 'Hingoli',
    nameHi: 'हिंगोली',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by Aurangabad head office', hi: 'अउरंगाबाद मुख्य कार्यालय से सेवा' },
    airports: [
      {
        code: 'NAG',
        name: 'Nagpur (Dr. Babasaheb Ambedkar)',
        nameHi: 'नागपुर (डॉ. बाबासाहेब आंबेडकर)',
        distanceKm: 200,
        travelTime: '3h 30m',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Hingoli pilgrims depart through Nagpur, about ${v.distance} km from Hingoli. The Hingoli pickup is arranged together with adjoining village pickups so the group reaches Nagpur together. Call ${v.branch} to confirm.`,
      hi: (v) =>
        `हिंगोली के जायरीन नागपुर से रवाना होते हैं, जो हिंगोली से लगभग ${v.distance} किमी दूर है। आस-पास के गाँवों की पिकअप के साथ मिलकर हिंगोली की पिकअप तय होती है, ताकि समूह साथ नागपुर पहुँचे। पुष्टि के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'washim',
    name: 'Washim',
    nameHi: 'वाशिम',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by Aurangabad head office', hi: 'अउरंगाबाद मुख्य कार्यालय से सेवा' },
    airports: [
      {
        code: 'NAG',
        name: 'Nagpur (Dr. Babasaheb Ambedkar)',
        nameHi: 'नागपुर (डॉ. बाबासाहेब आंबेडकर)',
        distanceKm: 170,
        travelTime: '3h',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `The Washim route runs through Nagpur, around ${v.distance} km from Washim. Call ${v.branch} to discuss Umrah dates and the collection point for your area.`,
      hi: (v) =>
        `वाशिम का मार्ग नागपुर से होकर जाता है, जो वाशिम से लगभग ${v.distance} किमी दूर है। उमरा की तारीख़ों और आपके क्षेत्र के संग्रह बिंदु पर बात करने के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'dharashiv',
    name: 'Dharashiv',
    nameHi: 'धाराशिव',
    state: 'Maharashtra',
    kind: 'marathwada',
    hub: { en: 'Served by Aurangabad head office', hi: 'अउरंगाबाद मुख्य कार्यालय से सेवा' },
    airports: [
      {
        code: 'HYD',
        name: 'Hyderabad (Rajiv Gandhi)',
        nameHi: 'हैदराबाद (राजीव गांधी)',
        distanceKm: 180,
        travelTime: '3h 30m',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Pilgrims from Dharashiv (formerly Osmanabad) travel through Hyderabad, about ${v.distance} km away. Call ${v.branch} to arrange the pickup and discuss package tiers.`,
      hi: (v) =>
        `धाराशिव (पूर्व में उस्मानाबाद) के जायरीन हैदराबाद मार्ग से जाते हैं, जो लगभग ${v.distance} किमी दूर है। पिकअप की व्यवस्था और पैकेज श्रेणी पर बात करने के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
]

const feederCityList: Location[] = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    nameHi: 'मुंबई',
    state: 'Maharashtra',
    kind: 'feeder',
    hub: { en: 'Departure hub', hi: 'रवाना केंद्र' },
    airports: [
      {
        code: 'BOM',
        name: 'Mumbai (Chhatrapati Shivaji Maharaj)',
        nameHi: 'मुंबई (छत्रपति शिवाजी महाराज)',
        distanceKm: 0,
        travelTime: 'In city',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Mumbai is a departure point rather than a destination for us — pilgrims from outside Marathwada can be added to the Mumbai departure. Call ${v.branch} and we will match you with a group flying on the same date.`,
      hi: (v) =>
        `मुंबई हमारे लिए रवाना बिंदु है, गंतव्य नहीं — मराठवाड़े के बाहर के जायरीन मुंबई रवाने में जोड़े जा सकते हैं। ${v.branchHi} को कॉल करें, हम आपको उसी तारीख़ की उड़ान वाले समूह से जोड़ देंगे।`,
    },
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    nameHi: 'हैदराबाद',
    state: 'Telangana',
    kind: 'feeder',
    hub: { en: 'Departure hub', hi: 'रवाना केंद्र' },
    airports: [
      {
        code: 'HYD',
        name: 'Hyderabad (Rajiv Gandhi)',
        nameHi: 'हैदराबाद (राजीव गांधी)',
        distanceKm: 0,
        travelTime: 'In city',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Hyderabad (HYD) is the most used departure airport for the eastern half of Marathwada — Latur, Beed, Parbhani and Dharashiv pilgrims. Call ${v.branch} to be added to a Hyderabad departure group.`,
      hi: (v) =>
        `हैदराबाद (HYD) मराठवाड़े के पूर्वी हिस्से — लातूर, बीड, परभणी और धाराशिव के जायरीनों — के लिए सबसे अधिक उपयोग किया जाने वाला रवाना हवाई अड्डा है। हैदराबाद रवाना समूह में शामिल होने के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'pune',
    name: 'Pune',
    nameHi: 'पुणे',
    state: 'Maharashtra',
    kind: 'feeder',
    hub: { en: 'On request', hi: 'अनुरोध पर' },
    airports: [
      {
        code: 'PNQ',
        name: 'Pune (Pune Airport)',
        nameHi: 'पुणे (पुणे हवाई अड्डा)',
        distanceKm: 0,
        travelTime: 'In city',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Pune departures are arranged on request depending on the group size and date. Call ${v.branch} to ask whether a Pune departure is possible for your dates.`,
      hi: (v) =>
        `पुणे से रवाना समूह के आकार और तारीख़ के अनुसार अनुरोध पर तय होता है। क्या आपकी तारीख़ों में पुणे से रवाना संभव है, यह जानने के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
  {
    slug: 'nagpur',
    name: 'Nagpur',
    nameHi: 'नागपुर',
    state: 'Maharashtra',
    kind: 'feeder',
    hub: { en: 'Departure hub', hi: 'रवाना केंद्र' },
    airports: [
      {
        code: 'NAG',
        name: 'Nagpur (Dr. Babasaheb Ambedkar)',
        nameHi: 'नागपुर (डॉ. बाबासाहेब आंबेडकर)',
        distanceKm: 0,
        travelTime: 'In city',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Nagpur (NAG) is the main departure point for Washim, Hingoli and parts of Nanded. Call ${v.branch} and we will coordinate the group pickup and timing.`,
      hi: (v) =>
        `नागपुर (NAG) वाशिम, हिंगोली और नांदेड़ के कुछ हिस्सों के लिए मुख्य रवाना बिंदु है। ${v.branchHi} को कॉल करें, हम समूह की पिकअप और समय का समन्वय कर देंगे।`,
    },
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    nameHi: 'बेंगलुरु',
    state: 'Karnataka',
    kind: 'feeder',
    hub: { en: 'On request', hi: 'अनुरोध पर' },
    airports: [
      {
        code: 'BLR',
        name: 'Bengaluru (Kempegowda)',
        nameHi: 'बेंगलुरु (केम्पेगौडा)',
        distanceKm: 0,
        travelTime: 'In city',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Bengaluru departures are planned for families based in the south. Call ${v.branch} to register interest and we will confirm the next available group.`,
      hi: (v) =>
        `दक्षिण में रहने वाले परिवारों के लिए बेंगलुरु से रवाना तय किया जाता है। रुचि दर्ज करने के लिए ${v.branchHi} को कॉल करें, हम अगला उपलब्ध समूह बताएँगे।`,
    },
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    nameHi: 'दिल्ली',
    state: 'Delhi',
    kind: 'feeder',
    hub: { en: 'Delhi package departures', hi: 'दिल्ली पैकेज रवाना' },
    airports: [
      {
        code: 'DEL',
        name: 'Delhi (Indira Gandhi)',
        nameHi: 'दिल्ली (इंदिरा गांधी)',
        distanceKm: 0,
        travelTime: 'In city',
      },
    ],
    contactName: 'Aurangabad head office',
    contactNameHi: 'अउरंगाबाद मुख्य कार्यालय',
    contactPhone: '9175107214',
    answer: {
      en: (v) =>
        `Our Delhi Umrah package departs from Delhi with Makkah and Madinah hotels arranged together and a full group briefing. Call ${v.branch} for the next Delhi departure date.`,
      hi: (v) =>
        `हमारा दिल्ली उमरा पैकेज दिल्ली से रवाना होता है, जिसमें मक्का-मदीना के होटल एक साथ और पूरा समूह ब्रीफिंग शामिल है। अगली दिल्ली रवाना तारीख़ के लिए ${v.branchHi} को कॉल करें।`,
    },
  },
]

export const locations: Location[] = [...marathwadaDistricts, ...feederCityList]
export const marathwada = locations.filter((l) => l.kind === 'marathwada')
export const feederCities = locations.filter((l) => l.kind === 'feeder')

export const marathwadaRegion = {
  name: 'Marathwada',
  nameHi: 'मराठवाड़ा',
  districts: marathwada.map((l) => l.name),
  districtsHi: marathwada.map((l) => l.nameHi),
  description: {
    en: 'Marathwada is the eight-district region of central Maharashtra around which Hi-Tech Haj Umrah Services operates, headquartered in Aurangabad with branch contacts across CSN (Aurangabad).',
    hi: 'मराठवाड़ा मध्य महाराष्ट्र का आठ जिलों का क्षेत्र है, जिसमें हज उमरा सर्विस काम करता है — मुख्यालय अउरंगाबाद में और छत्रपति संभाजीनगर में शाखा संपर्कों के साथ।',
  },
}

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}
