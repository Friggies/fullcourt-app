import { Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { Sun, Moon, Monitor } from 'lucide-react-native'; // npm i lucide-react-native
import { useTheme } from '../../../contexts/theme';

export default function StackLayout() {
  const { mode, toggleTheme, theme } = useTheme();

  function ThemeHeaderToggle() {
    const Icon = mode === 'system' ? Monitor : mode === 'light' ? Sun : Moon;

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

  const headerTint = theme.colors.text === '#ffffff' ? '#FFD54F' : '#62241c';

  return (
    <Stack
      screenOptions={{
        // Let the header/colors follow your theme automatically on re-render
        headerStyle: { backgroundColor: headerBg },
        headerTitleStyle: { color: headerTitle },
        headerTintColor: headerTint, // back button + header icons
        headerShadowVisible: false,

        // Screen background from your theme
        contentStyle: { backgroundColor: theme.colors.background },

        // Keep Android status bar visually aligned with the header
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile Page',
          headerLeft: () => <ThemeHeaderToggle />,
        }}
      />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  );
}
