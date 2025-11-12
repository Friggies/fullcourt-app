import { createContext, useContext, useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react-native';

import { useTheme } from '../../../contexts/theme';
import { DrillsUIContextType } from '../../../types/DrillsUIContextType';
import { Drill } from '../../../types/Drill';
import { supabase } from '../../../lib/supabase';

const DrillsUIContext = createContext<DrillsUIContextType | undefined>(
  undefined
);
export const useDrillsUI = () => {
  const ctx = useContext(DrillsUIContext);
  if (!ctx) throw new Error('useDrillsUI must be used within drills/_layout');
  return ctx;
};

export default function DrillsLayout() {
  const { theme } = useTheme();
  const router = useRouter();

  const [searchVisible, _setSearchVisible] = useState(false);
  const [searchText, _setSearchText] = useState('');
  const [filterCategories, _setFilterCategories] = useState<string[]>([]);
  const [filterPlayers, _setFilterPlayers] = useState<number | ''>('');
  const [filterType, _setFilterType] = useState<string>('');
  const [drills, setDrills] = useState<Drill[]>([]);

  const toggleBookmark = async (
    drill: Drill,
    localSetDrill?: React.Dispatch<React.SetStateAction<Drill | null>>
  ) => {
    const session = await supabase.auth.getSession();
    const profileId = session.data.session?.user.id;
    if (!profileId) return;

    const isBookmarked = drill.profiles_drills.length > 0;

    if (isBookmarked) {
      // Remove bookmark
      await supabase
        .from('profiles_drills')
        .delete()
        .eq('drill_id', drill.id)
        .eq('profile_id', profileId);

      const updatedDrill = { ...drill, profiles_drills: [] };

      // Update global state
      setDrills((prev) =>
        prev.map((d) => (d.id === drill.id ? updatedDrill : d))
      );

      // Update local state (details page)
      if (localSetDrill) localSetDrill(updatedDrill);
    } else {
      // Add bookmark
      const { data } = await supabase
        .from('profiles_drills')
        .insert({
          drill_id: drill.id,
          profile_id: profileId,
        })
        .select();

      const updatedDrill = {
        ...drill,
        profiles_drills: data ?? [{ profile_id: profileId }],
      };

      setDrills((prev) =>
        prev.map((d) => (d.id === drill.id ? updatedDrill : d))
      );

      if (localSetDrill) localSetDrill(updatedDrill);
    }
  };

  const setSearchVisible = (v: boolean) => {
    _setSearchVisible(v);
    if (v) _setSearchText('');
  };

  const value = useMemo<DrillsUIContextType>(
    () => ({
      searchVisible,
      setSearchVisible,
      searchText,
      setSearchText: _setSearchText,
      filterCategories,
      setFilterCategories: _setFilterCategories,
      filterPlayers,
      setFilterPlayers: _setFilterPlayers,
      filterType,
      setFilterType: _setFilterType,
      drills,
      setDrills,
      toggleBookmark,
    }),
    [
      searchVisible,
      searchText,
      filterCategories,
      filterPlayers,
      filterType,
      drills,
    ]
  );

  return (
    <DrillsUIContext.Provider value={value}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.backgroundAccent },
          headerTitleStyle: { color: theme.colors.text },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'All Drills & Plays',
            headerLeft: ({ tintColor }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => value.setSearchVisible(!value.searchVisible)}
                hitSlop={8}
                style={{ paddingHorizontal: 8 }}
              >
                {value.searchVisible ? (
                  <XIcon color={tintColor} />
                ) : (
                  <SearchIcon color={tintColor} />
                )}
              </Pressable>
            ),
            headerRight: ({ tintColor }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/filters')}
                hitSlop={8}
                style={{ paddingHorizontal: 8 }}
              >
                <SlidersHorizontalIcon size={24} color={tintColor} />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen
          name="filters"
          options={{ title: 'Filters', presentation: 'modal' }}
        />

        <Stack.Screen name="[drillId]" options={{ title: 'Drill Details' }} />
      </Stack>
    </DrillsUIContext.Provider>
  );
}
