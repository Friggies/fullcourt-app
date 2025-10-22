// app/_layout (global tabs) or app/(tabs)/_layout.tsx
// ⬇️ adjust the import path to your theme hook if needed
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../contexts/theme'; // ← fix path if your file lives deeper

export default function TabLayout() {
  const { theme } = useTheme();

  // simple “is dark” check from your existing palette
  const isDark = theme.colors.text === '#ffffff';

  // brand vs high-contrast accent
  const activeTint = isDark ? '#FFD54F' : '#62241c';

  return (
    <>
      {/* Expo handles the bar style; safe without Info.plist changes */}
      <StatusBar
        style={isDark ? 'light' : 'dark'}
        // helps on Android when not edge-to-edge; harmless otherwise
        backgroundColor={theme.colors.background}
      />

      <Tabs
        screenOptions={{
          headerShown: false,

          // Tab bar adapts to your theme
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
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="basketball"
                size={size ?? 26}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(2-board)"
          options={{
            title: 'Tac Board',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="draw"
                size={size ?? 28}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(3-profile)"
          options={{
            title: 'My Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                size={size ?? 28}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
