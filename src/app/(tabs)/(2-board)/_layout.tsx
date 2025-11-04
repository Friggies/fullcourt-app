import { Stack } from 'expo-router';
import { useTheme } from '../../../contexts/theme';

export default function StackLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.backgroundAccent },
        headerTitleStyle: { color: theme.colors.text },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Tactical Board' }} />
    </Stack>
  );
}
