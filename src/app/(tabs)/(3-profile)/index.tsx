import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useSession } from '../../../contexts/auth';

export default function Profile() {
  const { session, signIn, signUp, signOut } = useSession();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signUp');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (session) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome, {session.user.email}!</Text>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    );
  }

  const handleSubmit = () => {
    if (mode === 'signIn') {
      signIn(email, password);
    } else {
      signUp(email, password);
    }
  };

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

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, width: '80%', marginBottom: 12, padding: 8 }}
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        style={{ borderWidth: 1, width: '80%', marginBottom: 12, padding: 8 }}
      />

      <Button
        title={mode === 'signIn' ? 'Sign In' : 'Sign Up'}
        onPress={handleSubmit}
      />
      <Button
        title={mode === 'signIn' ? 'Switch to Sign Up' : 'Switch to Sign In'}
        onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
        color="gray"
      />
    </View>
  );
}
