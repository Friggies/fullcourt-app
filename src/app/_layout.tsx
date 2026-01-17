import { Slot, SplashScreen } from 'expo-router';
import { SessionProvider, useSession } from '../contexts/auth';
import { useFonts } from 'expo-font';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from '../contexts/theme';

import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

SplashScreen.preventAutoHideAsync();

function RevenueCatSync() {
  const { session } = useSession();
  const configured = useRef(false);

  // Track whether we've ever logged in to a known (non-anon) user
  const lastKnownUserId = useRef<string | null>(null);

  useEffect(() => {
    if (configured.current) return;

    Purchases.setLogLevel(LOG_LEVEL.INFO);

    const apiKey =
      Platform.OS === 'ios'
        ? 'appl_rrUGtecCbBhMEidywhwuRjzgXil'
        : 'goog_PzveQLrMfSQvzxRfGEjcCkzevGm';

    Purchases.configure({ apiKey });
    configured.current = true;
  }, []);

  useEffect(() => {
    if (!configured.current) return;

    const appUserID = session?.user?.id ?? null;

    (async () => {
      try {
        if (appUserID) {
          // Log into your Supabase user id (switching users is fine)
          if (lastKnownUserId.current !== appUserID) {
            await Purchases.logIn(appUserID);
            await Purchases.invalidateCustomerInfoCache();
          }
          lastKnownUserId.current = appUserID;
        } else {
          // Only log out if we had previously logged in
          if (lastKnownUserId.current) {
            await Purchases.logOut();
            lastKnownUserId.current = null;
          }
          // else: already anonymous → do nothing
        }
      } catch (e) {
        console.warn('RevenueCat identity sync failed:', e);
      }
    })();
  }, [session?.user?.id]);

  return null;
}

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
        {/*<RevenueCatSync */}
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
