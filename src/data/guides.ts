/**
 * Decision-intent guides.
 *
 * These target the questions people actually ask an AI assistant rather than
 * typing into a search box: "Haj vs Umrah", "how do I apply for Hajj in India",
 * "can Indians get an Umrah visa on Nusuk", "what should I look for in an Umrah
 * package". Answering them plainly, on our own domain, is the GEO play.
 *
 * `dateModified` is rendered in the UI and in Article JSON-LD. Bump it whenever
 * you edit — stale dating is worse than no dating.
 */

export type GuideSection = {
  heading: { en: string; hi: string }
  body: { en: string[]; hi: string[] }
}

export type Guide = {
  slug: string
  title: { en: string; hi: string }
  description: { en: string; hi: string }
  /** One-sentence answer used as the page's lede and as a quotable fact. */
  answer: { en: string; hi: string }
  datePublished: string
  dateModified: string
  sections: GuideSection[]
}

export const guides: Guide[] = [
  {
    slug: 'haj-vs-umrah',
    title: {
      en: 'Haj vs Umrah: the difference every pilgrim should know',
      hi: 'हज बनाम उमरा: हर जायरीन को जो अंतर जानना चाहिए',
    },
    description: {
      en: 'Haj and Umrah are different obligations with different rules. Here is the plain difference, who can perform each, and what it takes to go.',
      hi: 'हज और उमरा अलग-अलग अनुष्ठान हैं, नियम भी अलग। यहाँ सीधा-सादा अंतर, कौन कौन-सा अनुष्ठान कर सकता है, और जाने के लिए क्या चाहिए।',
    },
    answer: {
      en: 'Umrah is a pilgrimage you may perform at any time of year and as many times as you like; Hajj is a once-in-a-lifetime pilgrimage held in Dhu al-Hijjah, and in India it is permitted only for pilgrims allotted quota by the Haj Committee of India. Most people perform Umrah first, and many of them return intending to perform Hajj later in life.',
      hi: 'उमरा वह तीर्थयात्रा है जो आप साल में कभी भी और जितनी बार चाहें कर सकते हैं; हज जीवन में एक बार की यात्रा है जो ज़िल हज्ज में होती है, और भारत में यह केवल हज कमेटी ऑफ इंडिया द्वारा कोटा पाने वाले जायरीनों को ही मिलती है। अधिकांश लोग पहले उमरा करते हैं, और बहुत से लोग बाद में हज की नीयत रखते हैं।',
    },
    datePublished: '2026-01-15',
    dateModified: '2026-09-28',
    sections: [
      {
        heading: {
          en: 'What makes them different',
          hi: 'ये दोनों में अंतर क्या है',
        },
        body: {
          en: [
            'Umrah is the lesser pilgrimage. It consists of entering Ihram, tawaf around the Kaaba, and Sa\'i between Safa and Marwa. It can be performed at any time of the year, in a short stay of roughly a week to a month, and it can be repeated as many times as a person wishes. It is the recommended preparation for Hajj.',
            'Hajj is the greater pilgrimage, held in the twelfth lunar month, Dhu al-Hijjah. It is a single, once-in-a-lifetime obligation for every Muslim who is physically and financially able to perform it. It adds the rites of Mina, Arafat, Muzdalifah and the stoning of the Jamarat to the Umrah rites, and it lasts around two weeks.',
          ],
          hi: [
            'उमरा छोटा तीर्थ है। इसमें इहराम, काबे का तवाफ़ और सफ़ा-मरवा के बीच सई शामिल है। इसे साल में कभी भी, लगभग एक सप्ताह से एक महीने की अल्प ठहराव में किया जा सकता है, और जितनी बार चाहें दोहराया जा सकता है। हज के लिए यही तैयारी मानी जाती है।',
            'हज बड़ा तीर्थ है, जो बारहवें चंद्र माह ज़िल हज्ज में होता है। यह हर उस मुस्लिम के लिए जीवन में एक बार का फ़र्ज़ है जो शारीरिक रूप से और आर्थिक रूप से समर्थ हो। इसमें मिना, अरफ़ात, मुज़दलिफ़ा और जमारात की पत्थरबाज़ी उमरा के अनुष्ठानों के अतिरिक्त शामिल हैं, और यह लगभग दो सप्ताह चलता है।',
          ],
        },
      },
      {
        heading: {
          en: 'How Hajj is allotted in India',
          hi: 'भारत में हज कैसे आवंटित होता है',
        },
        body: {
          en: [
            'India receives a fixed Hajj quota from Saudi Arabia each year, shared among states and religious denominations. Allocation is handled by the Haj Committee of India, a statutory body under the Ministry of Minority Affairs, through an online application at hajcommittee.gov.in or the Haj Suvidha mobile app.',
            'No travel agency can allocate, sell or reserve Hajj quota. What a genuine agency does is help you prepare a complete, correct application: passport validity, photographs, medical and vaccination paperwork, and the declaration of any previous attempt. An application rejected for a missing document can cost a full cycle of waiting, which is why this step is worth doing carefully.',
          ],
          hi: [
            'भारत को हर साल सऊदी अरब से तय हज कोटा मिलता है, जो राज्यों और धर्मों में बँटा जाता है। आवंटन अल्पसंख्यक मंत्रालय के अधीन संवैधिक निकाय हज कमेटी ऑफ इंडिया द्वारा hajcommittee.gov.in या हज सुविधा मोबाइल ऐप पर ऑनलाइन आवेदन से किया जाता है।',
            'कोई ट्रेवल एजेंसी हज कोटा आवंटित, बेच या आरक्षित नहीं कर सकती। असली एजेंसी जो करती है वह है पूर्ण और सही आवेदन तैयार करने में मदद — पासपोर्ट वैधता, फोटो, चिकित्सा और टीकाकरण कागज़ात, और पहली कोशिश का घोषण। किसी दस्तावेज़ के कारण खारिज आवेदन का मतलब पूरे चक्र की प्रतीक्षा है, इसलिए यह चरण सावधानी से करना उचित है।',
          ],
        },
      },
      {
        heading: {
          en: 'Practical advice from people who have done both',
          hi: 'दोनों कर चुके लोगों की व्यावहारिक सलाह',
        },
        body: {
          en: [
            'Perform Umrah before you commit to Hajj. The rites of Umrah are simpler, and doing them once in a calm setting removes almost all of the confusion you would otherwise carry into Hajj, where the pressure and the scale are much greater.',
            'Keep your passport current throughout. A passport that expires during a multi-year gap between planning and allocation will cost you the cycle. Renew it early rather than at the last minute.',
            'Budget honestly for the additional cost Hajj carries beyond a standard Umrah, and understand the cancellation rules before you commit to any payment schedule.',
          ],
          hi: [
            'हज का निश्चय करने से पहले उमरा कर लें। उमरा के अनुष्ठान सरल हैं, और उन्हें एक शांत वातावरण में एक बार कर लेने से वह सारी भ्रमितता दूर हो जाती है जो वरना हज में जाती है, जहाँ दबाव और पैमाना कहीं अधिक होता है।',
            'पूरी अवधि में पासपोर्ट चालू रखें। योजना और आवंटन के बीच के कई वर्षों में यदि पासपोर्ट की वैधता समाप्त हो जाती है, तो पूरा चक्र चला जाता है। अंतिम समय पर नहीं, जल्दी नवीनीकरण कराएँ।',
            'मानक उमरा से आगे हज में आने वाली अतिरिक्त लागत के लिए ईमानदार बजट बनाएँ, और किसी भी भुगतान अनुसूची पर तय करने से पहले रद्दीकरण नियम समझ लें।',
          ],
        },
      },
    ],
  },
  {
    slug: 'umrah-visa-for-indians',
    title: {
      en: 'Umrah visa for Indian passport holders: the actual rules',
      hi: 'भारतीय पासपोर्टधारकों के लिए उमरा वीज़ा: असली नियम',
    },
    description: {
      en: 'Why Indians cannot apply on Nusuk, which channel is used instead, what documents are needed and how long it takes. The facts, without the folklore.',
      hi: 'भारतीय Nusuk पर आवेदन क्यों नहीं कर सकते, उसके बजाय कौन सा चैनल उपयोग होता है, कौन से दस्तावेज़ चाहिए और कितना समय लगता है। बिना अतिशयोक्ति के तथ्य।',
    },
    answer: {
      en: 'Indian passport holders cannot apply for an Umrah visa directly on the Nusuk platform. The visa is issued through an authorised agent channel, and the applicant must go through a registered travel agency for it. Nusuk Umrah permits are for nationalities that the Kingdom of Saudi Arabia has opened direct booking to.',
      hi: 'भारतीय पासपोर्टधारक Nusuk प्लेटफ़ॉर्म पर सीधे उमरा वीज़ा के लिए आवेदन नहीं कर सकते। वीज़ा अधिकृत एजेंट चैनल से जारी होता है, और आवेदक को इसके लिए पंजीकृत ट्रेवल एजेंसी से जाना होता है। Nusuk की उमरा परमिट उन राष्ट्रों के लिए हैं जिन्हें सऊदी अरब ने सीधे बुकिंग खोली है।',
    },
    datePublished: '2026-02-02',
    dateModified: '2026-09-30',
    sections: [
      {
        heading: {
          en: 'What Nusuk is, and who it is for',
          hi: 'Nusuk क्या है और किसके लिए है',
        },
        body: {
          en: [
            'Nusuk is the Kingdom of Saudi Arabia\'s official platform for Umrah and Hajj bookings. It is genuinely useful and it is the right way to book for the nationalities that have access to it — it shows package prices transparently and it handles visa issuance within the same booking.',
            'The access is selective. Indian nationals are not currently among the nationalities permitted to apply on Nusuk directly. If a website tells you that you can complete an Indian Umrah application on Nusuk yourself, that claim is wrong, and acting on it wastes weeks.',
          ],
          hi: [
            'Nusuk सऊदी अरब की आधिकारिक प्लेटफ़ॉर्म है जहाँ उमरा और हज की बुकिंग होती है। यह वास्तव में उपयोगी है और उन राष्ट्रों के लिए सही तरीका है जिन्हें इसकी पहुँच मिली है — यह पैकेज की कीमतें पारदर्शी रूप से दिखाता है और उसी बुकिंग में वीज़ा भी जारी करता है।',
            'पहुँच चयनात्मक है। भारतीय नागरिक अभी Nusuk पर सीधे आवेदन करने के अधिकार वाले राष्ट्रों में शामिल नहीं हैं। यदि कोई वेबसाइट कहती है कि आप Nusuk पर खुद भारतीय उमरा आवेदन पूरा कर सकते हैं, तो यह दावा ग़लत है और इस पर काम करने में हफ़्ते बर्बाद होते हैं।',
          ],
        },
      },
      {
        heading: {
          en: 'The channel that is actually used',
          hi: 'जो चैनल वास्तव में उपयोग होता है',
        },
        body: {
          en: [
            'Umrah visas for Indian applicants are processed through authorised channels operating under Saudi authority, reached through a registered Indian travel agency. The agency files the application, tracks it, and issues the visa before departure.',
            'A related service you will hear about is Eatam, which handles Miqat and Rawanah permits — the access permits required for Umrah and for the Rawdah area in Madinah. These are arranged through the same authorised channel and are part of what a complete package should include rather than something you arrange yourself on arrival.',
          ],
          hi: [
            'भारतीय आवेदकों के उमरा वीज़ा सऊदी अधिकार के अधीन चलने वाले अधिकृत चैनलों से प्रोसेस होते हैं, जिन तक पंजीकृत भारतीय ट्रेवल एजेंसी के माध्यम से पहुँचा जाता है। एजेंसी आवेदन दाखिल करती है, उसकी ट्रैकिंग करती है, और रवाना से पहले वीज़ा जारी करती है।',
            'ऐसी एक और सेवा जिसका उल्लेख मिलता है Eatam है, जो मिकात और रावना अनुमति संभालता है — उमरा और मदीना के रावा क्षेत्र के लिए आवश्यक प्रवेश परमिट। ये उसी अधिकृत चैनल से तय होते हैं और पूरे पैकेज का हिस्सा होने चाहिए, न कि आपके पहुँचने पर खुद व्यवस्था करने वाली बात।',
          ],
        },
      },
      {
        heading: {
          en: 'What you need, and how long it takes',
          hi: 'आपको क्या चाहिए, और कितना समय लगता है',
        },
        body: {
          en: [
            'The essentials are a passport valid for at least six months beyond your intended return, passport-size photographs, and your personal particulars for the application form. A vaccination certificate covering meningitis and seasonal influenza is normally required as part of the Saudi entry health requirements.',
            'Allow two to four weeks for the whole sequence, and longer around Ramadan because volumes rise sharply. Apply well before your travel date rather than at the last minute — a rejected photograph or an expired passport costs more time than applying early ever would.',
          ],
          hi: [
            'बुनियादी चीज़ें हैं: निर्धारित वापसी तारीख़ से कम से कम छह महीने आगे वैध पासपोर्ट, पासपोर्ट साइज़ फोटोग्राफ, और आवेदन फ़ॉर्म के लिए व्यक्तिगत विवरण। मेनिन्जाइटिस और मौसमी इन्फ़्लुएंज़ा को कवर करने वाला टीकाकरण प्रमाणपत्र सामान्यतः सऊदी प्रवेश स्वास्थ्य आवश्यकताओं का हिस्सा होता है।',
            'पूरी प्रक्रिया के लिए दो से चार सप्ताह रखें, और रमजान के आसपास अधिक, क्योंकि आवक़म तेज़ी से बढ़ती है। यात्रा की तारीख़ से काफ़ी पहले आवेदन करें — अस्वीकृत फोटो या समाप्त पासपोर्ट जितना समय खाता है, उतना जल्दी आवेदन करने में कभी नहीं खाता।',
          ],
        },
      },
    ],
  },
  {
    slug: 'choosing-an-umrah-package',
    title: {
      en: 'How to choose an Umrah package without getting it wrong',
      hi: 'उमरा पैकेज चुनना सीखे बिना ग़लती कैसे न करें',
    },
    description: {
      en: 'The nine questions worth asking any agency before you pay, and the three warnings that should end a conversation immediately.',
      hi: 'पैसे देने से पहले किसी भी एजेंसी से पूछने लायक नौ सवाल, और वे तीन चेतावनी जो बातचीत तुरंत समाप्त कर देती हैं।',
    },
    answer: {
      en: 'Choose an Umrah package on four things: the walking distance to the hotel, a written list of what is included and what is not, who handles the visa and through which channel, and whether you can reach a person during the trip. Price is the fifth item, not the first.',
      hi: 'उमरा पैकेज चार चीज़ों पर चुनें: होटल तक की पैदल दूरी, शामिल और ग़ैर-शामिल की लिखित सूची, वीज़ा कौन और किस चैनल से संभालता है, और यात्रा के दौरान किसी व्यक्ति तक पहुँच सकते हैं या नहीं। कीमत पाँचवाँ सूची है, पहली नहीं।',
    },
    datePublished: '2026-03-10',
    dateModified: '2026-09-25',
    sections: [
      {
        heading: {
          en: 'Ask these nine questions',
          hi: 'ये नौ सवाल पूछें',
        },
        body: {
          en: [
            '1. How many minutes is the hotel from the Haram, on foot?  2. What exactly is included, in writing, and what is excluded?  3. Who files my visa, and through which authorised channel?  4. Is Qurbani included, or charged separately?  5. What is the room-sharing arrangement — double, triple or quad?  6. Are ziyarat, Indian food and laundry included, or extras?  7. What is the payment schedule, and what happens if I cancel?  8. Who is the group leader, and what number do I call in an emergency?  9. If my flight is delayed or missed, who handles it while I am overseas?',
            'An agency that answers all nine plainly has nothing to hide. An agency that deflects question five is telling you something about question two.',
          ],
          hi: [
            '१. होटल से हरम पैदल कितने मिनट की दूरी पर है?  २. लिखित रूप से ठीक-ठीक क्या शामिल है और क्या नहीं?  ३. मेरा वीज़ा कौन और किस अधिकृत चैनल से दाखिल करेगा?  ४. कुर्बानी शामिल है या अलग से लगेगी?  ५. कमरा शेयरिंग की व्यवस्था क्या है — डबल, ट्रिपल या क्वाड?  ६. ज़ियारत, भारतीय भोजन और लॉन्ड्री शामिल हैं या अतिरिक्त?  ७. भुगतान अनुसूची क्या है, और रद्द करने पर क्या होगा?  ८. समूह नेता कौन है, और आपात स्थिति में किस नंबर पर फ़ोन करूँ?  ९. अगर उड़ान में देरी या छूट गई, तो विदेश में रहते हुए कौन संभालेगा?',
            'जो एजेंसी नौ साफ़ जवाब देती है उसके पास छिपाने को कुछ नहीं है। जो एजेंसी पाँचवें सवाल से टालती है, वह दूसरे सवाल के बारे में कुछ बता रही है।',
          ],
        },
      },
      {
        heading: {
          en: 'Three warnings that should end the conversation',
          hi: 'तीन चेतावनी जो बातचीत ख़त्म कर दें',
        },
        body: {
          en: [
            'If someone offers you Hajj quota, stop. In India, quota comes only from the Haj Committee of India and cannot be bought, reserved or arranged by an agent under any circumstances.',
            'If someone quotes a price without stating the hotel distance or the inclusions, the number is not a price, it is a hook. The real price appears after you have committed.',
            'If they tell you Indian pilgrims can apply for the Umrah visa directly on Nusuk, walk away. It is not true, and anyone willing to say it is not being straight with you about the basics.',
          ],
          hi: [
            'अगर कोई आपको हज कोटा देने की बात करे, तो रुक जाइए। भारत में कोटा केवल हज कमेटी ऑफ इंडिया से आता है और किसी भी परिस्थिति में एजेंट द्वारा नहीं ख़रीदा, आरक्षित या व्यवस्थित किया जा सकता।',
            'अगर कोई होटल की दूरी या शामिल चीज़ें बताए बिना ही दाम बता दे, तो वह दाम नहीं है, वह जाल है। असली दाम तब सामने आता है जब आप पहले ही पैसा दे चुके होते हैं।',
            'अगर वे कहें कि भारतीय जायरीन Nusuk पर सीधे उमरा वीज़ा के लिए आवेदन कर सकते हैं, तो चले जाइए। यह सच नहीं है, और जो बुनियादी बात पर सच नहीं बोल सकता, उस पर भरोसा नहीं किया जा सकता।',
          ],
        },
      },
    ],
  },
  {
    slug: 'umrah-from-marathwada',
    title: {
      en: 'Planning Umrah from Marathwada: airports, timings and pickups',
      hi: 'मराठवाड़ा से उमरा की योजना: हवाई अड्डे, समय और पिकअप',
    },
    description: {
      en: 'Which airport each Marathwada district should use, how long the transfer takes, and how group pickups are arranged.',
      hi: 'मराठवाड़ा का कौन सा जिला किस हवाई अड्डे का उपयोग करे, स्थानांतरण में कितना समय लगे, और समूह की पिकअप कैसे होती है।',
    },
    answer: {
      en: 'Jalna and CSN (Aurangabad) pilgrims usually fly from CSN (Aurangabad) (IXU), Latur, Beed, Parbhani and Dharashiv from Hyderabad (HYD), and Washim and Hingoli from Nagpur (NAG). Group pickups are arranged so that everyone from an area travels to the airport together rather than separately.',
      hi: 'जालना और छत्रपति संभाजीनगर के जायरीन आमतौर पर छत्रपति संभाजीनगर (IXU) से, लातूर, बीड, परभणी और धाराशिव के जायरीन हैदराबाद (HYD) से, और वाशिम व हिंगोली के जायरीन नागपुर (NAG) से उड़ान भरते हैं। समूह की पिकअप इस तरह होती है कि एक इलाके के सभी लोग अलग-अलग नहीं बल्कि साथ हवाई अड्डे जाएँ।',
    },
    datePublished: '2026-04-18',
    dateModified: '2026-10-01',
    sections: [
      {
        heading: {
          en: 'The short version by district',
          hi: 'जिलेवार संक्षिप्त जानकारी',
        },
        body: {
          en: [
            'CSN (Aurangabad) has the closest airport to the two holy cities of anywhere in Marathwada, which is why a high share of our groups form there. Jalna pilgrims make the short run to the same airport or fly from Mumbai. In the east, Hyderabad serves Latur, Beed, Parbhani and Dharashiv. In the north, Nagpur serves Washim, Hingoli and parts of Nanded.',
            'Rough road distances, for orientation only: Jalna to IXU is about 65 km; Nanded to Hyderabad about 200 km; Latur to Hyderabad about 180 km; Beed to Hyderabad about 160 km; Washim to Nagpur about 170 km; Hingoli to Nagpur about 200 km. The exact itinerary is confirmed with the office when a group is formed, because road conditions and flight timings change.',
          ],
          hi: [
            'छत्रपति संभाजीनगर के पास मराठवाड़ा में कहीं भी दो पवित्र शहरों के सबसे करीब का हवाई अड्डा है, इसीलिए हमारे बड़े हिस्सा समूह वहीं बनते हैं। जालना के जायरीन उसी हवाई अड्डे की छोटी दूरी तय करते हैं या मुंबई से उड़ान भरते हैं। पूर्व में, हैदराबाद लातूर, बीड, परभणी और धाराशिव की सेवा करता है। उत्तर में, नागपुर वाशिम, हिंगोली और नांदेड़ के कुछ हिस्सों की।',
            'सड़क की लगभग दूरियाँ, केवल दिशा-निर्देश हेतु: जालना से IXU लगभग ६५ किमी; नांदेड़ से हैदराबाद लगभग २०० किमी; लातूर से हैदराबाद लगभग १८० किमी; बीड से हैदराबाद लगभग १६० किमी; वाशिम से नागपुर लगभग १७० किमी; हिंगोली से नागपुर लगभग २०० किमी। समूह बनने पर कार्यालय से ठीक यात्रा-क्रम की पुष्टि हो जाती है, क्योंकि सड़क की हालत और उड़ानों का समय बदलता रहता है।',
          ],
        },
      },
      {
        heading: {
          en: 'How group pickups actually work',
          hi: 'समूह की पिकअप वास्तव में कैसे होती है',
        },
        body: {
          en: [
            'Passengers are collected from their address, or from a common point in a village where several families live close together. The group then travels to the airport as one unit, checks in together, and is dropped back at its starting point on return.',
            'For areas that are two to three hours from the airport, plan on an early start. Reporting time at the airport is set generously so that a slow road does not become a missed flight, and it is confirmed to you in writing before departure.',
          ],
          hi: [
            'यात्रियों को उनके पते से, या कई परिवार एक साथ रहने वाले गाँव में एक साझा बिंदु से लिया जाता है। फिर समूह एक इकाई के रूप में हवाई अड्डे जाता है, एक साथ चेक-इन करता है, और वापसी पर अपने शुरुआती बिंदु पर छोड़ दिया जाता है।',
            'जिन इलाकों में हवाई अड्डा दो से तीन घंटे की दूरी पर हो, वहाँ जल्दी निकलने की योजना रखें। हवाई अड्डे पर रिपोर्टिंग का समय ढेर पहले तय किया जाता है ताकि धीमी सड़क छूटी हुई उड़ान न बने, और यह रवाना से पहले आपको लिखित रूप में बताया जाता है।',
          ],
        },
      },
    ],
  },
  {
    slug: 'what-to-pack-for-umrah',
    title: {
      en: 'What to pack for Umrah, and what not to bother with',
      hi: 'उमरा के लिए क्या सामान ले जाएँ, और किसकी चिंता न करें',
    },
    description: {
      en: 'A practical packing list for a first Umrah, including the items that are hard to replace in Saudi Arabia.',
      hi: 'पहली उमरा के लिए व्यावहारिक पैकिंग सूची, उन चीज़ों के साथ जो सऊदी अरब में मिलना मुश्किल है।',
    },
    answer: {
      en: 'Pack for heat, modest clothing and a long stay: loose clothing, comfortable non-slip shoes for the Haram walk, a light shawl for Madinah at night, all regular medication with a prescription copy, and copies of passport, visa and insurance documents in both digital and paper form. Umrah is a modest pilgrimage, so clothing that covers the shoulders and knees for both men and women is the practical requirement.',
      hi: 'गर्मी, शालीन वस्त्र और लंबे ठहराव के हिसाब से सामान ले जाएँ: ढीले कपड़े, हरम की सैर के लिए आरामदायक नॉन-स्लिप जूते, मदीना में रात के लिए हल्का शॉल, सारी नियमित दवाइयाँ प्रिस्क्रिप्शन की कॉपी के साथ, और पासपोर्ट, वीज़ा और बीमा दस्तावेज़ों की कॉपी डिजिटल और कागज़ी दोनों रूपों में। उमरा शालीन तीर्थ है, इसलिए कंधे और घुटने ढकने वाले कपड़े पुरुषों और महिलाओं दोनों के लिए व्यावहारिक आवश्यकता है।',
    },
    datePublished: '2026-05-22',
    dateModified: '2026-09-29',
    sections: [
      {
        heading: {
          en: 'The genuinely hard to replace items',
          hi: 'वे चीज़ें जिनकी जगह लेना सच में मुश्किल है',
        },
        body: {
          en: [
            'Medications you take daily. The common Indian brands are not always available locally, and a prescription copy in English helps at any pharmacy. If you have a condition that is visible or documented, carry the relevant paperwork — it matters for visa and medical screening as well as for treatment.',
            'Any glasses or contact lenses, plus a spare pair, since losing your only pair during a month-long trip is a genuine problem. Same logic applies to hearing aids, if you use one.',
            'Modest clothing in quantity. You will be walking a great deal and washing frequently, so two to three times the number of outfits you would wear on a holiday is realistic.',
          ],
          hi: [
            'रोज़ की दवाइयाँ। आम भारतीय ब्रांड स्थानीय रूप से हमेशा उपलब्ध नहीं होते, और अंग्रेज़ी में प्रिस्क्रिप्शन की कॉपी किसी भी फ़ार्मेसी में मदद करती है। यदि कोई ऐसी स्थिति है जो दिखाई देती या दर्ज होती है, तो संबंधित कागज़ात साथ ले जाएँ — वीज़ा और चिकित्सा जाँच में भी यह मायने रखता है।',
            'चश्मा या कॉन्टैक्ट लेंस, और एक अतिरिक्त जोड़ी भी, क्योंकि महीने भर की यात्रा में अपना एकमात्रा जोड़ी खो देना वास्तव में समस्या है। श्रवण सहायक का उपयोग करते हैं तो वही तर्क लागू होता है।',
            'पर्याप्त मात्रा में शालीन वस्त्र। आप बहुत पैदल चलेंगे और बार-बार धोएँगे, इसलिए छुट्टी के दौरान पहनने वाले कपड़ों से दो-तीन गुना अनुपात वास्तविक है।',
          ],
        },
      },
      {
        heading: {
          en: 'What not to bother with',
          hi: 'किस बात की चिंता न करें',
        },
        body: {
          en: [
            'Don\'t pack heavy furniture of convenience: your bag kit from us already includes a suitcase, a shoes bag for the Haram walk and a document bag, and the package includes unlimited laundry, so you do not need to carry a week of laundry in your suitcase.',
            'Don\'t worry about Zamzam. Five litres is supplied and packed for your return journey, so there is no reason to buy or carry any yourself.',
            'Do not carry food or medicines that could be questioned at customs. If you have a specific dietary need, tell the office in advance — Indian food is available during the stay, which resolves most of these cases anyway.',
          ],
          hi: [
            'भारी सामान न ले जाएँ: हमारे बैग किट में पहले से सूटकेस, हरम सैर के लिए शूज़ बैग और डॉक्यूमेंट बैग है, और पैकेज में असीमित लॉन्ड्री शामिल है, इसलिए आपको एक हफ़्ते का कपड़ा सूटकेस में नहीं रखना।',
            'ज़मज़म की चिंता न करें। पाँच लीटर दिया जाता है और वापसी यात्रा के लिए पैक होकर मिलता है, इसलिए खुद ख़रीदने या ले जाने की कोई ज़रूरत नहीं।',
            'ऐसा खाना या दवाइयाँ न ले जाएँ जिन पर सीमा शुल्क पर सवाल उठ सके। कोई विशेष आहार ज़रूरत हो तो पहले कार्यालय को बताएँ — ठहरने के दौरान भारतीय भोजन उपलब्ध है, जो अधिकांश ऐसे मामले हल ही कर देता है।',
          ],
        },
      },
    ],
  },
  {
    slug: 'expedition-guide',
    title: {
      en: 'Your expedition guide: who accompanies you, and how to know they are thorough',
      hi: 'आपका प्रतिदिन मार्गदर्शक: कौन साथ ले जाता है, और कैसे पता चलेगा कि वह समझदार हैं',
    },
    description: {
      en: 'What an expedition guide does from landing to return, why the same person should carry you from document check to final pickup, and the signs that your guide is hardworking and leaves no pilgrim behind.',
      hi: 'लैंडिंग से लेकर वापसी तक प्रतिदिन मार्गदर्शक क्या करता है, क्यों एक ही व्यक्ति को दस्तावेज़ जाँच से लेकर आखिरी पिकअप तक साथ रखना चाहिए, और यह संकेत कि आपका मार्गदर्शक मेहनती हैं और किसी भी जायरीन को पीछे नहीं छोड़ते।',
    },
    answer: {
      en: 'Your expedition guide is the person who stays with your group in Saudi Arabia from landing to return. They are the one who meets you at the airport, checks your documents, walks every step of the Haram with you, and is the number you call when something needs sorting. A good expedition guide works hard at every stage — from the first document check to the last return pickup — listing every detail so families never miss a step, and taking each and every pilgrim along with them so no one is left alone in a foreign country.',
      hi: 'आपका प्रतिदिन मार्गदर्शक वह व्यक्ति है जो सऊदी अरब में आपके समूह के साथ लैंडिंग से लेकर वापसी तक रहता है। वही है जो हवाई अड्डे पर मिलेंगे, आपके दस्तावेज़ों की जाँच करेंगे, हरम का हर कद आपके साथ चलेंगे, और वही नंबर है जिस पर आप फ़ोन कर सकते हैं जब किसी चीज़ को सुलझाने की ज़रूरत हो। एक अच्छा प्रतिदिन मार्गदर्शक हर चरण पर मेहनत करता है — पहली दस्तावेज़ जाँच से लेकर आखिरी वापसी पिकअप तक — हर चीज़ का ध्यान रखता है ताकि कोई परिवार कदम न छोड़े, और हर एक जायरीन को साथ ले जाता है ताकि कोई विदेश में अकेला न रहे।',
    },
    datePublished: '2026-10-03',
    dateModified: '2026-10-03',
    sections: [
      {
        heading: {
          en: 'What an expedition guide actually does',
          hi: 'प्रतिदिन मार्गदर्शक वास्तव में क्या करता हैं',
        },
        body: {
          en: [
            'The guide meets your group at the airport in Saudi Arabia, accompanies you through immigration, and stays with you through hotel check-in, the first Tawaf, and the first few days of orientation. After that, they are on call for the whole group for the duration of the stay — document issues, health questions, transport changes, and anything that does not go to plan.',
            'On return, the same guide is there for your final pickup, makes sure every bag is loaded, and walks with you until you are on the plane home. The person who greets you on arrival is the same person who sees you off at the airport.',
          ],
          hi: [
            'मार्गदर्शक आपके समूह का स्वागत सऊदी अरब के हवाई अड्डे पर करता है, आपके साथ आवंशनीकरण के माध्यम से चलता है, और होटल चेक-इन, पहला तवाफ़ और शुरुआती कुछ दिनों के अभियान के बाद तक आपके साथ रहता है। उसके बाद, वह पूरे समूह के लिए बुक रहा होता है जब तक ठहराव की अवधि निर्धारित नहीं होती — दस्तावेज़ समस्याएँ, स्वास्थ्य सवाल, ट्रांसपोर्ट बदलाव और कुछ भी जो योजना के साथ नहीं चलता।',
            'वापसी पर, वही मार्गदर्शक आपके आखिरी पिकअप के लिए होता है, यह सुनिश्चित करता है कि हर बैग लोड हो गया है, और आपके हवाई जहाज़ पर बैठे जाने तक आपके साथ चलता है। जो आपका स्वागत पहले हवाई अड्डे पर करता है, वही वही है जो आपका विदाई पहले हवाई अड्डे पर देखता है।',
          ],
        },
      },
      {
        heading: {
          en: 'How to tell if your guide is thorough',
          hi: 'कैसे पता चलेगा कि आपका मार्गदर्शक समझदार हैं',
        },
        body: {
          en: [
            'A thorough guide lists every detail — hotel distances, meal plans, prayer timings, emergency contacts — instead of assuming you will figure it out on the spot. They work hard at every stage: document checks, pickup coordination, hotel handovers, and daily check-ins with the group. They answer every question in full, and they make sure each pilgrim is looked after.',
            'At Hi-Tech Haj Umrah Services, the founder Shaikh Ashfaq leads every departure himself. He is hardworking and listing from the first document check to the last return pickup, and he takes each and every pilgrim along with him — sab ku sath leke chalte hai — because no family should have to sort things out alone in a foreign country.',
          ],
          hi: [
            'एक समझदार मार्गदर्शक हर चीज़ की सूची बनाता है — होटल की दूरी, भोजन योजना, प्रार्थना समय, आपात संपर्क — बजाय इसके कि वह मान लेगा कि आप ठहर पर ठीक से ढूँढ़ लेंगे। वह हर चरण पर मेहनत करता है: दस्तावेज़ जाँच, पिकअप का समन्वय, होटल हाथाहाथ, और समूह के साथ दैनिक जाँच। वह हर सवाल का पूरा जवाब देता है, और यह सुनिश्चित करता है कि प्रत्येक जायरीन का ध्यान रहे।',
            'हाइ-टेक हज उमरा सर्विसेज में, संस्थापक शेख़ अशफ़ाक हर रवाने का नेतृत्व स्वयं करते हैं। वह मेहनती और सूचीबद्ध हैं — पहली दस्तावेज़ जाँच से लेकर आखिरी वापसी पिकअप तक — और वह हर एक जायरीन को साथ ले जाते हैं — सबकुछ साथ लेकर चलते हैं — क्योंकि किसी परिवार को विदेश में अकेला चीज़ों को सुलझाने की ज़रूरत नहीं है।',
          ],
        },
      },
      {
        heading: {
          en: 'What to expect from our Expedition Guide',
          hi: 'हमारे प्रतिदिन मार्गदर्शक से आशा क्या करें',
        },
        body: {
          en: [
            'Before you travel: the office confirms the group, sends a written itinerary with pickup time and point, and answers any question about visa or documents.',
            'In Saudi Arabia: a dedicated guide meets you at the airport, checks documents, and stays on call for the whole group. They carry the local number, the hotel address, and the emergency contact.',
            'Throughout: the guide walks the Haram with you, explains the rites, helps with Qurbani or Rawdah bookings, and checks in daily so no one is missed.',
          ],
          hi: [
            'यात्रा से पहले: कार्यालय समूह की पुष्टि करता है, लिखित यात्रा-क्रम भेजता है जिसमें पिकअप समय और बिंदु होता है, और वीज़ा या दस्तावेज़ों के बारे में किसी भी सवाल का जवाब देता है।',
            'सऊदी अरब में: एक समर्पित मार्गदर्शक आपका स्वागत हवाई अड्डे पर करता है, दस्तावेज़ों की जाँच करता है, और पूरे समूह के लिए बुक रहा होता है। वह स्थानीय नंबर, होटल का पता, और आपात संपर्क को साथ रखता है।',
            'संपूर्ण: मार्गदर्शक हरम के साथ आपका चलता है, अनुष्ठानों की व्याख्या करता है, कुर्बानी या रावढ़ा बुकिंग में मदद करता है, और दैनिक जाँच करता है ताकि कोई भी जायरीन न छूटे।',
          ],
        },
      },
    ],
  },
]

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug)
}
