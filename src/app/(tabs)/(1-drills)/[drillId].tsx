import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../contexts/theme';
import { Text } from '../../../components/common/Text';
import Markdown from 'react-native-markdown-display';
import Video from '../../../components/pages/drills/Video';

type DrillDetailRow = {
  id: number;
  name: string;
  premium: boolean;
  type: string;
  description: string;
  link: string;
  players: number;
  categories?: { name: string | null }[];
};

const describeError = (err: any) => {
  if (!err) return { info: 'no error object' };
  return {
    name: err.name,
    message: err.message,
    code: err.code,
    details: err.details,
    hint: err.hint,
    status: err.status,
  };
};

export default function DrillDetail() {
  const { drillId } = useLocalSearchParams<{ drillId?: string | string[] }>();
  const id = Array.isArray(drillId) ? drillId[0] : drillId;

  const [drill, setDrill] = useState<DrillDetailRow | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    console.log('[Detail] mounted with id:', id);
    return () => console.log('[Detail] unmounted');
  }, [id]);

  const fetchDrill = useCallback(async () => {
    if (!id) {
      console.warn('[Detail] no drill id provided');
      return;
    }
    console.log('[Detail] fetch start id:', id);
    setLoading(true);
    try {
      const { data, error, status, statusText } = await supabase
        .from('drills')
        .select(
          `
          id,
          name,
          premium,
          type,
          description,
          link,
          players,
          categories ( name )
        `
        )
        .eq('id', id)
        .single();

      if (error) {
        console.error('[Detail] fetch error:', describeError(error), {
          status,
          statusText,
        });
        setDrill(null);
      } else {
        console.log('[Detail] fetch ok', { status, statusText, id: data?.id });
        setDrill(data as DrillDetailRow);
      }
    } catch (e) {
      console.error('[Detail] fetch exception:', describeError(e));
      setDrill(null);
    } finally {
      setLoading(false);
      console.log('[Detail] fetch end id:', id);
    }
  }, [id]);

  useEffect(() => {
    fetchDrill();
  }, [fetchDrill]);

  const categoryList =
    drill?.categories && Array.isArray(drill?.categories)
      ? [...new Set(drill.categories.map((c) => c?.name).filter(Boolean))].join(
          ', '
        )
      : '';

  return (
    <>
      <Stack.Screen options={{ title: drill ? drill.name : 'Drill Details' }} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : drill ? (
        <ScrollView>
          <View style={{ gap: 8 }}>
            <Text variant="label">
              {drill.type}
              {categoryList ? ` • ${categoryList}` : ''}
              {typeof drill.players === 'number'
                ? ` • ${drill.players} players`
                : ''}
              {drill.premium ? ' • Premium' : ''}
            </Text>
            <Markdown>{drill.description}</Markdown>
            <Video link={drill.link} id={drill.id} />
          </View>
        </ScrollView>
      ) : (
        <Text>No drill found.</Text>
      )}
    </>
  );
}
