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
        hitSlop={8}
        style={{ paddingHorizontal: 8 }}
        accessibilityRole="button"
        accessibilityLabel={`Toggle theme (current: ${mode})`}
      >
        <Icon color={theme.colors.text} />
      </Pressable>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.backgroundAccent },
        headerTitleStyle: { color: theme.colors.text },
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
    </Stack>
  );
}
