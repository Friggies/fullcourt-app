import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../contexts/theme';
import { BookIcon, ClipboardPenLineIcon, UserIcon } from 'lucide-react-native';

export default function TabLayout() {
  const { theme } = useTheme();
  const isDark = theme.colors.text === '#ffffff';

  return (
    <>
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        backgroundColor={theme.colors.background}
      />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundAccent,
            borderTopColor: theme.colors.faded,
          },
          tabBarActiveTintColor: '#F2791C',
          tabBarInactiveTintColor: '#808080',
        }}
      >
        <Tabs.Screen
          name="(1-drills)"
          options={{
            title: 'Playbook',
            tabBarIcon: ({ color }) => <BookIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="(2-board)"
          options={{
            title: 'Tac Board',
            tabBarIcon: ({ color }) => <ClipboardPenLineIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="(3-profile)"
          options={{
            title: 'My Profile',
            tabBarIcon: ({ color }) => <UserIcon color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
