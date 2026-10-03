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
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
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
