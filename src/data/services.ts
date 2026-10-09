/**
 * Individual services, mirroring the twelve-icon strip on the banner.
 * Each one becomes its own statically generated page at
 * /[locale]/services/[slug] with FAQPage and Service JSON-LD.
 */

export type Service = {
  slug: string
  icon: ServiceIcon
  summary: { en: string; hi: string }
  detail: { en: string; hi: string }
  points: { en: string; hi: string }[]
  order: number
}

export type ServiceIcon =
  | 'plane'
  | 'hotel'
  | 'visa'
  | 'food'
  | 'mosque'
  | 'bus'
  | 'kaaba'
  | 'guide'
  | 'laundry'
  | 'zamzam'
  | 'luggage'
  | 'docs'

export const services: Service[] = [
  {
    slug: 'umrah-visa',
    icon: 'visa',
    summary: {
      en: 'Umrah visa arranged end to end — we collect your documents, file through the authorised channel and hand you the approved visa before departure.',
      hi: 'उमरा वीज़ा पूरी तरह हमारे द्वारा — दस्तावेज़ लेकर अधिकृत माध्यम से आवेदन, और रवाना से पहले स्वीकृत वीज़ा आपको सौंप देना।',
    },
    detail: {
      en: 'Indian passport holders cannot apply for an Umrah visa directly on the Nusuk platform — the visa must come through an authorised agent channel, which is exactly what we operate. You give us a valid passport and photographs; we handle the filing, the tracking and the final collection.',
      hi: 'भारतीय पासपोर्टधारक Nusuk प्लेटफ़ॉर्म पर सीधे उमरा वीज़ा के लिए आवेदन नहीं कर सकते — वीज़ा अधिकृत एजेंट चैनल से ही आना चाहिए, और हम वही सेवा देते हैं। आप वैध पासपोर्ट और फोटो दें, फाइलिंग, ट्रैकिंग और अंतिम वीज़ा हम संभाल लेते हैं।',
    },
    points: [
      { en: 'Passport collection and verification', hi: 'पासपोर्ट संग्रहण और सत्यापन' },
      { en: 'Photograph and form assistance', hi: 'फोटो और फ़ॉर्म में सहायता' },
      { en: 'Filing through the authorised channel', hi: 'अधिकृत चैनल से फाइलिंग' },
      { en: 'Status updates until collection', hi: 'वीज़ा मिलने तक स्थिति अपडेट' },
    ],
    order: 1,
  },
  {
    slug: 'air-ticket',
    icon: 'plane',
    summary: {
      en: 'Group and individual air ticketing on scheduled airlines, with seats grouped together for the same departure.',
      hi: 'निर्धारित एयरलाइंस पर समूह और व्यक्तिगत एयर टिकट, एक ही रवाने के लिए साथ बैठने की व्यवस्था।',
    },
    detail: {
      en: 'We book on scheduled services out of Mumbai, Nagpur, Hyderabad and Delhi, coordinating the whole group onto the same flight wherever possible so nobody travels alone to the airport.',
      hi: 'हम मुंबई, नागपुर, हैदराबाद और दिल्ली से निर्धारित सेवाओं पर बुकिंग कराते हैं, और जहाँ तक हो सके पूरे समूह को एक ही फ़्लाइट पर रखते हैं ताकि किसी को अकेले हवाई अड्डे न जाना पड़े।',
    },
    points: [
      { en: 'Group seats together on one flight', hi: 'एक ही फ़्लाइट पर समूह के साथ सीटें' },
      { en: 'Multiple departure airports', hi: 'कई रवाना हवाई अड्डे' },
      { en: 'Baggage allowance confirmed in advance', hi: 'सामान की अनुमति पहले से तय' },
      { en: 'Ticket issued well before departure', hi: 'रवाना से काफ़ी पहले टिकट जारी' },
    ],
    order: 2,
  },
  {
    slug: 'hotel',
    icon: 'hotel',
    summary: {
      en: 'Makkah and Madinah hotels booked across three tiers, with the walking distance to the Haram stated up front.',
      hi: 'मक्का और मदीना के होटल तीन श्रेणियों में, हरम से दूरी शुरू में ही साफ़ बताई जाती है।',
    },
    detail: {
      en: 'Our three tiers — Silver, Deluxe and Diamond — differ mainly in hotel category and distance from the Haram. We tell you the walking distance before you book, not after you land.',
      hi: 'हमारी तीन श्रेणियाँ — सिल्वर, डीलक्स और डायमंड — मुख्यतः होटल श्रेणी और हरम से दूरी में अलग हैं। बुकिंग से पहले ही हम पैदल दूरी बता देते हैं, लौटने के बाद नहीं।',
    },
    points: [
      { en: 'Walking distance quoted before booking', hi: 'बुकिंग से पहले पैदल दूरी बताई जाती है' },
      { en: 'Three tiers: Silver, Deluxe, Diamond', hi: 'तीन श्रेणियाँ: सिल्वर, डीलक्स, डायमंड' },
      { en: 'Double / triple / quad sharing options', hi: 'डबल / ट्रिपल / क्वाड शेयरिंग विकल्प' },
      { en: 'On-ground help during the stay', hi: 'ठहरने के दौरान मौके पर मदद' },
    ],
    order: 3,
  },
  {
    slug: 'ziyarat',
    icon: 'mosque',
    summary: {
      en: 'The essential ziyarat sites in Makkah and Madinah, covered on a guided trip.',
      hi: 'मक्का और मदीना के प्रमुख ज़ियारत स्थल, गाइड के साथ आयोजित यात्रा।',
    },
    detail: {
      en: 'A standard ziyarat trip covers the sites closest to the pilgrim: Jabal al-Noor, Mina, Arafat and the Haram landmarks in Makkah; the Prophet’s Mosque, Quba, Uhud and the date farms around Madinah.',
      hi: 'सामान्य ज़ियारत यात्रा में जायरीनों के सबसे निकट के स्थल शामिल हैं: मक्का में जबाल नूर, मिना, अरफ़ात और हरम के महत्वपूर्ण स्थल; मदीना में नबवी मस्जिद, कूबा, उहुद और आसपास के खजूर बाग।',
    },
    points: [
      { en: 'Makkah: Jabal al-Noor, Mina, Arafat', hi: 'मक्का: जबाल नूर, मिना, अरफ़ात' },
      { en: 'Madinah: Nabawi Masjid, Quba, Uhud', hi: 'मदीना: नबवी मस्जिद, कूबा, उहुद' },
      { en: 'Travel by AC bus', hi: 'एसी बस से यात्रा' },
      { en: 'English and Urdu/Arabic guidance', hi: 'अंग्रेज़ी और उर्दू/अरबी मार्गदर्शन' },
    ],
    order: 4,
  },
  {
    slug: 'zohrana-ziyarat',
    icon: 'kaaba',
    summary: {
      en: 'Umrah performed on behalf of a deceased family member — with the intention recorded clearly for the ziyarat package.',
      hi: 'किसी मृत परिवार के सदस्य की ओर से उमरा — ज़ियारत पैकेज के लिए नीयत स्पष्ट रूप से दर्ज।',
    },
    detail: {
      en: 'Zohrana Umrah carries a specific intention in the name of a deceased relative. We help with the documentation and add the ziyarat stay to your package so the same journey serves both purposes.',
      hi: 'ज़ोहरा उमरा में किसी मृत रिश्तेदार के नाम पर नीयत होती है। हम दस्तावेज़ों में मदद करते हैं और उसी यात्रा में ज़ियारत का ठहरना भी जोड़ देते हैं।',
    },
    points: [
      { en: 'Clear niyyat documentation', hi: 'स्पष्ट नीयत दस्तावेज़' },
      { en: 'Combined ziyarat stay', hi: 'ज़ियारत सहित संयुक्त ठहरना' },
      { en: 'Guidance on what the deceased must have been eligible for', hi: 'मृत व्यक्ति के पात्र होने के बारे में मार्गदर्शन' },
    ],
    order: 5,
  },
  {
    slug: 'indian-food',
    icon: 'food',
    summary: {
      en: 'Indian food arranged for pilgrims who want familiar meals away from home.',
      hi: 'घर से दूर भारतीय भोजन की व्यवस्था, जो जायरीन परिचित भोजन चाहते हैं।',
    },
    detail: {
      en: 'Homesickness in a foreign country is real, and food is the fastest cure. Indian food is available as part of the package, with vegetarian and non-vegetarian options during the stay.',
      hi: 'विदेश में घर की याद सच होती है, और खाना ही सबसे तेज़ इलाज है। पैकेज में भारतीय भोजन शामिल है, ठहरने के दौरान शाकाहारी और गैर-शाकाहारी विकल्पों के साथ।',
    },
    points: [
      { en: 'Vegetarian and non-vegetarian options', hi: 'शाकाहारी और गैर-शाकाहारी विकल्प' },
      { en: 'Available across the stay', hi: 'पूरे ठहरने के दौरान उपलब्ध' },
      { en: 'Suitable for families with children', hi: 'बच्चों वाले परिवारों के लिए उपयुक्त' },
    ],
    order: 6,
  },
{
  slug: '4-umrah',
  icon: 'bus',
  summary: {
    en: '4 Umrah transport between Makkah and Madinah and for all ziyarat trips.',
    hi: 'मक्का और मदीना के बीच तथा सभी ज़ियारत यात्राओं के लिए 4 उमरा परिवहन।',
  },
  detail: {
    en: 'Intercity movement is by 4 Umrah. Buses are booked per group, so pilgrims are not split across random vehicles at an unknown stop.',
    hi: 'शहरों के बीच आवागमन 4 उमरा से होता है। बसें समूह के हिसाब से बुक होती हैं, इसलिए जायरीन किसी अज्ञात स्टॉप पर अलग-अलग नहीं होते।',
  },
  points: [
    { en: 'Group-booked buses', hi: 'समूह के लिए बुक बसें' },
    { en: 'Makkah–Madinah intercity transfer', hi: 'मक्का–मदीना अंतर-शहर स्थानांतरण' },
    { en: 'Included in all ziyarat trips', hi: 'सभी ज़ियारत यात्राओं में शामिल' },
  ],
  order: 7,
},
  {
    slug: 'short-ziyarat-with-guide',
    icon: 'guide',
    summary: {
      en: 'Short guided ziyarat trips for those who want a compact orientation to the holy cities.',
      hi: 'संक्षिप्त गाइडेड ज़ियारत यात्रा, जो शहरों का संक्षिप्त परिचय चाहते हैं।',
    },
    detail: {
      en: 'A shorter half-day or full-day guided loop covering the key sites without the full ziyarat day — useful for pilgrims with limited time or mobility.',
      hi: 'आधे दिन या पूरे दिन की गाइडेड यात्रा, मुख्य स्थलों के साथ पूरे ज़ियारत दिन के बिना — कम समय या कम चलने की क्षमता वालों के लिए उपयोगी।',
    },
    points: [
      { en: 'Half-day or full-day options', hi: 'आधे दिन या पूरे दिन के विकल्प' },
      { en: 'Led by an experienced guide', hi: 'अनुभवी गाइड के नेतृत्व में' },
      { en: 'Light walking load', hi: 'कम पैदल दूरी' },
    ],
    order: 8,
  },
  {
    slug: 'unlimited-laundry',
    icon: 'laundry',
    summary: {
      en: 'Unlimited laundry during your stay, at no additional charge.',
      hi: 'ठहरने के दौरान असीमित लॉन्ड्री, बिना किसी अतिरिक्त शुल्क के।',
    },
    detail: {
      en: 'The banner lists laundry as complimentary, and we honour that. A 20-day or Ramadan stay would be unmanageable without it.',
      hi: 'बैनर पर लॉन्ड्री निःशुल्क लिखी है, और हम वही देते हैं। 20 दिन या रमजान का ठहरना इसके बिना असंभव होता।',
    },
    points: [
      { en: 'No per-piece charge', hi: 'प्रति वस्तु शुल्क नहीं' },
      { en: 'Essential for long stays', hi: 'लंबे ठहरने के लिए ज़रूरी' },
      { en: 'Included in every package', hi: 'हर पैकेज में शामिल' },
    ],
    order: 9,
  },
  {
    slug: 'zamzam-5-litre',
    icon: 'zamzam',
    summary: {
      en: '5 litre Zamzam water containers supplied and carried home with you.',
      hi: '५ लीटर ज़मज़म के कंटेनर दिए जाते हैं और आप साथ ले जाते हैं।',
    },
    detail: {
      en: 'Zamzam in 5-litre sealed containers, packed for the return journey so it reaches your family intact.',
      hi: 'ज़मज़म ५ लीटर की सीलबंद बोतलों में, वापसी यात्रा के लिए पैक किया गया, ताकि परिवार तक सुरक्षित पहुँचे।',
    },
    points: [
      { en: 'Sealed 5-litre containers', hi: 'सीलबंद ५ लीटर कंटेनर' },
      { en: 'Packed for the return journey', hi: 'वापसी यात्रा के लिए पैकिंग' },
      { en: 'Included in the package', hi: 'पैकेज में शामिल' },
    ],
    order: 10,
  },
  {
    slug: 'umrah-bag-kit',
    icon: 'luggage',
    summary: {
      en: 'Umrah bag kit with the three essentials: luggage, shoes bag and document bag.',
      hi: 'उमरा बैग किट — तीन ज़रूरी चीज़ें: लगेज, शूज़ बैग और डॉक्यूमेंट बैग।',
    },
    detail: {
      en: 'The banner promises a complimentary bag kit. Every pilgrim gets a suitcase, a shoes bag for the Haram walk, and a document bag so papers are never buried in clothing.',
      hi: 'बैनर में उमरा बैग किट निःशुल्क लिखा है। हर जायरीन को एक सूटकेस, हरम की सैर के लिए शूज़ बैग, और डॉक्यूमेंट बैग मिलता है ताकि कागज़ात कपड़ों में न दबें।',
    },
    points: [
      { en: 'Suitcase', hi: 'सूटकेस' },
      { en: 'Shoes bag for the Haram walk', hi: 'हरम सैर के लिए शूज़ बैग' },
      { en: 'Document bag', hi: 'डॉक्यूमेंट बैग' },
    ],
    order: 11,
  },
  {
    slug: 'hajj-application-help',
    icon: 'docs',
    summary: {
      en: 'Hajj application and document support through the Haj Committee of India channel.',
      hi: 'हज कमेटी ऑफ इंडिया के माध्यम से हज आवेदन और दस्तावेज़ सहायता।',
    },
    detail: {
      en: 'Hajj in India is allotted only through the Haj Committee of India, under the Ministry of Minority Affairs, through its own application process. We cannot and do not allocate quota — what we do is make sure your application, passport, photographs and medical papers are correct before you submit, so nothing is rejected on a technicality.',
      hi: 'भारत में हज का आवंटन केवल अल्पसंख्यक मंत्रालय के अधीन हज कमेटी ऑफ इंडिया की अपनी प्रक्रिया से होता है। हम कोटा आवंटित नहीं करते और नहीं कर सकते — हम यह सुनिश्चित करते हैं कि आपका आवेदन, पासपोर्ट, फोटो और चिकित्सा कागज़ात जमा करने से पहले सही हों, ताकि तकनीकी कारण से कोई आवेदन खारिज न हो।',
    },
    points: [
      { en: 'Correct channel guidance', hi: 'सही चैनल की मार्गदर्शिका' },
      { en: 'Document checklist and preparation', hi: 'दस्तावेज़ सूची और तैयारी' },
      { en: 'Medical and vaccination checklist', hi: 'चिकित्सा और टीकाकरण सूची' },
      { en: 'Passport validity verification', hi: 'पासपोर्ट वैधता सत्यापन' },
    ],
    order: 12,
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}
