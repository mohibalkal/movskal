import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useUserPreferences } from '@/hooks/user-preferences';
import { useTheme } from '@/hooks/use-theme';
import AccentColorPicker from '@/components/AccentColorPicker';
import ThemePalettePicker from '@/components/ThemePalettePicker';
import { useLanguage } from '@/hooks/use-language';

const availableFonts = [
  "'Playfair Display', serif",
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
  "'Roboto', 'Helvetica Neue', Arial, sans-serif",
];

const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'tr', label: 'Türkçe' },
];

export default function Settings() {
  const { userPreferences, updatePreferences, isLoading, setAccentColor, setFontFamily } = useUserPreferences();
  const { theme, setTheme } = useTheme();
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');

  const currentFont = userPreferences?.font_family || availableFonts[0];
  const selectedLanguage = currentLanguage || 'en'; // Ensure we have a default value

  const previewStyle = useMemo(() => ({ fontFamily: currentFont }), [currentFont]);

  useEffect(() => {
    document.title = `${t('settings.title')} - ALKAL`;
  }, [t]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <Navbar />
      <div className="container mx-auto pt-24 px-4">
        <h1 className="text-2xl font-bold mb-4">{t('settings.title')}</h1>
        <p className="text-white/70 mb-6">{t('settings.subtitle')}</p>

        <Tabs defaultValue="appearance" className="mt-4">
          <TabsList className="bg-background border border-white/10">
            <TabsTrigger value="appearance">{t('settings.appearance')}</TabsTrigger>
            <TabsTrigger value="language">{t('settings.language')}</TabsTrigger>
            <TabsTrigger value="typography">{t('settings.typography')}</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass p-6">
                <h2 className="text-xl font-semibold mb-4">{t('settings.theme')}</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setTheme('light')}
                    data-testid="theme-light"
                  >
                    {t('settings.light', 'Light')}
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setTheme('dark')}
                    data-testid="theme-dark"
                  >
                    {t('settings.dark', 'Dark')}
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    onClick={() => setTheme('system')}
                    data-testid="theme-system"
                  >
                    {t('settings.system', 'System')}
                  </Button>
                </div>
              </Card>

              <Card className="glass p-6">
                <AccentColorPicker />
                <div className="h-6" />
                <ThemePalettePicker />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="language" className="pt-4">
            <Card className="glass p-6">
              <h2 className="text-xl font-semibold mb-4">{t('settings.contentLanguage')}</h2>
              <div className="space-y-2">
                <Label htmlFor="content-language">{t('settings.selectLanguage')}</Label>
                <Select value={currentLanguage} onValueChange={(value) => { 
                  console.log('Language selected:', value);
                  console.log('Current language before change:', currentLanguage);
                  changeLanguage(value); 
                }}>
                  <SelectTrigger id="content-language" className="w-full sm:w-[260px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder={t('settings.chooseLanguage')} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {availableLanguages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code} className="text-white focus:text-white focus:bg-white/10">
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-white/60">{t('settings.languageDescription')}</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="typography" className="pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="glass p-6">
                <h2 className="text-xl font-semibold mb-4">{t('settings.fontFamily')}</h2>
                <div className="space-y-2">
                  <Label htmlFor="font-family">{t('settings.chooseFont')}</Label>
                  <Select value={currentFont} onValueChange={(value) => { void setFontFamily(value); }}>
                    <SelectTrigger id="font-family" className="w-full sm:w-[420px] bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder={t('settings.selectFont')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      {availableFonts.map(font => (
                        <SelectItem key={font} value={font} className="text-white focus:text-white focus:bg-white/10">
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="preview">{t('settings.preview')}</Label>
                  <Input id="preview" value={previewText} onChange={(e) => setPreviewText(e.target.value)} />
                  <div className="p-4 rounded-md border border-white/10 bg-white/5" style={previewStyle}>
                    {previewText}
                  </div>
                </div>
              </Card>

              <Card className="glass p-6">
                <h2 className="text-xl font-semibold mb-4">{t('settings.typographyTips')}</h2>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li>{t('settings.tip1')}</li>
                  <li>{t('settings.tip2')}</li>
                  <li>{t('settings.tip3')}</li>
                </ul>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

