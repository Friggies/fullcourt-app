import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
  filterType: string; // '' | 'Drill' | 'Play'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const styles = makeStyles(theme);
  const router = useRouter();

  const [searchVisible, _setSearchVisible] = useState(false);
  const [searchText, _setSearchText] = useState('');

  const [filterCategories, _setFilterCategories] = useState<string[]>([]);
  const [filterPlayers, _setFilterPlayers] = useState<number | ''>('');
  const [filterType, _setFilterType] = useState<string>('');

  useEffect(() => {
    console.log('[Layout] mounted');
    return () => console.log('[Layout] unmounted');
  }, []);

  const setSearchVisible = (v: boolean) => {
    console.log('[Layout] setSearchVisible ->', v);
    _setSearchVisible(v);
    if (v) {
      console.log('[Layout] clearing search text (opening search)');
      _setSearchText('');
    }
  };
  const setSearchText = (t: string) => {
    console.log('[Layout] setSearchText ->', t);
    _setSearchText(t);
  };

  const setFilterCategories = (cats: string[]) => {
    console.log('[Layout] setFilterCategories ->', cats);
    _setFilterCategories(cats);
  };
  const setFilterPlayers = (n: number | '') => {
    console.log('[Layout] setFilterPlayers ->', n);
    _setFilterPlayers(n);
  };
  const setFilterType = (t: string) => {
    console.log('[Layout] setFilterType ->', t);
    _setFilterType(t);
  };

  const value = useMemo<DrillsUIContextType>(
    () => ({
      searchVisible,
      setSearchVisible,
      searchText,
      setSearchText,
      filterCategories,
      setFilterCategories,
      filterPlayers,
      setFilterPlayers,
      filterType,
      setFilterType,
    }),
    [searchVisible, searchText, filterCategories, filterPlayers, filterType]
  );

  const HeaderLeft = () => (
    <Pressable
      accessibilityRole="button"
      onPress={() => value.setSearchVisible(!value.searchVisible)}
      style={{ paddingHorizontal: 8 }}
    >
      <MaterialCommunityIcons
        name={value.searchVisible ? 'close' : 'magnify'}
        size={24}
        color="black"
      />
    </Pressable>
  );

  const HeaderRight = () => (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        router.push('/filters');
      }}
      style={{ paddingHorizontal: 8 }}
    >
      <MaterialCommunityIcons name="filter" size={24} color="black" />
    </Pressable>
  );

  return (
    <DrillsUIContext.Provider value={value}>
      <Stack
        screenOptions={{
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'All Drills' }} />
        <Stack.Screen
          name="filters"
          options={{ title: 'Filters', presentation: 'modal' }}
        />
        <Stack.Screen
          name="[drillId]"
          options={{
            title: 'Drill Details',
            headerLeft: () => null,
            headerRight: () => null,
          }}
        />
      </Stack>
    </DrillsUIContext.Provider>
  );
}
