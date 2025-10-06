import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common.json'
import enChat from './locales/en/chat.json'
import enSidebar from './locales/en/sidebar.json'
import heCommon from './locales/he/common.json'
import heChat from './locales/he/chat.json'
import heSidebar from './locales/he/sidebar.json'

// Translation resources
const resources = {
  en: {
    common: enCommon,
    chat: enChat,
    sidebar: enSidebar,
  },
  he: {
    common: heCommon,
    chat: heChat,
    sidebar: heSidebar,
  },
}

// i18n configuration
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Namespace configuration
    defaultNS: 'common',
    ns: ['common', 'chat', 'sidebar'],
    
    // Interpolation options
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // React options
    react: {
      useSuspense: false,
    },
    
    // Language detection
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
