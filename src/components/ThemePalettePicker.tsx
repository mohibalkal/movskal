import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useUserPreferences } from '@/hooks/user-preferences';
import { useTranslation } from 'react-i18next';
import { triggerSuccessHaptic } from '@/utils/haptic-feedback';

type PaletteKey = 'graphite' | 'midnight' | 'emerald' | 'plum';

export default function ThemePalettePicker() {
  const { userPreferences, updatePreferences, applyThemePalette } = useUserPreferences();
  const { t } = useTranslation();
  const [selected, setSelected] = useState<PaletteKey | null>(null);

  // Get current palette with localStorage fallback for immediate display
  const getCurrentPalette = useCallback((): PaletteKey => {
    if (userPreferences?.theme_palette) {
      return userPreferences.theme_palette as PaletteKey;
    }
    // Fallback to localStorage for immediate display
    try {
      const saved = localStorage.getItem('theme-palette');
      return (saved as PaletteKey) || 'graphite';
    } catch {
      return 'graphite';
    }
  }, [userPreferences?.theme_palette]);

  useEffect(() => {
    const current = getCurrentPalette();
    setSelected(current);
  }, [userPreferences?.theme_palette, getCurrentPalette]);

  const handleSelect = async (key: PaletteKey) => {
    triggerSuccessHaptic();
    setSelected(key); // show selection immediately

    // Save to localStorage immediately for persistence
    try {
      localStorage.setItem('theme-palette', key);
    } catch {}

    // تطبيق فوري على كل الصفحات
    applyThemePalette(key);
    
    // حفظ في قاعدة البيانات
    await updatePreferences({ theme_palette: key });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {t('settings.themePalette.title', 'Theme Palette')}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {t('settings.themePalette.description', 'Choose a color scheme for your entire site')}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={(selected ?? userPreferences?.theme_palette) === 'graphite' ? 'default' : 'outline'}
          onClick={() => handleSelect('graphite')}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-800"></div>
          <span className="text-xs font-medium">
            {t('settings.themePalette.graphite', 'Graphite')}
          </span>
        </Button>
        
        <Button
          variant={(selected ?? userPreferences?.theme_palette) === 'midnight' ? 'default' : 'outline'}
          onClick={() => handleSelect('midnight')}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-950"></div>
          <span className="text-xs font-medium">
            {t('settings.themePalette.midnight', 'Midnight')}
          </span>
        </Button>
        
        <Button
          variant={(selected ?? userPreferences?.theme_palette) === 'emerald' ? 'default' : 'outline'}
          onClick={() => handleSelect('emerald')}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-900 to-green-950"></div>
          <span className="text-xs font-medium">
            {t('settings.themePalette.emerald', 'Emerald')}
          </span>
        </Button>
        
        <Button
          variant={(selected ?? userPreferences?.theme_palette) === 'plum' ? 'default' : 'outline'}
          onClick={() => handleSelect('plum')}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-900 to-purple-950"></div>
          <span className="text-xs font-medium">
            {t('settings.themePalette.plum', 'Plum')}
          </span>
        </Button>
      </div>
    </div>
  );
}


