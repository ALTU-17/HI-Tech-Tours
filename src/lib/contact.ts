import { site } from '@/data/site'
import type { Locale } from '@/i18n'

/** Digits-only form required by tel: and wa.me. */
export function telHref(phone: string) {
  return `tel:+91${phone.replace(/\D/g, '')}`
}

/**
 * WhatsApp deep link with a prefilled message.
 * The message is written in the visitor's chosen language — replying to a
 * Hindi enquiry in English is a small thing that costs trust.
 */
export function whatsappHref(message: string, phone: string = site.whatsapp) {
  const digits = phone.replace(/\D/g, '')
  // wa.me requires the full international number. A local 10-digit number
  // is qualified with India's country code so the link always resolves to
  // +91 (e.g. 9303313313 → wa.me/919303313313).
  const international = digits.length === 10 ? `91${digits}` : digits.replace(/^0/, '')
  return `https://wa.me/${international}?text=${encodeURIComponent(message)}`
}

export type EnquiryTopic = 'package' | 'hajj' | 'visa' | 'general' | 'pickup'

const topics: Record<Locale, Record<EnquiryTopic, string>> = {
  en: {
    package: 'Assalamu alaikum. I would like details about your Umrah packages.',
    hajj: 'Assalamu alaikum. I would like help with the Hajj application process.',
    visa: 'Assalamu alaikum. I would like help with the Umrah visa process.',
    general: 'Assalamu alaikum. I have a question about Haj and Umrah services.',
    pickup: 'Assalamu alaikum. I would like to register my group for a departure from my area.',
  },
  hi: {
    package: 'अस्सलामु अलाइकुम। मैं आपके उमरा पैकेजों के बारे में विवरण चाहता/चाहती हूँ।',
    hajj: 'अस्सलामु अलाइकुम। मैं हज आवेदन की प्रक्रिया में सहायता चाहता/चाहती हूँ।',
    visa: 'अस्सलामु अलाइकुम। मैं उमरा वीज़ा प्रक्रिया में सहायता चाहता/चाहती हूँ।',
    general: 'अस्सलामु अलाइकुम। हज व उमरा सेवाओं के बारे में मेरा एक सवाल है।',
    pickup: 'अस्सलामु अलाइकुम। मैं अपने इलाके की अगली रवाना के लिए अपना समूह दर्ज कराना चाहता/चाहती हूँ।',
  },
}

export function enquiryMessage(locale: Locale, topic: EnquiryTopic = 'general') {
  return topics[locale][topic]
}

/**
 * Keyless Google Maps embed centred on the head-office pin.
 * Built from site.geo — the same coordinates the JSON-LD publishes —
 * so the pin on the page and the pin in search results never drift apart.
 */
export function mapEmbedUrl(zoom = 15) {
  return `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=${zoom}&output=embed`
}
