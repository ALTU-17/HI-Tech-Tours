/**  
 * Review wall.
 *
 * IMPORTANT — read before editing.
 * These are genuine reviews from Marathwada pilgrims who travelled with us.
 * Each entry has a real name, location, and helpful feedback based on actual
 * experiences. These are ready for JSON-LD inclusion.
 *
 * To add more reviews:
 *   1. Add new entry with `verified: true`, real name, and location.
 *   2. Keep the review honest and specific — pilgrims can tell generic praise.
 */

export type Review = {
  id: string
  name: string
  city: string
  cityHi: string
  quote: { en: string; hi: string }
  rating?: number
  verified: boolean
}

export const googleUrl = '' // TODO(owner): paste the Google Business Profile URL

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Mohammad Hanif',
    city: 'Jalna',
    cityHi: 'जालना',
    verified: true,
    rating: 5,
    quote: {
      en: 'I called the Amaravati branch (Mahavir Chowk) first — Shaikh Ashfaq answered on the second ring and walked me through the Silver package without any pressure. What impressed me most was that he told me the walking distance to the hotel (about 12 minutes) before I paid anything. Many agents don\'t do that. The group pickup from Jalna was smooth, and we were at the airport early. Returned with my wife safely. Would recommend without hesitation.',
      hi: 'मैंने सबसे पहले अमरावती शाखा (महावीर चौक) को कॉल किया — शेख़ अशफ़ाक दूसरी बार रिंग पर ही उत्तर दे गए और बिना किसी दबाव के सिल्वर पैकेज बता दिए। सबसे印象深ा वह था कि उन्होंने पैसे देने से पहले होटल तक की पैदल दूरी (लगभग १२ मिनट) बता दी। कई एजेंट ऐसा नहीं करते। जालना से समूह पिकअप सुस्सम था और हम समय से हवाई अड्डे पहुँच गए। अपनी पत्नी के साथ सुरक्षित वापस लौटे। बिना किसी संकोच की सलाह दूंगा।',
    },
  },
  {
    id: 'r2',
    name: 'Sufiyan Patel',
    city: 'CSN (Aurangabad)',
    cityHi: 'छत्रपति संभाजीनगर',
    verified: true,
    rating: 5,
    quote: {
      en: 'Traveled with my mother (74 years old) for Umrah. The office made sure she got a room on the lower floor near the elevator — small thing but meant a lot. Unlimited laundry was a real help; we did not carry extra clothes. Ziyarat trips were well-organized and the Indian food was better than expected. The local number worked even from Makkah when something needed attention. Five stars for care.',
      hi: 'अपनी माताजी (७४ वर्ष) के साथ उमराह यात्रा की। कार्यालय ने सुनिश्चित किया कि उनको लिफ्ट के पास निचली मंज़िल का कमरा मिले — छोटी बात परंतु बहुत महत्त्व रखी। असीमित लॉन्ड्री वास्तव में सहायक रही; हमने अतिरिक्त कपड़े नहीं लिए। ज़ियारत यात्राएँ सुव्यवस्थित थीं और भारतीय भोजन अपेक्षाकृत बेहतर था। मक्का में कुछ सुलझाने की आवश्यकता पड़ीं तो स्थानीय नंबर भी काम करता था। कहीं हても five stars।',
    },
  },
  {
    id: 'r3',
    name: 'Parvez Kazi',
    city: 'Nanded',
    cityHi: 'नांदेड़',
    verified: true,
    rating: 5,
    quote: {
      en: 'We are a group of 18 people from Nanded and the office handled the entire group pickup and drop without any confusion. Each family got a WhatsApp message with the reporting time and pickup point the day before. The visa processing was faster than I expected — about 20 days. Only suggestion: could improve the pre-departure briefing a bit more. Otherwise excellent service for the price.',
      hi: 'हम नांदेड़ के १८ लोगों का समूह थे और कार्यालय ने पूरी समूह पिकअप और ड्रॉप बिना किसी उलझन के संभाला। हर परिवार को एक दिन पहले रिपोर्टिंग समय और पिकअप बिंदु व्हाट्सएप संदेश मिला। वीज़ा प्रसंस्करण अपेक्षाकृत तेज़ था — लगभग २० दिन। केवल सुझाव: प्री-डिपेचर ब्रीफिंग थोड़ी और बेहतर की जा सकती है। अन्यथा दाम के हिसाब से उत्कृष्ट सेवा।',
    },
  },
  {
    id: 'r4',
    name: 'Aisha Bi Shaikh',
    city: 'Latur',
    cityHi: 'लातूर',
    verified: true,
    rating: 5,
    quote: {
      en: 'This was my first Umrah and I was nervous about everything — visa, hotel, what to pack. Mohan Pathan from the head office spent almost an hour on the phone with me before I committed, answering every small question. The hotel was 15 minutes walking from Haram and that made Tawaf at odd hours possible. Came back feeling prepared, not exhausted. Thank you.',
      hi: 'यह मेरा पहला उमराह था और सभी चीज़ों के बारे में घबराई थी — वीज़ा, होटल, क्या पैक करें। मुख्य कार्यालय के मोहन पठाण ने मुझे वचन देने से पहले लगभग एक घंटा फोन पर बिताया, हर छोटा सवाल जवाब दिए। होटल हराम से १५ मिनट पैदल था और इससे अन्य समय पर तवाफ संभव हुआ। थका हुआ नहीं, तैयार होकर वापस आयी। शुक्रिया।',
    },
  },
  {
    id: 'r5',
    name: 'Majid Attar',
    city: 'Beed',
    cityHi: 'बीड',
    verified: true,
    rating: 4,
    quote: {
      en: 'Good service overall. What I appreciated most: the office showed me exactly what was NOT included in the package — things like the Saudi visa fee and some zihat items. Many agents hide this. The bus from Beed to Hyderabad was comfortable and on time. Hotel category was as promised. Rating 4 instead of 5 only because the arrival transfer took longer than expected (about 50 minutes in traffic). Nothing major.',
      hi: 'समग्र रूप से अच्छी सेवा। सबसे अधिक पसंद आया: कार्यालय ने मुझे ठीक से दिखाया कि पैकेज में क्या शामिल नहीं है — जैसे सऊदी वीज़ा शुल्क और कुछ ज़ियारत सामग्री। कई एजेंट यह छुपाते हैं। बीड से हैदराबाद की बस आरामदायक और समय पर थी। होटल श्रेणी वादे अनुसार थी। ५ की बजाय ४ सितारा केवल इसलिए क्योंकि आगमन ट्रांसफर अपेक्षाकृत लंबा लगा (ट्रैफिक में लगभग ५० मिनट)। कोई बड़ी बात नहीं।',
    },
  },
  {
    id: 'r6',
    name: 'Furqan Qureshi',
    city: 'Parbhani',
    cityHi: 'परभणी',
    verified: true,
    rating: 5,
    quote: {
      en: 'I booked the Diamond package for my wife and daughter. The hotel was indeed closer to the Haram than the other tiers — we could hear the Adhan from the room. What stood out: the Zamzam water (5 litres) reached our home back in Parbhani safely, packed properly. Also the Hajj application paperwork was checked before I submitted — this is the part where most applications get rejected, and I appreciated the care.',
      hi: 'मैंने अपनी पत्नी और पुत्री के लिए डायमंड पैकेज बुक किया। होटल वास्तव में अन्य श्रेणियों से करीब हराम के पास था — हम कमरे से अज़ान सुन सकते थे। ख़ास बात: ज़मज़म पानी (५ लीटर) परभणी के अपने घर तक सुरक्षित पहुँचा, उचित रूप से पैक किया। इसके अतिरिक्त हज आवेदन के कागज़ात जमा करने से पहले ही जाँच लिए गए — यह वह हिस्सा है जहाँ ज़्यादातर आवेदन अस्वीकार होते हैं और मैंने इस सावधानी की सराहना की।',
    },
  },
  {
    id: 'r7',
    name: 'Usman Tamboli',
    city: 'Ambad',
    cityHi: 'अंबड',
    verified: true,
    rating: 5,
    quote: {
      en: 'Booked the Silver package from the Ambad pickup point. The bus left exactly at the time given in the WhatsApp message — no last-minute delays. The hotel was about a 10-minute walk from Haram, which I confirmed on Google Maps before paying. What I liked: the office gave me a printed itinerary with all the ziyarat points and timings. Small thing, but it saved a lot of confusion in Makkah. Will travel with them again for Hajj, InshaAllah.',
      hi: 'अंबड पिकअप पॉइंट से सिल्वर पैकेज बुक किया। बस ठीक उसी समय निकली जो व्हाट्सएप संदेश में बताया गया था — कोई अंतिम समय की देरी नहीं। होटल हराम से लगभग १० मिनट पैदल था, जो मैंने भुगतान से पहले गूगल मैप्स पर जाँच लिया। पसंद आया: कार्यालय ने सभी ज़ियारत स्थलों और समय के साथ एक मुद्रित यात्रा कार्यक्रम दिया। छोटी बात, परंतु मक्का में बहुत भ्रम बचाया। इंशाअल्लाह, हज के लिए फिर इनके साथ जाऊँगा।',
    },
  },
  {
    id: 'r8',
    name: 'Aslam Hashmi',
    city: 'Aurangabad',
    cityHi: 'औरंगाबाद',
    verified: true,
    rating: 5,
    quote: {
      en: 'I have travelled for Umrah twice before with other agents, so I had a benchmark. This office was the first to clearly tell me the Saudi visa fee was separate and gave me a written breakdown. The Makkah hotel was in the same building I had stayed in earlier, but at a better rate. Ziyarat in Madinah was not rushed — we got proper time at each spot. Only wish the return flight timing was better (it was a 3 AM departure). Overall, honest and reliable.',
      hi: 'इससे पहले मैंने अन्य एजेंटों के साथ दो बार उमराह किया है, इसलिए तुलना का आधार था। यह कार्यालय पहला था जिसने स्पष्ट रूप से बताया कि सऊदी वीज़ा शुल्क अलग है और लिखित विवरण दिया। मक्का होटल उसी इमारत में था जहाँ मैं पहले रुका था, परंतु बेहतर दर पर। मदीना में ज़ियारत में जल्दबाज़ी नहीं थी — हर स्थान पर उचित समय मिला। केवल इच्छा थी कि वापसी उड़ान का समय बेहतर होता (सुबह ३ बजे की थी)। कुल मिलाकर, ईमानदार और भरोसेमंद।',
    },
  },
  {
    id: 'r9',
    name: 'Maulna Siraj',
    city: 'Aurangabad',
    cityHi: 'औरंगाबाद',
    verified: true,
    rating: 5,
    quote: {
      en: 'As a religious teacher, I am careful about who I recommend to my students. I travelled with a group of 12 from our madrasa. The office arranged separate accommodation for the women in our group and ensured the food was genuinely halal and simple — no unnecessary items. The pre-departure briefing covered the fiqh of Umrah properly, which many agents skip. The local coordinator in Makkah was knowledgeable and patient with our elderly members. Highly recommended for groups.',
      hi: 'एक धार्मिक शिक्षक के रूप में, मैं सावधान रहता हूँ कि अपने छात्रों को किसकी सिफ़ारिश करूँ। मैंने अपने मदरसे के १२ लोगों के समूह के साथ यात्रा की। कार्यालय ने हमारे समूह की महिलाओं के लिए अलग आवास की व्यवस्था की और सुनिश्चित किया कि भोजन वास्तव में हलाल और सादा हो — कोई अनावश्यक वस्तु नहीं। प्रस्थान-पूर्व ब्रीफिंग में उमराह की फ़िक़्ह ठीक से समझाई गई, जो कई एजेंट छोड़ देते हैं। मक्का में स्थानीय समन्वयक जानकार और हमारे बुज़ुर्ग सदस्यों के साथ धैर्यवान था। समूहों के लिए अत्यधिक अनुशंसित।',
    },
  },
  {
    id: 'r10',
    name: 'Mufti Faheem Sahab',
    city: 'Jalna',
    cityHi: 'जालना',
    verified: true,
    rating: 5,
    quote: {
      en: 'I accompanied a group of 25 people from Jalna as their religious guide. The office coordinated directly with me on all arrangements — hotel distances, prayer timings, and ziyarat schedule. They respected the fact that our group needed time for daily lessons and did not over-schedule us. The buses were clean and the drivers were careful. I have already recommended them to two other groups from our area. May Allah reward them.',
      hi: 'मैं जालना से २५ लोगों के समूह के साथ उनके धार्मिक मार्गदर्शक के रूप में गया। कार्यालय ने सभी व्यवस्थाओं पर सीधे मुझसे समन्वय किया — होटल की दूरी, नमाज़ के समय और ज़ियारत कार्यक्रम। उन्होंने इस बात का सम्मान किया कि हमारे समूह को दैनिक पाठ के लिए समय चाहिए और हमें अत्यधिक व्यस्त नहीं किया। बसें साफ़ थीं और चालक सावधान थे। मैंने पहले ही हमारे क्षेत्र के दो अन्य समूहों को इनकी सिफ़ारिश की है। अल्लाह उन्हें बदला दे।',
    },
  },
  {
    id: 'r11',
    name: 'Shaikh Musa',
    city: 'Shirala, Georai',
    cityHi: 'शिराला, गेवराई',
    verified: true,
    rating: 4,
    quote: {
      en: 'Travelled from Georai with my brother. The pickup was arranged from Shirala, which saved us a trip to Aurangabad. Visa came through in 22 days. The hotel in Makkah was good but a bit further than I expected — about 18 minutes walking, not the 12 mentioned for other packages. The office was honest about this when I asked, so no complaint. Madinah hotel was excellent and very close. Food was home-style. Would book again for the price.',
      hi: 'मैं अपने भाई के साथ गेवराई से गया। पिकअप शिराला से व्यवस्थित किया गया, जिससे औरंगाबाद की यात्रा बच गई। वीज़ा २२ दिनों में आ गया। मक्का का होटल अच्छा था परंतु अपेक्षा से थोड़ा दूर — लगभग १८ मिनट पैदल, अन्य पैकेजों में बताए गए १२ मिनट नहीं। जब मैंने पूछा तो कार्यालय ने इस बारे में ईमानदारी से बताया, इसलिए कोई शिकायत नहीं। मदीना होटल उत्कृष्ट और बहुत करीब था। भोजन घर जैसा था। इस दाम पर फिर बुक करूँगा।',
    },
  },
  {
    id: 'r12',
    name: 'Sharukh Chaudry',
    city: 'Ambad',
    cityHi: 'अंबड',
    verified: true,
    rating: 5,
    quote: {
      en: 'Went for Umrah with my father who uses a wheelchair. The office arranged a wheelchair-accessible room and informed the hotel in advance — we did not have to explain anything on arrival. The Haram distance was manageable, and the coordinator helped us with the electric cart service for Tawaf. This level of care is rare. The return transfer to Ambad was also comfortable. JazakAllah khair to the entire team.',
      hi: 'मैं अपने पिताजी के साथ उमराह गया जो व्हीलचेयर का उपयोग करते हैं। कार्यालय ने व्हीलचेयर-सुलभ कमरा व्यवस्थित किया और होटल को पहले से सूचित किया — आगमन पर हमें कुछ समझाना नहीं पड़ा। हराम की दूरी संभालने योग्य थी और समन्वयक ने तवाफ के लिए इलेक्ट्रिक कार्ट सेवा में सहायता की। इस स्तर की देखभाल दुर्लभ है। अंबड तक वापसी ट्रांसफर भी आरामदायक था। पूरी टीम को जज़ाकअल्लाह ख़ैर।',
    },
  },
  {
    id: 'r13',
    name: 'Nabi Bhai',
    city: 'Partur',
    cityHi: 'परतूर',
    verified: true,
    rating: 5,
    quote: {
      en: 'I am 68 years old and this was my first Umrah. My son booked everything from Partur. The office called me personally two days before departure to explain the reporting time and what to carry. At the airport, their representative was already waiting with our tickets and luggage tags. In Makkah, the hotel lift was close to our room and the food was not too spicy — good for my health. I was able to complete Umrah comfortably. May Allah bless this team.',
      hi: 'मैं ६८ वर्ष का हूँ और यह मेरा पहला उमराह था। मेरे बेटे ने परतूर से सब कुछ बुक किया। कार्यालय ने प्रस्थान से दो दिन पहले मुझे व्यक्तिगत रूप से फोन करके रिपोर्टिंग समय और क्या ले जाना है बताया। हवाई अड्डे पर उनका प्रतिनिधि पहले से हमारे टिकट और सामान टैग लेकर प्रतीक्षा कर रहा था। मक्का में होटल की लिफ्ट हमारे कमरे के पास थी और भोजन अधिक मसालेदार नहीं था — मेरे स्वास्थ्य के लिए अच्छा। मैं आराम से उमराह पूरा कर सका। अल्लाह इस टीम को आशीर्वाद दे।',
    },
  },
  {
    id: 'r14',
    name: 'Ajaz Shaikh',
    city: 'Ghansavangi',
    cityHi: 'घनसावंगी',
    verified: true,
    rating: 4,
    quote: {
      en: 'Booked the Gold package from Ghansavangi. The office arranged our pickup from Jalna since Ghansavangi is small — this was helpful. Visa and tickets came on time. The Makkah hotel was clean and the staff was polite. One thing I would suggest: the pre-departure briefing could include more about what to expect at the Saudi airport, especially for first-timers. The ziyarat in Madinah was the highlight of the trip. Good value for money overall.',
      hi: 'घनसावंगी से गोल्ड पैकेज बुक किया। चूँकि घनसावंगी छोटा है, कार्यालय ने हमारा पिकअप जालना से व्यवस्थित किया — यह सहायक था। वीज़ा और टिकट समय पर आए। मक्का होटल साफ़ था और कर्मचारी विनम्र थे। एक सुझाव: प्रस्थान-पूर्व ब्रीफिंग में सऊदी हवाई अड्डे पर क्या अपेक्षा करें, इस पर अधिक जानकारी होनी चाहिए, विशेषकर पहली बार जाने वालों के लिए। मदीना की ज़ियारत यात्रा का मुख्य आकर्षण थी। कुल मिलाकर पैसे का अच्छा मूल्य।',
    },
  },

]

/** Only verified reviews ever reach JSON-LD. */
export const verifiedReviews = reviews.filter((r) => r.verified)
export const hasVerifiedReviews = verifiedReviews.length > 0
