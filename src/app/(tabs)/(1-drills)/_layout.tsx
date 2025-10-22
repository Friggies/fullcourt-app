// app/(drills)/_layout.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SlidersHorizontalIcon } from 'lucide-react-native';

import { useTheme } from '../../../contexts/theme';
import { makeStyles } from '../../../styles/makeStyles';

type DrillsUIContextType = {
  searchVisible: boolean;
  setSearchVisible: (v: boolean) => void;
  searchText: string;
  setSearchText: (t: string) => void;
  filterCategories: string[];
  setFilterCategories: (cats: string[]) => void;
  filterPlayers: number | '';
  setFilterPlayers: (n: number | '') => void;
  filterType: string;
  setFilterType: (t: string) => void;
};

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
  const styles = makeStyles(theme);
  const router = useRouter();

  // local UI state
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

  // --- Minimal theme → header mapping (uses your existing colors) ---
  const headerBg = theme.colors.backgroundAccent; // light: #fff, dark: #000
  const headerTitle = theme.colors.text; // light: #000, dark: #fff

  // high-contrast tint in dark; your brand tint in light
  const headerTint = theme.colors.text === '#ffffff' ? '#FFD54F' : '#62241c';

  return (
    <DrillsUIContext.Provider value={value}>
      <Stack
        screenOptions={{
          // Let the header/colors follow your theme automatically on re-render
          headerStyle: { backgroundColor: headerBg },
          headerTitleStyle: { color: headerTitle },
          headerTintColor: headerTint, // back button + header icons
          headerShadowVisible: false,

          // Screen background from your theme
          contentStyle: { backgroundColor: theme.colors.background },

          // Keep Android status bar visually aligned with the header
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'All Drills',
            headerLeft: ({ tintColor }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => value.setSearchVisible(!value.searchVisible)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={{ paddingHorizontal: 8 }}
              >
                <MaterialCommunityIcons
                  name={value.searchVisible ? 'close' : 'magnify'}
                  size={24}
                  color={tintColor ?? headerTint}
                />
              </Pressable>
            ),
            headerRight: ({ tintColor }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/filters')}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={{ paddingHorizontal: 8 }}
              >
                <SlidersHorizontalIcon
                  size={24}
                  color={tintColor ?? headerTint}
                />
              </Pressable>
            ),
          }}
        />

        <Stack.Screen
          name="filters"
          options={{ title: 'Filters', presentation: 'modal' }}
        />

        <Stack.Screen
          name="[drillId]"
          options={{ title: 'Drill Details', headerBackVisible: false }}
        />
      </Stack>
    </DrillsUIContext.Provider>
  );
}
