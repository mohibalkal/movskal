import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './en/translation.json';
import arTranslation from './ar/translation.json';
import frTranslation from './fr/translation.json';
import esTranslation from './es/translation.json';
import deTranslation from './de/translation.json';
import hiTranslation from './hi/translation.json';
import trTranslation from './tr/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  ar: {
    translation: arTranslation
  },
  fr: {
    translation: frTranslation
  },
  es: {
    translation: esTranslation
  },
  de: {
    translation: deTranslation
  },
  hi: {
    translation: hiTranslation
  },
  tr: {
    translation: trTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
    },
    
    // Language direction mapping (RTL languages)
    react: {
      useSuspense: false,
    },
  });

// Apply language and direction on initialization
i18n.on('initialized', () => {
  const currentLanguage = i18n.language || 'en';
  const direction = getTextDirection(currentLanguage);
  
  // Apply to document
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', currentLanguage);
  
  // Apply RTL/LTR classes to body
  if (direction === 'rtl') {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }
  
  console.log('i18n initialized with language:', currentLanguage, 'direction:', direction);
});

// Prevent language from being overridden after initialization
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  const direction = getTextDirection(lng);
  
  // Ensure localStorage is updated
  try {
    localStorage.setItem('i18nextLng', lng);
  } catch (error) {
    console.error('Error saving language to localStorage:', error);
  }
  
  // Apply direction and language to document
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', lng);
  
  // Apply RTL/LTR classes to body
  if (direction === 'rtl') {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }
});

// Helper function to get text direction for specific languages
export const getTextDirection = (language: string): 'ltr' | 'rtl' => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
};

export default i18n;
