import { useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from '@/hooks';
import { useToast } from '@/components/ui/use-toast';
import { UserPreferencesContext, UserPreferences, UserPreferencesContextType } from './types/user-preferences';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslation } from 'react-i18next';
import { getTextDirection } from '@/locales/i18n';

export { UserPreferencesContext };

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [colorsLoadedFromStorage, setColorsLoadedFromStorage] = useState(false);
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  // Function to map hex color to HSL
  const getHSLFromHex = useCallback((hex: string): string => {
    // Default HSL values for common accent colors
    const colorMap: Record<string, string> = {
      '#E63462': '347 80% 55%',  // Pink
      '#9b87f5': '250 85% 75%',  // Purple
      '#0EA5E9': '199 89% 48%',  // Blue
      '#10B981': '160 84% 39%',  // Green
      '#F59E0B': '38 92% 50%',   // Yellow
      '#F97316': '24 94% 53%',   // Orange
      '#EF4444': '0 84% 60%',    // Red
    };
    
    return colorMap[hex] || '347 80% 55%'; // Default to pink if unknown
  }, []);

  // Apply accent color to CSS variables and update PWA theme
  const applyAccentColor = useCallback((colorHex: string) => {
    // Update CSS variable
    const hsl = getHSLFromHex(colorHex);
    document.documentElement.style.setProperty('--accent', hsl);

    // Update theme-color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', colorHex);
    }

    // Update manifest.json theme-color if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      fetch('/manifest.json')
        .then(response => response.json())
        .then(manifest => {
          manifest.theme_color = colorHex;
          console.log('PWA theme color updated:', colorHex);
        })
        .catch(error => {
          console.error('Error updating manifest theme color:', error);
        });
    }
  }, [getHSLFromHex]);

  // Apply font family globally via CSS variable/class
  const applyFontFamily = useCallback((fontFamily: string) => {
    const root = document.documentElement;
    root.style.setProperty('--app-font-family', fontFamily);
    // Allow body override directly for immediate effect
    document.body.style.fontFamily = fontFamily;
  }, []);

  // Apply language instantly and persist to localStorage
  const applyLanguage = useCallback((language: string) => {
    if (!language) return;
    const langCode = language.split('-')[0];
    i18n.changeLanguage(langCode);
    try { localStorage.setItem('i18nextLng', langCode); } catch {}
    const direction = getTextDirection(langCode);
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', langCode);
    if (direction === 'rtl') {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [i18n]);

  const toggleNotifications = useCallback(async () => {
    if (!user || !userPreferences) return;

    try {
      const updatedPreferences = {
        ...userPreferences,
        isNotificationsEnabled: !userPreferences.isNotificationsEnabled,
        updated_at: new Date().toISOString(),
      };

      const userPreferencesRef = doc(db, 'userPreferences', user.uid);
      await setDoc(userPreferencesRef, updatedPreferences, { merge: true });
      setUserPreferences(updatedPreferences);

      toast({
        title: updatedPreferences.isNotificationsEnabled ? t('toast.notifications.enabled') : t('toast.notifications.disabled'),
        description: updatedPreferences.isNotificationsEnabled 
          ? t('toast.notifications.enabledDescription')
          : t('toast.notifications.disabledDescription'),
        duration: 3000,
      });

    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast({
        title: t('common.error'),
        description: t('toast.preferences.errorSavingDescription'),
        variant: 'destructive',
      });
    }
  }, [user, userPreferences, toast]);

  // Apply theme palette by setting CSS variables batch
  const applyThemePalette = useCallback((palette: string | undefined) => {
    const root = document.documentElement;
    const body = document.body;
    
    type PaletteSpec = {
      vars: Record<string, string>;
      accentHsl: string;
      accentHex: string;
    };
    const palettes: Record<string, PaletteSpec> = {
      graphite: {
        vars: {
          '--background': '240 10% 8%',
          '--foreground': '0 0% 98%',
          '--card': '240 6% 12%',
          '--card-foreground': '0 0% 98%',
          '--popover': '240 8% 12%',
          '--popover-foreground': '0 0% 98%',
          '--muted': '240 4% 20%',
          '--muted-foreground': '240 3% 75%'
        },
        accentHsl: '347 80% 55%',
        accentHex: '#E63462',
      },
      midnight: {
        vars: {
          '--background': '230 18% 12%',
          '--foreground': '210 40% 98%',
          '--card': '230 16% 16%',
          '--card-foreground': '210 40% 98%',
          '--popover': '230 16% 16%',
          '--popover-foreground': '210 40% 98%',
          '--muted': '230 14% 24%',
          '--muted-foreground': '230 10% 75%'
        },
        accentHsl: '199 89% 48%',
        accentHex: '#0EA5E9',
      },
      emerald: {
        vars: {
          '--background': '160 12% 12%',
          '--foreground': '0 0% 98%',
          '--card': '160 12% 16%',
          '--card-foreground': '0 0% 98%',
          '--popover': '160 12% 16%',
          '--popover-foreground': '0 0% 98%',
          '--muted': '160 10% 24%',
          '--muted-foreground': '160 8% 75%'
        },
        accentHsl: '160 84% 39%',
        accentHex: '#10B981',
      },
      plum: {
        vars: {
          '--background': '270 14% 14%',
          '--foreground': '0 0% 98%',
          '--card': '270 14% 18%',
          '--card-foreground': '0 0% 98%',
          '--popover': '270 14% 18%',
          '--popover-foreground': '0 0% 98%',
          '--muted': '270 12% 26%',
          '--muted-foreground': '270 10% 75%'
        },
        accentHsl: '250 85% 75%',
        accentHex: '#9b87f5',
      }
    };
    
    const selected = palettes[palette || 'graphite'];
    if (!selected) return;
    
    // تطبيق متغيرات اللوحة على html و body
    Object.entries(selected.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
      body.style.setProperty(key, value);
    });
    
    // حفظ في localStorage للاستمرارية
    localStorage.setItem('theme-palette', palette || 'graphite');
    
    // إضافة class للـ html لضمان التطبيق
    root.classList.remove('palette-graphite', 'palette-midnight', 'palette-emerald', 'palette-plum');
    root.classList.add(`palette-${palette || 'graphite'}`);
    
    console.log('Theme palette applied:', palette, selected.vars);
  }, []);

  // Load theme palette and accent color from localStorage on app start for all users
  useEffect(() => {
    // Load theme palette from localStorage for immediate display
    const savedPalette = localStorage.getItem('theme-palette');
    if (savedPalette && savedPalette !== 'graphite') {
      applyThemePalette(savedPalette);
    }
    
    // Load accent color from localStorage for immediate display
    const savedAccentColor = localStorage.getItem('accent-color');
    if (savedAccentColor && savedAccentColor !== '#E63462') {
      applyAccentColor(savedAccentColor);
    }
    
    // Mark that colors were loaded from localStorage
    setColorsLoadedFromStorage(true);
  }, [applyThemePalette, applyAccentColor]);

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        setUserPreferences(null);
        setIsLoading(false);
        return;
      }

      try {
        const userPreferencesRef = doc(db, 'userPreferences', user.uid);
        const userPreferencesDoc = await getDoc(userPreferencesRef);

        if (userPreferencesDoc.exists()) {
          const prefs = userPreferencesDoc.data() as UserPreferences;
          setUserPreferences(prefs);
          
          // Apply accent color if it exists and is different from localStorage
          if (prefs.accentColor && !colorsLoadedFromStorage) {
            const savedColor = localStorage.getItem('accent-color');
            if (!savedColor || savedColor !== prefs.accentColor) {
              applyAccentColor(prefs.accentColor);
              try {
                localStorage.setItem('accent-color', prefs.accentColor);
              } catch {}
            }
          }

          // Apply font if it exists
          if (prefs.font_family) {
            applyFontFamily(prefs.font_family);
          }
          // Apply theme palette if exists and is different from localStorage
          if (prefs.theme_palette && !colorsLoadedFromStorage) {
            const savedPalette = localStorage.getItem('theme-palette');
            if (!savedPalette || savedPalette !== prefs.theme_palette) {
              applyThemePalette(prefs.theme_palette);
              try {
                localStorage.setItem('theme-palette', prefs.theme_palette);
              } catch {}
            }
          }
          // Apply language if exists and not already set in localStorage
          if (prefs.content_language) {
            const savedLanguage = localStorage.getItem('i18nextLng');
            if (!savedLanguage || savedLanguage !== prefs.content_language) {
              applyLanguage(prefs.content_language);
            }
          }
        } else {
          // Initialize with default preferences
          const defaultPreferences: UserPreferences = {
            user_id: user.uid,
            isWatchHistoryEnabled: true,
            isNotificationsEnabled: true, // Enable notifications by default
            accentColor: '#E63462', // Default accent color
            content_language: 'en',
            font_family: "'Playfair Display', serif",
            theme_palette: 'graphite',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          try {
            await setDoc(userPreferencesRef, defaultPreferences);
            setUserPreferences(defaultPreferences);
            
            // Apply default accent color
            applyAccentColor(defaultPreferences.accentColor);

            // Apply default font
            applyFontFamily(defaultPreferences.font_family!);
            // Apply default theme palette
            applyThemePalette(defaultPreferences.theme_palette);
            // Apply default language
            applyLanguage(defaultPreferences.content_language!);
          } catch (error) {
            console.error('Error creating default preferences:', error);
            toast({
              title: t('toast.preferences.errorSettingUp'),
              description: t('toast.preferences.errorSettingUpDescription'),
              variant: "destructive"
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user preferences:', error);
        toast({
          title: t('toast.preferences.errorLoading'),
          description: t('toast.preferences.errorLoadingDescription'),
          variant: "destructive"
        });
        // Set default preferences in memory even if save fails
        const fallbackPrefs = {
          user_id: user.uid,
          isWatchHistoryEnabled: true,
          isNotificationsEnabled: true,
          accentColor: '#E63462',
          content_language: 'en',
          font_family: "'Playfair Display', serif",
          theme_palette: 'graphite',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setUserPreferences(fallbackPrefs);
        
        // Apply fallback preferences
        applyAccentColor(fallbackPrefs.accentColor);
        applyFontFamily(fallbackPrefs.font_family!);
        applyThemePalette(fallbackPrefs.theme_palette);
        applyLanguage(fallbackPrefs.content_language!);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, [user, toast, applyAccentColor, applyThemePalette, applyFontFamily, applyLanguage]);

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    if (!user || !userPreferences) return;

    try {
      const userPrefsRef = doc(db, 'userPreferences', user.uid);
      const updatedPreferences = {
        ...userPreferences,
        ...preferences,
        updated_at: new Date().toISOString()
      };

      await setDoc(userPrefsRef, updatedPreferences);
      setUserPreferences(updatedPreferences);

      toast({
        title: t('toast.preferences.updated'),
        description: t('toast.preferences.updatedDescription')
      });

      // Apply side effects immediately for better UX
      if (preferences.accentColor) {
        applyAccentColor(preferences.accentColor);
        // Also save to localStorage for persistence
        try {
          localStorage.setItem('accent-color', preferences.accentColor);
        } catch {}
      }
      if (preferences.font_family) {
        applyFontFamily(preferences.font_family);
      }
      if (preferences.theme_palette) {
        applyThemePalette(preferences.theme_palette);
        // Also save to localStorage for persistence
        try {
          localStorage.setItem('theme-palette', preferences.theme_palette);
        } catch {}
      }
      if (preferences.content_language) {
        applyLanguage(preferences.content_language);
      }
    } catch (error) {
      console.error('Error updating user preferences:', error);
      toast({
        title: t('toast.preferences.errorSaving'),
        description: t('toast.preferences.errorSavingDescription'),
        variant: "destructive"
      });
    }
  };

  const toggleWatchHistory = async () => {
    if (!user || !userPreferences) return;

    try {
      await updatePreferences({
        isWatchHistoryEnabled: !userPreferences.isWatchHistoryEnabled
      });

      toast({
        title: userPreferences.isWatchHistoryEnabled ? t('toast.watchHistory.disabled') : t('toast.watchHistory.enabled'),
        description: userPreferences.isWatchHistoryEnabled 
          ? t('toast.watchHistory.disabledDescription')
          : t('toast.watchHistory.enabledDescription')
      });
    } catch (error) {
      console.error('Error toggling watch history:', error);
    }
  };

  const setAccentColor = (color: string) => {
    if (!user || !userPreferences) return;

    // Save to localStorage immediately for persistence across refreshes
    try {
      localStorage.setItem('accent-color', color);
    } catch {}

    // Apply the color immediately for better UX
    applyAccentColor(color);

    // Update preferences asynchronously
    updatePreferences({
      accentColor: color
    }).then(() => {
      toast({
        title: t('toast.theme.updated'),
        description: t('toast.theme.updatedDescription')
      });
    }).catch((error) => {
      console.error('Error setting accent color:', error);
      toast({
        title: t('toast.theme.errorUpdating'),
        description: t('toast.theme.errorUpdatingDescription'),
        variant: "destructive"
      });
    });
  };

  const setFontFamily = async (font: string) => {
    if (!user || !userPreferences) return;
    try {
      await updatePreferences({
        font_family: font
      });
      applyFontFamily(font);
      toast({
        title: t('toast.font.updated'),
        description: t('toast.font.updatedDescription')
      });
    } catch (error) {
      console.error('Error setting font family:', error);
      toast({
        title: t('toast.font.errorUpdating'),
        description: t('toast.font.errorUpdatingDescription'),
        variant: 'destructive'
      });
    }
  };

  return (
    <UserPreferencesContext.Provider value={{
      userPreferences,
      updatePreferences,
      isLoading,
      toggleWatchHistory,
      setAccentColor,
      setFontFamily,
      toggleNotifications,
      applyThemePalette
    }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
