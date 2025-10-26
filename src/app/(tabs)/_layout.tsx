import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../contexts/theme';

export default function TabLayout() {
  const { theme } = useTheme();
  const isDark = theme.colors.text === '#ffffff';
  const activeTint = isDark ? '#F2791C' : '#62241c';

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
          tabBarActiveTintColor: activeTint,
          tabBarInactiveTintColor: theme.colors.faded,
        }}
      >
        <Tabs.Screen
          name="(1-drills)"
          options={{
            title: 'Playbook',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="basketball"
                size={26}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(2-board)"
          options={{
            title: 'Tac Board',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="draw" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(3-profile)"
          options={{
            title: 'My Profile',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={26} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
