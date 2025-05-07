import React from 'react';
import { Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../../../components/pages/drills/Screen';
import Card from '../../../components/pages/drills/Card';

export default function Drills() {
  const drill = {
    title: 'Merge Race',
    type: 'Warm-up',
    categories: ['Passing', 'Lorem'],
    players: 3,
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              onPress={() => alert('')}
              style={{
                marginLeft: 8,
              }}
            >
              <MaterialCommunityIcons name="magnify" size={24} color="black" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => alert('')}
              style={{
                marginRight: 8,
              }}
            >
              <MaterialCommunityIcons name="filter" size={24} color="black" />
            </Pressable>
          ),
        }}
      />

      <Screen>
        {[...Array(9)].map((_, i) => (
          <Card key={i} drill={drill} />
        ))}
      </Screen>
    </>
  );
}
