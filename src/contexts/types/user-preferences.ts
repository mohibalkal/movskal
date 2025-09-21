
import { createContext } from 'react';

export interface UserPreferences {
  id?: string;
  user_id: string;
  preferred_source?: string;
  subtitle_language?: string;
  audio_language?: string;
  content_language?: string;
  font_family?: string;
  created_at?: string;
  updated_at?: string;
  isWatchHistoryEnabled: boolean;
  accentColor?: string;
  isNotificationsEnabled: boolean; // Control feature notifications
  display_override?: string;
  theme_palette?: string; // Selected theme palette key
}

export interface UserPreferencesContextType {
  userPreferences: UserPreferences | null;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  isLoading: boolean;
  toggleWatchHistory: () => Promise<void>;
  setAccentColor: (color: string) => void;
  setFontFamily: (font: string) => Promise<void>;
  toggleNotifications: () => Promise<void>; // Toggle feature notifications
  applyThemePalette: (palette: string | undefined) => void;
}

export const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);
