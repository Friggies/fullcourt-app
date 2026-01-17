import { useEffect, useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { useSession } from '../../../contexts/auth';
import { Text } from '../../../components/common/Text';
import { Button } from '../../../components/common/Button';
import { useTheme } from '../../../contexts/theme';

import Purchases from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

const ENTITLEMENT_ID = 'premium';

export default function Profile() {
  const { theme } = useTheme();
  const { session, signIn, signUp, signOut } = useSession();

  const [mode, setMode] = useState<'signIn' | 'signUp'>('signUp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [isPro, setIsPro] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const refreshEntitlements = async () => {
    try {
      const info = await Purchases.getCustomerInfo();
      setIsPro(Boolean(info.entitlements.active[ENTITLEMENT_ID]));
    } catch (e) {
      // Non-fatal; you can choose to surface this if you prefer
      console.warn('Failed to fetch CustomerInfo:', e);
    }
  };

  useEffect(() => {
    if (!session?.user?.id) return;
    refreshEntitlements();
    // re-check whenever user changes
  }, [session?.user?.id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === 'signIn') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        Alert.alert(
          'Sign Up Successful',
          'Check your email to confirm your account.'
        );
      }
    } catch (error: any) {
      Alert.alert('Auth Error', error.message || 'Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openPaywallIfNeeded = async () => {
    setSubLoading(true);
    try {
      const result: PAYWALL_RESULT = await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: ENTITLEMENT_ID,
      });

      // Optional: update local state after the UI flow
      if (
        result === PAYWALL_RESULT.PURCHASED ||
        result === PAYWALL_RESULT.RESTORED
      ) {
        await refreshEntitlements();
      }
    } catch (e: any) {
      Alert.alert(
        'Subscription Error',
        e?.message ?? 'Unable to open paywall.'
      );
    } finally {
      setSubLoading(false);
    }
  };

  const openCustomerCenter = async () => {
    setSubLoading(true);
    try {
      await RevenueCatUI.presentCustomerCenter();
      await refreshEntitlements();
    } catch (e: any) {
      Alert.alert(
        'Subscription Error',
        e?.message ?? 'Unable to open subscription manager.'
      );
    } finally {
      setSubLoading(false);
    }
  };

  if (session) {
    return (
      <View
        style={{
          flex: 1,
          gap: 8,
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: 16,
          marginTop: 16,
        }}
      >
        <Text style={{ marginBottom: 8 }}>{session.user.email}</Text>

        {!isPro && (
          <Button
            text={subLoading ? 'Loading...' : 'Go Premium Now'}
            onPress={openPaywallIfNeeded}
            disabled={subLoading}
          />
        )}

        <Button
          variant="outline"
          text={subLoading ? 'Loading...' : 'Manage Subscription'}
          onPress={openCustomerCenter}
          disabled={subLoading}
        />

        <Button variant="outline" text="Sign Out" onPress={signOut} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 16,
        marginTop: 16,
        gap: 8,
      }}
    >
      <Text variant="hero">
        {mode === 'signIn' ? 'Sign In' : 'Create Profile'}
      </Text>

      <Text style={{ alignSelf: 'flex-start' }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          width: '100%',
          padding: 8,
          borderRadius: 4,
          borderColor: theme.colors.inactive,
          color: theme.colors.text,
        }}
      />

      <Text style={{ alignSelf: 'flex-start' }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          width: '100%',
          padding: 8,
          borderRadius: 4,
          borderColor: theme.colors.inactive,
          color: theme.colors.text,
        }}
      />

      <Button
        text={
          loading
            ? 'Loading...'
            : mode === 'signIn'
              ? 'Sign In'
              : 'Create profile'
        }
        onPress={handleSubmit}
        disabled={loading}
      />
      <Button
        variant="outline"
        text={mode === 'signIn' ? 'Need a profile?' : 'Already have a profile?'}
        onPress={() =>
          setMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'))
        }
      />
    </View>
  );
}
