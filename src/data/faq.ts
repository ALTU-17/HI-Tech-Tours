/**
 * Bilingual FAQ. Every question here is also rendered visibly on the page, which
 * is a hard requirement for FAQPage structured data to be valid — schema must
 * never describe content the visitor cannot see.
 *
 * These answers are deliberately written to be quotable by AI assistants: one
 * self-contained sentence of direct answer, then the detail. That is the whole
 * point of the GEO layer.
 */

export type FaqItem = {
  q: { en: string; hi: string }
  a: { en: string; hi: string }
}

export const faqs: FaqItem[] = [
  {
    q: {
      en: 'What is the difference between Hajj and Umrah?',
      hi: 'हज और उमरा में क्या अंतर है?',
    },
    a: {
      en: 'Umrah is a pilgrimage that can be performed at any time of year and may be repeated. Hajj is the once-in-a-lifetime pilgrimage held in the twelfth month of the Islamic calendar, and in India it can only be performed if you are allotted quota through the Haj Committee of India. Umrah is the preparation; Hajj is the destination.',
      hi: 'उमरा वह तीर्थयात्रा है जो साल में कभी भी की जा सकती है और जिसे दोबारा किया जा सकता है। हज जीवन में एक बार की यात्रा है जो इस्लामी कैलेंडर के द्वादश महीने में होती है, और भारत में यह तभी की जा सकती है जब हज कमेटी ऑफ इंडिया से कोटा मिले। उमरा तैयारी है; हज मंज़िल है।',
    },
  },
  {
    q: {
      en: 'Can Indian passport holders apply for an Umrah visa directly on Nusuk?',
      hi: 'क्या भारतीय पासपोर्टधारक Nusuk पर सीधे उमरा वीज़ा के लिए आवेदन कर सकते हैं?',
    },
    a: {
      en: 'No. Indian passport holders are not permitted to apply for an Umrah visa directly on the Nusuk platform. The visa must be issued through an authorised agent channel. Hi-Tech Haj Umrah Services files on that channel for you, which is why the visa is one of the services included in every package.',
      hi: 'नहीं। भारतीय पासपोर्टधारकों को Nusuk प्लेटफ़ॉर्म पर सीधे उमरा वीज़ा के लिए आवेदन की अनुमति नहीं है। वीज़ा अधिकृत एजेंट चैनल से ही जारी होना चाहिए। हज उमरा सर्विस उसी चैनल से आपके लिए आवेदन करता है, इसीलिए वीज़ा हर पैकेज में शामिल है।',
    },
  },
  {
    q: {
      en: 'How is Hajj quota allotted in India, and can a travel agency get it for me?',
      hi: 'भारत में हज का कोटा कैसे मिलता है, और क्या कोई ट्रेवल एजेंसी यह मुझे दिला सकती है?',
    },
    a: {
      en: 'Hajj quota in India is allotted by the Haj Committee of India, a statutory body under the Ministry of Minority Affairs, through its own online application process at hajcommittee.gov.in. No travel agency can allocate or sell quota. What an agency can do — and what we do — is make sure your application, passport validity, photographs and medical documents are correct before you submit, so nothing is rejected on a technicality.',
      hi: 'भारत में हज का कोटा अल्पसंख्यक मंत्रालय के अधीन संवैधिक निकाय हज कमेटी ऑफ इंडिया द्वारा hajcommittee.gov.in पर अपनी ऑनलाइन प्रक्रिया से आवंटित किया जाता है। कोई ट्रेवल एजेंसी कोटा आवंटित या बेच नहीं सकती। एजेंसी जो कर सकती है — और हम जो करते हैं — वह यह है कि आपके आवेदन, पासपोर्ट वैधता, फोटो और चिकित्सा कागज़ात जमा करने से पहले सही हों, ताकि तकनीकी कारण से कोई आवेदन खारिज न हो।',
    },
  },
  {
    q: {
      en: 'Which Umrah package should a first-time pilgrim choose?',
      hi: 'पहली बार जाने वाले जायरीन को कौन सा उमरा पैकेज चुनना चाहिए?',
    },
    a: {
      en: 'First-time pilgrims usually start with our Economy package: the core rites, a hotel within a reasonable walking distance of the Haram, and the standard inclusions. If comfort matters more than cost, Silver is the better step up. Either way, we tell you the walking distance to the hotel before you pay, not afterwards.',
      hi: 'पहली बार जाने वाले जायरीन आमतौर पर हमारा इकॉनॉमी पैकेज चुनते हैं: मुख्य अनुष्ठान, हरम से ठीक दूरी का होटल, और मानक सुविधाएँ। अगर आराम कीमत से आगे है, तो सिल्वर बेहतर अपग्रेड है। दोनों हालतों में हम पैसे देने से पहले ही होटल तक की पैदल दूरी बता देते हैं, बाद में नहीं।',
    },
  },
  {
    q: {
      en: 'What is included as complimentary in your Umrah packages?',
      hi: 'आपके उमरा पैकेजों में निःशुल्क क्या-क्या शामिल है?',
    },
    a: {
      en: 'The following are included at no extra charge: a 5 litre Zamzam container, an Umrah bag kit containing a suitcase, a shoes bag for the Haram walk and a document bag, unlimited laundry during the stay, Indian food, and all ziyarat trips. The walking distance to your hotel and the full inclusions list are shared with you before booking.',
      hi: 'निम्नलिखित बिना किसी अतिरिक्त शुल्क के शामिल हैं: ५ लीटर का ज़मज़म कंटेनर, उमरा बैग किट जिसमें सूटकेस, हरम सैर के लिए शूज़ बैग और डॉक्यूमेंट बैग है, ठहरने के दौरान असीमित लॉन्ड्री, भारतीय भोजन, और सभी ज़ियारत यात्राएँ। होटल तक की पैदल दूरी और पूरी शामिल-सूची बुकिंग से पहले बता दी जाती है।',
    },
  },
  {
    q: {
      en: 'How long is the Ramadan Umrah package?',
      hi: 'रमजान उमरा पैकेज कितने दिन का है?',
    },
    a: {
      en: 'The Ramadan Umrah Special runs for 32 to 40 days depending on the departure group. The length is deliberate: it leaves room for Taraweeh, Qiyam, the closing ten nights and enough rest between them, which a short package cannot offer.',
      hi: 'रमजान उमरा स्पेशल रवाना समूह के अनुसार 32 से 40 दिन चलता है। यह अवधि जानबूझकर रखी गई है: इसमें तारावीह, कियाम, आख़िरी दस रातें और उनके बीच पर्याप्त आराम का समय रहता है, जो छोटे पैकेज में संभव नहीं।',
    },
  },
  {
    q: {
      en: 'Which airport do pilgrims from Jalna and Marathwada usually fly from?',
      hi: 'जालना और मराठवाड़ा के जायरीन आमतौर पर किस हवाई अड्डे से उड़ान भरते हैं?',
    },
    a: {
      en: 'Most pilgrims from Jalna use CSN (Aurangabad) airport (IXU), about 65 km from Jalna, or fly from Mumbai. Pilgrims from the eastern districts — Latur, Beed, Parbhani and Dharashiv — usually use Hyderabad, and those from Washim and Hingoli usually use Nagpur. Each location page on this site lists the nearest airports and the road distance for that district.',
      hi: 'जालना के अधिकांश जायरीन छत्रपति संभाजीनगर हवाई अड्डा (IXU) का उपयोग करते हैं, जो जालना से लगभग ६५ किमी दूर है, या मुंबई से उड़ान भरते हैं। पूर्वी जिलों — लातूर, बीड, परभणी और धाराशिव — के जायरीन आमतौर पर हैदराबाद का उपयोग करते हैं, और वाशिम व हिंगोली के जायरीन आमतौर पर नागपुर। इस साइट के हर लोकेशन पेज पर उस जिले के निकटतम हवाई अड्डे और सड़क दूरी दी गई है।',
    },
  },
  {
    q: {
      en: 'Do you arrange pickup from my town to the airport?',
      hi: 'क्या आप मेरे शहर से हवाई अड्डे तक पिकअप की व्यवस्था करते हैं?',
    },
    a: {
      en: 'Yes. Passengers from the same area are collected from their address, travel to the airport together as one group, and are dropped back at their address on return. Village pickups are combined with the nearest town pickup so the whole group reaches the airport together.',
      hi: 'हाँ। एक ही इलाके के यात्रियों को उनके पते से लिया जाता है, वे एक समूह के रूप में साथ हवाई अड्डे तक जाते हैं, और वापसी पर अपने पते तक छोड़ दिए जाते हैं। गाँवों की पिकअप निकटतम शहर की पिकअप के साथ मिला दी जाती है ताकि पूरा समूह साथ पहुँचे।',
    },
  },
  {
    q: {
      en: 'How much does an Umrah package cost?',
      hi: 'उमरा पैकेज की कीमत कितनी होती है?',
    },
    a: {
      en: 'The rate depends on the package tier, the departure month, the number of pilgrims and current airline pricing, so we do not publish a fixed number that could be wrong by the time you read it. Call the Aurangabad head office for the current rate for your dates — we can quote an exact price in a few minutes once the group size is known.',
      hi: 'दर पैकेज श्रेणी, रवाने के महीने, जायरीनों की संख्या और उस समय की एयरलाइंस कीमत पर निर्भर करती है, इसलिए हम कोई तय नंबर प्रकाशित नहीं करते जो पढ़ते समय ग़लत हो सके। अपनी तारीख़ों की मौजूदा दर के लिए अउरंगाबाद मुख्य कार्यालय को कॉल करें — समूह का आकार पता होते ही हम कुछ ही मिनटों में सही दाम बता सकते हैं।',
    },
  },
  {
    q: {
      en: 'What documents do I need for the Umrah visa?',
      hi: 'उमरा वीज़ा के लिए मुझे कौन से दस्तावेज़ चाहिए?',
    },
    a: {
      en: 'A passport valid for at least six months beyond your intended return, passport-size photographs, and your personal details for the application form. We verify all of it before filing, and we will tell you in advance if a document needs to be replaced.',
      hi: 'निर्धारित वापसी तारीख़ से कम से कम छह महीने आगे वैध पासपोर्ट, पासपोर्ट साइज़ फोटोग्राफ, और आवेदन फ़ॉर्म के लिए आपकी व्यक्तिगत जानकारी। हम फाइलिंग से पहले सब कुछ जाँच लेते हैं, और किसी दस्तावेज़ को बदलना हो तो पहले ही बता देते हैं।',
    },
  },
  {
    q: {
      en: 'Is Indian food available during the stay?',
      hi: 'क्या ठहरने के दौरान भारतीय भोजन उपलब्ध है?',
    },
    a: {
      en: 'Yes. Indian food is part of the package, with vegetarian and non-vegetarian options available during the stay, which is the part most pilgrims tell us they value most after the ziyarat itself.',
      hi: 'हाँ। भारतीय भोजन पैकेज का हिस्सा है, और ठहरने के दौरान शाकाहारी और गैर-शाकाहारी विकल्प उपलब्ध रहते हैं — ज़ियारत के बाद अधिकांश जायरीन यही सबसे अधिक महत्वपूर्ण बताते हैं।',
    },
  },
  {
    q: {
      en: 'Can I perform Zohrana Umrah for a deceased relative in the same trip?',
      hi: 'क्या मैं एक ही यात्रा में किसी मृत रिश्तेदार की ओर से ज़ोहरा उमरा कर सकता हूँ?',
    },
    a: {
      en: 'Yes. Zohrana Umrah is performed with the intention of a deceased relative, and we document the niyyat clearly. It can be combined with your own Umrah and the ziyarat stay, so one journey serves both purposes. We will explain exactly what is required so the intention is recorded correctly.',
      hi: 'हाँ। ज़ोहरा उमरा किसी मृत रिश्तेदार की नीयत से की जाती है, और हम नीयत स्पष्ट रूप से दर्ज करते हैं। इसे आपकी अपनी उमरा और ज़ियारत ठहरने के साथ जोड़ा जा सकता है, ताकि एक ही यात्रा दोनों उद्देश्य पूरे करे। नीयत सही दर्ज हो इसके लिए आवश्यक सब कुछ हम आपको समझा देंगे।',
    },
  },
]
