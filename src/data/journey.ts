/**
 * The six-step journey, shown on the home page and reused on the Umrah and
 * contact pages. Written in both languages at the data layer so the copy stays
 * consistent everywhere it appears.
 */

export type JourneyStep = {
  step: number
  title: { en: string; hi: string }
  body: { en: string; hi: string }
}

export const journey: JourneyStep[] = [
  {
    step: 1,
    title: { en: 'Call or WhatsApp the office', hi: 'कार्यालय को कॉल या व्हाट्सएप करें' },
    body: {
      en: 'Tell us your district, how many pilgrims, and roughly when you want to travel. We answer the same day with the packages that match and an indicative rate.',
      hi: 'अपना जिला, जायरीनों की संख्या और यात्रा की अनुमानित तारीख़ बताएँ। हम उसी दिन उपयुक्त पैकेज और अनुमानित दर के साथ जवाब देते हैं।',
    },
  },
  {
    step: 2,
    title: { en: 'Share your documents', hi: 'अपने दस्तावेज़ साझा करें' },
    body: {
      en: 'We verify passport validity and photographs for the visa application and the Hajj paperwork, and tell you immediately if anything must be replaced.',
      hi: 'हम वीज़ा आवेदन और हज कागज़ात के लिए पासपोर्ट की वैधता और फोटो जाँचते हैं, और कुछ भी बदलना हो तो तुरंत बता देते हैं।',
    },
  },
  {
    step: 3,
    title: { en: 'Visa and ticket confirmed', hi: 'वीज़ा और टिकट की पुष्टि' },
    body: {
      en: 'The Umrah visa is filed through the authorised channel and the air ticket is issued. We send you the group’s flight details and the hotel name before anything else is finalised.',
      hi: 'उमरा वीज़ा अधिकृत चैनल से फाइल होता है और एयर टिकट जारी होता है। बाकी कुछ भी तय होने से पहले हम समूह की उड़ान का विवरण और होटल का नाम भेजते हैं।',
    },
  },
  {
    step: 4,
    title: { en: 'Pre-departure briefing', hi: 'रवाना से पहले ब्रीफिंग' },
    body: {
      en: 'A briefing covering the airport reporting time, what to carry, how the first tawaf is done, and who to call on the ground if something goes wrong.',
      hi: 'हवाई अड्डे पर रिपोर्टिंग का समय, क्या साथ ले जाएँ, पहला तवाफ़ कैसे करें, और कुछ गड़बड़ होने पर मौके पर किसे बुलाएँ — इसकी पूरी ब्रीफिंग।',
    },
  },
  {
    step: 5,
    title: { en: 'Makkah and Madinah', hi: 'मक्का और मदीना' },
    body: {
      en: 'Hotel, AC bus transport between cities, Indian food, unlimited laundry, and the ziyarat trips — with a group leader reachable throughout.',
      hi: 'होटल, शहरों के बीच एसी बस, भारतीय भोजन, असीमित लॉन्ड्री और ज़ियारत यात्राएँ — पूरे समय तक समूह नेता उपलब्ध।',
    },
  },
  {
    step: 6,
    title: { en: 'Return and aftercare', hi: 'वापसी और बाद की सहायता' },
    body: {
      en: 'Drop back at your address, and a direct line to the office afterwards for anything that comes up about the trip or a future journey.',
      hi: 'आपके पते तक वापसी, और यात्रा या भविष्य की किसी भी यात्रा से जुड़ी बात के लिए बाद में कार्यालय की सीधी लाइन।',
    },
  },
]

/**
 * What a standard Umrah package includes — the twelve points printed on the
 * banner, plus the complimentary items.
 */
export const standardInclusions: string[] = [
  'Air ticket from Mumbai, Nagpur, Hyderabad or Delhi',
  'Hotel in Makkah and Madinah',
  'Three tiers available: Economy, Silver and Delhi',
  'AC bus transport and all three Ziyarat trips',
  'A guide with every Ziyarat trip',
  'Full guidance throughout the stay',
  'Zohrana ziyarat arranged on request',
  'Indian food throughout the stay',
  'Unlimited laundry at no extra charge',
  '5 litre Zamzam water',
  'Shoes bag, luggage and document bag',
  'Complimentary Umrah bag kit',
]

export const standardInclusionsHi: string[] = [
  'मुंबई, नागपुर, हैदराबाद या दिल्ली से एयर टिकट',
  'मक्का और मदीना में होटल',
  'तीन श्रेणियाँ उपलब्ध: इकॉनॉमी, सिल्वर और दिल्ली',
  'एसी बस परिवहन और तीनों ज़ियारत यात्राएँ',
  'हर ज़ियारत यात्रा के साथ गाइड',
  'पूरे ठहरने के दौरान पूर्ण मार्गदर्शन',
  'अनुरोध पर ज़ोहरा ज़ियारत की व्यवस्था',
  'पूरे ठहरने के दौरान भारतीय भोजन',
  'बिना अतिरिक्त शुल्क के असीमित लॉन्ड्री',
  '५ लीटर ज़मज़म जल',
  'शूज़ बैग, लगेज और डॉक्यूमेंट बैग',
  'निःशुल्क उमरा बैग किट',
]

/**
 * Trust pillars. `proof` is deliberately concrete: a claim without a mechanism
 * behind it is exactly what a competitor aggregator will outrank.
 */
export type Pillar = {
  title: { en: string; hi: string }
  body: { en: string; hi: string }
  proof: { en: string; hi: string }
}

export const pillars: Pillar[] = [
  {
    title: { en: 'Inclusion list, in writing', hi: 'शामिल सूची, लिखित रूप में' },
    body: {
      en: 'You get the full inclusions and exclusions list before you pay anything, and the walking distance to the hotel you are actually being offered.',
      hi: 'पैसे देने से पहले पूरी शामिल और ग़ैर-शामिल सूची मिलती है, और जो होटल वास्तव में दिया जा रहा है उस तक की पैदल दूरी भी।',
    },
    proof: {
      en: 'No hidden "service charges" added after you have committed.',
      hi: 'रकम तय होने के बाद कोई छिपा "सर्विस चार्ज" नहीं।',
    },
  },
  {
    title: { en: 'You never fly alone to the airport', hi: 'आप हवाई अड्डे पर कभी अकेले नहीं जाते' },
    body: {
      en: 'Passengers from the same area travel as one group, with pickup from their address and a drop back on return.',
      hi: 'एक ही इलाके के यात्री एक समूह के रूप में यात्रा करते हैं, पते से पिकअप और वापसी पर ड्रॉप सहित।',
    },
    proof: {
      en: 'Applies to all nine Marathwada districts and feeder cities.',
      hi: 'मराठवाड़ा के सभी नौ जिलों और फीडर शहरों पर लागू।',
    },
  },
  {
    title: { en: 'The right channel for the visa', hi: 'वीज़ा के लिए सही चैनल' },
    body: {
      en: 'Umrah visas for Indian passport holders must be filed through an authorised agent channel — not Nusuk. That is the channel we operate.',
      hi: 'भारतीय पासपोर्टधारकों के उमरा वीज़ा अधिकृत एजेंट चैनल से ही दाखिल होने चाहिए — Nusuk से नहीं। हम उसी चैनल पर काम करते हैं।',
    },
    proof: {
      en: 'We say plainly when Nusuk does not apply, instead of implying a shortcut exists.',
      hi: 'हम साफ़ बताते हैं कि Nusuk लागू नहीं होता, नकली रास्ता दिखाने के बजाय।',
    },
  },
  {
    title: { en: 'Hajj through the official route', hi: 'हज आधिकारिक मार्ग से' },
    body: {
      en: 'Hajj quota comes only from the Haj Committee of India. We prepare your documents correctly and tell you exactly which step is yours to do.',
      hi: 'हज का कोटा केवल हज कमेटी ऑफ इंडिया से आता है। हम आपके दस्तावेज़ सही तैयार करते हैं और बताते हैं कि कौन सा चरण आपका है।',
    },
    proof: {
      en: 'We do not claim to allocate quota, because nobody legitimately can.',
      hi: 'हम कोटा आवंटित करने का दावा नहीं करते, क्योंकि कोई भी वैध रूप से ऐसा नहीं कर सकता।',
    },
  },
]
