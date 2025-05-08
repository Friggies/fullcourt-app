import { Slot, SplashScreen } from 'expo-router';
import { SessionProvider } from '../contexts/auth';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { ThemeProvider } from '../contexts/theme';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loaded, error] = useFonts({
    Inter: require('../../assets/fonts/inter-400.ttf'),
    InterItalic: require('../../assets/fonts/inter-400-italic.ttf'),
    Inter300: require('../../assets/fonts/inter-300.ttf'),
    Inter600: require('../../assets/fonts/inter-600.ttf'),
    Inter800: require('../../assets/fonts/inter-800.ttf'),
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
