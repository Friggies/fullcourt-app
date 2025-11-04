import { createContext, useContext, useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react-native';

import { useTheme } from '../../../contexts/theme';
import { DrillsUIContextType } from '../../../types/DrillsUIContextType';

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
    }),
    [searchVisible, searchText, filterCategories, filterPlayers, filterType]
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
