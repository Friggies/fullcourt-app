import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Stack, Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#62241c',
      }}
    >
      <Tabs.Screen
        name="(1-drills)"
        options={{
          title: 'Playbook',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={26} name="basketball" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(2-board)"
        options={{
          title: 'Tac Board',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="draw" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(3-profile)"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
