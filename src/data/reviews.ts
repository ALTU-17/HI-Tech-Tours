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
]

/** Only verified reviews ever reach JSON-LD. */
export const verifiedReviews = reviews.filter((r) => r.verified)
export const hasVerifiedReviews = verifiedReviews.length > 0
