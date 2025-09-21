import { useTranslation } from 'react-i18next';
import { useUserPreferences } from './user-preferences';
import { getTextDirection } from '@/locales/i18n';
import { useEffect, useCallback } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  const { userPreferences, updatePreferences } = useUserPreferences();

  // Always prefer the active i18n language (which is what the UI actually uses),
  // then fall back to localStorage, then user preference, then default to English.
  const savedLanguage = localStorage.getItem('i18nextLng');
  const currentLanguage = (i18n.language?.split('-')[0]) || savedLanguage || (userPreferences?.content_language || 'en');
  const languageCode = currentLanguage.split('-')[0]; // Extract language code (e.g., 'en' from 'en-US')

  // Update page title based on current page and language
  const updatePageTitle = useCallback(() => {
    const path = window.location.pathname;
    let titleKey = 'navigation.home';
    
    if (path.includes('/movies')) titleKey = 'movies.title';
    else if (path.includes('/tv')) titleKey = 'tvShows.title';
    else if (path.includes('/sports')) titleKey = 'sports.title';
    else if (path.includes('/search')) titleKey = 'search.title';
    else if (path.includes('/profile')) titleKey = 'profile.title';
    else if (path.includes('/settings')) titleKey = 'settings.title';
    else if (path.includes('/login')) titleKey = 'auth.login';
    else if (path.includes('/signup')) titleKey = 'auth.signup';
    else if (path.includes('/watch-history')) titleKey = 'navigation.watchHistory';
    
    const newTitle = t(titleKey);
    if (newTitle !== titleKey) {
      document.title = `${newTitle} - ALKAL`;
    }
  }, [t]);

  // Change language
  const changeLanguage = useCallback((language: string) => {
    try {
      console.log('Changing language to:', language);
      console.log('Current i18n language:', i18n.language);
      
      // Persist to localStorage first to ensure it's saved
      try {
        localStorage.setItem('i18nextLng', language);
        console.log('Language saved to localStorage:', language);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      // Change i18n language immediately
      i18n.changeLanguage(language).then(() => {
        console.log('i18n language changed to:', i18n.language);
        
        // Apply text direction to the entire page for RTL languages
        const direction = getTextDirection(language);
        document.documentElement.setAttribute('dir', direction);
        document.documentElement.setAttribute('lang', language);
        
        // Apply RTL styles to body for Arabic
        if (direction === 'rtl') {
          document.body.classList.add('rtl');
          document.body.classList.remove('ltr');
        } else {
          document.body.classList.add('ltr');
          document.body.classList.remove('rtl');
        }
        
        // Update document title based on current page
        updatePageTitle();
        
        console.log('Language change completed successfully');
      }).catch((error) => {
        console.error('Error changing i18n language:', error);
      });
      
      // Update user preferences asynchronously
      updatePreferences({ content_language: language }).then(() => {
        console.log('User preferences updated');
      }).catch((error) => {
        console.error('Error updating preferences:', error);
      });
      
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, [i18n, updatePreferences, updatePageTitle]);

  // Get text direction for current language
  const textDirection = getTextDirection(languageCode);

  // Apply language-specific styles on mount and language change
  useEffect(() => {
    const direction = getTextDirection(languageCode);
    
    // Set i18n language if it's different from current
    if (i18n.language !== languageCode) {
      i18n.changeLanguage(languageCode);
    }
    
    // Set document direction and language
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', languageCode);
    
    // Apply RTL/LTR classes to body
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
    
    // Update page title
    updatePageTitle();
    
  }, [languageCode, updatePageTitle, i18n]);

  // Prevent user-preferences from overriding saved language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && userPreferences?.content_language && savedLanguage !== userPreferences.content_language) {
      console.log('Preventing user-preferences from overriding saved language:', savedLanguage);
      // Update user preferences to match saved language
      updatePreferences({ content_language: savedLanguage });
    }
  }, [userPreferences?.content_language, updatePreferences]);

  // Remove redundant initialization that could race with detector/Firestore

  // Listen for route changes to update title
  useEffect(() => {
    const handleRouteChange = () => {
      updatePageTitle();
    };

    // Listen for popstate (browser back/forward)
    window.addEventListener('popstate', handleRouteChange);
    
    // Listen for custom route change events
    window.addEventListener('routeChange', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('routeChange', handleRouteChange);
    };
  }, [updatePageTitle]);

  return {
    currentLanguage: languageCode,
    fullLanguage: currentLanguage,
    changeLanguage,
    textDirection,
    t,
    i18n,
    updatePageTitle
  };
};
