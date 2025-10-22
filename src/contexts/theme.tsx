import { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from '../styles/themes';

type ThemeMode = 'system' | 'light' | 'dark';

export type ThemeContextType = {
  theme: Theme;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();

  const [mode, setMode] = useState<ThemeMode>('system');

  const effectiveScheme = mode === 'system' ? (systemScheme ?? 'light') : mode;

  const theme: Theme = effectiveScheme === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const next = effectiveScheme === 'dark' ? 'light' : 'dark';
    setMode(next);
  };

  const value = useMemo(
    () => ({ theme, mode, setMode, toggleTheme }),
    [theme, mode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
