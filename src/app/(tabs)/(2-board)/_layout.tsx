import { Stack } from 'expo-router';
import { useTheme } from '../../../contexts/theme';

export default function StackLayout() {
  const { theme } = useTheme();
  const headerBg = theme.colors.backgroundAccent;
  const headerTitle = theme.colors.text;
  const headerTint = theme.colors.text === '#ffffff' ? '#F2791C' : '#62241c';

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: headerBg },
        headerTitleStyle: { color: headerTitle },
        headerTintColor: headerTint,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Tactical Board' }} />
    </Stack>
  );
}
