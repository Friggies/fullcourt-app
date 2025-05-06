import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8C3428',
        //tabBarStyle: { backgroundColor: '#C1763D' },
      }}
    >
      <Tabs.Screen
        name="(1-drills)"
        options={{
          title: 'Drills',
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
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
