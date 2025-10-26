import { Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { SunIcon, MoonIcon, SunMoonIcon } from 'lucide-react-native';
import { useTheme } from '../../../contexts/theme';

export default function StackLayout() {
  const { mode, toggleTheme, theme } = useTheme();

  function ThemeHeaderToggle() {
    const Icon =
      mode === 'system' ? SunMoonIcon : mode === 'light' ? SunIcon : MoonIcon;

    return (
      <Pressable
        onPress={() => toggleTheme()}
        hitSlop={10}
        style={{ paddingHorizontal: 12 }}
        accessibilityRole="button"
        accessibilityLabel={`Toggle theme (current: ${mode})`}
      >
        <Icon size={22} color={theme.colors.text} />
      </Pressable>
    );
  }

  const headerBg = theme.colors.backgroundAccent;
  const headerTitle = theme.colors.text;
  const headerTint = theme.colors.text === '#ffffff' ? '#F2791C' : '#62241c';

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: headerBg },
        headerTitleStyle: { color: headerTitle },
        headerTintColor: headerTint, // back button + header icons
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile Page',
          headerRight: () => <ThemeHeaderToggle />,
        }}
      />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
