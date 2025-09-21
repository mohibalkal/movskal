
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { triggerHapticFeedback, triggerSuccessHaptic } from '@/utils/haptic-feedback';
import { CircleDot, Circle } from 'lucide-react';
import { useUserPreferences } from '@/hooks/user-preferences';
import { Button } from './ui/button';

interface AccentColorOption {
  name: string;
  value: string;
  hsl: string;
}

export default function AccentColorPicker() {
  const { userPreferences, setAccentColor } = useUserPreferences();
  const { t } = useTranslation();
  
  // Get current color with localStorage fallback for immediate display
  const getCurrentColor = useCallback(() => {
    if (userPreferences?.accentColor) {
      return userPreferences.accentColor;
    }
    // Fallback to localStorage for immediate display
    try {
      const saved = localStorage.getItem('accent-color');
      return saved || '#E63462';
    } catch {
      return '#E63462';
    }
  }, [userPreferences?.accentColor]);
  
  const currentColor = getCurrentColor();

  // Predefined accent colors with HSL values
  const accentColors: AccentColorOption[] = [
    { name: 'Pink', value: '#E63462', hsl: '347 80% 55%' },
    { name: 'Purple', value: '#9b87f5', hsl: '250 85% 75%' },
    { name: 'Blue', value: '#0EA5E9', hsl: '199 89% 48%' },
    { name: 'Green', value: '#10B981', hsl: '160 84% 39%' },
    { name: 'Yellow', value: '#F59E0B', hsl: '38 92% 50%' },
    { name: 'Orange', value: '#F97316', hsl: '24 94% 53%' },
    { name: 'Red', value: '#EF4444', hsl: '0 84% 60%' },
  ];

  // Apply the selected accent color
  const applyAccentColor = (color: AccentColorOption) => {
    // Provide haptic feedback when changing accent color
    triggerSuccessHaptic();
    
    // Save to localStorage immediately for persistence
    try {
      localStorage.setItem('accent-color', color.value);
    } catch {}
    
    // Update CSS variable
    document.documentElement.style.setProperty('--accent', color.hsl);
    
    // Save to preferences
    setAccentColor(color.value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">{t('settings.accentColor', 'Accent Color')}</h3>
      <div className="flex flex-wrap gap-3">
        {accentColors.map((color) => (
          <Button
            key={color.value}
            type="button"
            variant="outline"
            className="rounded-full w-10 h-10 p-0 border-2"
            style={{ 
              backgroundColor: color.value,
              borderColor: currentColor === color.value ? 'white' : 'transparent'
            }}
            onClick={() => applyAccentColor(color)}
            title={color.name}
          >
            {currentColor === color.value && (
              <CircleDot className="h-6 w-6 text-white drop-shadow-md" />
            )}
          </Button>
        ))}
      </div>
      <div className="mt-2 text-sm text-white/70">
        {t('settings.accentColorDescription', 'Choose an accent color to personalize your experience')}
      </div>
    </div>
  );
}
