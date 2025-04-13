import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      fr: {
        translation: frTranslations
      }
    },
    lng: localStorage.getItem('language') || 'en', // Default language is English
    fallbackLng: 'en', // Fallback to English if translation is missing
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n; 