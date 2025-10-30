import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../contexts/theme';
import { Text } from '../../../components/common/Text';
import Markdown from 'react-native-markdown-display';
import Video from '../../../components/pages/drills/Video';
import { Drill } from '../../../types/Drill';
import { BookmarkIcon, SaveIcon } from 'lucide-react-native';

export default function DrillDetail() {
  const { drillId } = useLocalSearchParams<{ drillId?: string | string[] }>();
  const id = Array.isArray(drillId) ? drillId[0] : drillId;

  const [drill, setDrill] = useState<Drill | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const fetchDrill = useCallback(async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
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
        setDrill(null);
      } else {
        setDrill(data as Drill);
      }
    } catch (e) {
      setDrill(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDrill();
  }, [fetchDrill]);

  return (
    <>
      <Stack.Screen options={{ title: drill ? drill.name : 'Drill Details' }} />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : drill ? (
        <ScrollView>
          <View style={{ gap: 8, margin: 16 }}>
            <Video link={drill.link} id={drill.id} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginTop: 8,
              }}
            >
              <View
                style={{
                  gap: 4,
                }}
              >
                <Text>
                  {drill.premium
                    ? `Premium ${drill.type.toLowerCase()}`
                    : `${drill.type}`}
                  {drill.players === 1
                    ? ' for 1 player'
                    : ` for ${drill.players} players`}
                </Text>
                <View style={{ flexDirection: 'row', gap: 2 }}>
                  {drill.categories.map((c) => (
                    <Text
                      variant="label"
                      key={c.name}
                      style={{
                        backgroundColor: theme.colors.backgroundAccent,
                        borderRadius: 2,
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                      }}
                    >
                      {c.name}
                    </Text>
                  ))}
                </View>
              </View>
              <TouchableOpacity>
                <BookmarkIcon />
              </TouchableOpacity>
            </View>
            <Markdown
              style={{
                body: { color: theme.colors.text },
              }}
            >
              {drill.description}
            </Markdown>
          </View>
        </ScrollView>
      ) : (
        <Text>No drill found.</Text>
      )}
    </>
  );
}
