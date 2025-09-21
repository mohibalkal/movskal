export type Theme = 'dark' | 'light' | 'system';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem('theme');
  return (stored as Theme) || 'dark';
}

export function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  // Clear inline custom properties set by palette overrides so class-based
  // light/dark variables can take effect immediately without refresh.
  const overriddenKeys = [
    '--background',
    '--foreground',
    '--card',
    '--card-foreground',
    '--popover',
    '--popover-foreground',
    '--muted',
    '--muted-foreground'
  ];
  overriddenKeys.forEach((key) => root.style.removeProperty(key));

  // Force dark for 'system' to avoid accidental light theme per user requirement
  if (theme === 'system') {
    root.classList.add('dark');
  } else {
    root.classList.add(theme);
  }

  localStorage.setItem('theme', theme);
}