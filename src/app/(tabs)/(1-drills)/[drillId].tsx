import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../../../lib/supabase';
import { Drill } from '../../../types/Drill';
import { useTheme } from '../../../contexts/theme';
import { Text } from '../../../components/common/Text';
import Markdown from 'react-native-markdown-display';
import Video from '../../../components/pages/drills/Video';
import { WebView } from 'react-native-webview';

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
      {loading ? (
        <ActivityIndicator size="large" />
      ) : drill ? (
        <ScrollView>
          <View>
            <Video link={drill.link} id={drill.id} />
            <Text variant="label">{drill.category}</Text>
            <Markdown>{drill.description}</Markdown>
          </View>
        </ScrollView>
      ) : (
        <Text>No drill found.</Text>
      )}
    </>
  );
}
