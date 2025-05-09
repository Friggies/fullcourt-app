import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from '../../../components/pages/drills/Screen';
import Card from '../../../components/pages/drills/Card';
import { supabase } from '../../../lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { Text } from '../../../components/common/Text';

type Drill = {
  id: number;
  title: string;
  link: string;
  type: string;
  players: number;
  content: string;
  premium: boolean;
};

export default function Drills() {
  const [drills, setDrills] = useState<Drill[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    const fetchDrills = async () => {
      const { data, error } = await supabase
        .from('drills')
        .select('*')
        .range(0, 9);

      if (error) {
        console.error('Error fetching drills:', error);
        setError(error);
      } else {
        setDrills(data);
      }
    };

    fetchDrills();
  }, []);

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
        {drills.map((drill) => (
          <Card key={drill.id} drill={drill} />
        ))}

        {error && <Text>Error loading drills.</Text>}
      </Screen>
    </>
  );
}
