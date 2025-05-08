import { Slot, SplashScreen } from 'expo-router';
import { SessionProvider } from '../contexts/auth';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { ThemeProvider } from '../contexts/theme';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loaded, error] = useFonts({
    'Inter-Var': require('../../assets/fonts/Inter-VariableFont.ttf'),
    'Inter-Italic-Var': require('../../assets/fonts/Inter-Italic-VariableFont.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SessionProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
