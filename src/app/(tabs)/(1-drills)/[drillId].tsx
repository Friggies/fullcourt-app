import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from '../../../components/pages/drills/Screen';
import { supabase } from '../../../lib/supabase';
import { Drill } from '../../../types/Drill';
import { useTheme } from '../../../contexts/theme';
import { Text } from '../../../components/common/Text';
import Markdown from 'react-native-markdown-display';
import Video from '../../../components/pages/drills/Video';

export default function DrillDetail() {
  const { drillId } = useLocalSearchParams();
  const [drill, setDrill] = useState<Drill | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchDrill = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('drills')
      .select('*')
      .eq('id', drillId)
      .single();
    if (error) {
      console.error(error);
    } else {
      setDrill(data);
    }
    setLoading(false);
  }, [drillId]);

  useEffect(() => {
    if (drillId) {
      fetchDrill();
    }
  }, [drillId, fetchDrill]);

  return (
    <>
      <Stack.Screen
        options={{
          title: drill ? drill.name : 'Drill Details',
        }}
      />
      <Screen>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : drill ? (
          <ScrollView>
            <View>
              <Text variant="title">{drill.name}</Text>
              <View>
                <Text>{drill.category}</Text>
                <MaterialCommunityIcons
                  name="account-group"
                  size={16}
                  color={theme.colors.text}
                />
              </View>
              <Video source={drill.link} />
              <Markdown>{drill.description}</Markdown>
            </View>
          </ScrollView>
        ) : (
          <Text>No drill found.</Text>
        )}
      </Screen>
    </>
  );
}
