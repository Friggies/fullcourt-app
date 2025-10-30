import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useSession } from '../../../contexts/auth';
import { Text } from '../../../components/common/Text';

export default function Profile() {
  const { session, signIn, signUp, signOut } = useSession();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signUp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  if (session) {
    return (
      <View
        style={{
          flex: 1,
          gap: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{session.user.email}!</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        {mode === 'signIn' ? 'Sign In' : 'Sign Up'}
      </Text>

      <Text style={{ alignSelf: 'flex-start', marginLeft: '10%' }}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          width: '80%',
          marginBottom: 12,
          padding: 8,
          borderRadius: 4,
        }}
      />

      <Text style={{ alignSelf: 'flex-start', marginLeft: '10%' }}>
        Password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          width: '80%',
          marginBottom: 16,
          padding: 8,
          borderRadius: 4,
        }}
      />

      <Button
        title={
          loading ? 'Loading...' : mode === 'signIn' ? 'Sign In' : 'Sign Up'
        }
        onPress={handleSubmit}
        disabled={loading}
      />

      <View style={{ marginTop: 12 }}>
        <Button
          title={mode === 'signIn' ? 'Switch to Sign Up' : 'Switch to Sign In'}
          onPress={() =>
            setMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'))
          }
          color="gray"
        />
      </View>
    </View>
  );
}
