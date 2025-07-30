// app/pages/drills/index.tsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Modal,
  Button,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from '../../../components/pages/drills/Screen';
import Card from '../../../components/pages/drills/Card';
import { supabase } from '../../../lib/supabase';
import { Drill } from '../../../types/Drill';
import { useDebounce } from '../../../lib/hooks/debounce';
import { useTheme } from '../../../contexts/theme';
import { makeStyles } from '../../../styles/makeStyles';

export default function Drills() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const PAGE_SIZE = 10;
  const [drills, setDrills] = useState<Drill[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 300);
  const [filters, setFilters] = useState<{ type?: string }>({});
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  const fetchDrills = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;
      setLoading(true);

      const start = reset ? 0 : from;
      const end = start + PAGE_SIZE - 1;

      let query = supabase.from('drills').select('*').range(start, end);

      if (debouncedSearch) {
        query = query.ilike('name', `%${debouncedSearch}%`);
      }
      if (filters.type) {
        query = query.eq('category', filters.type);
      }

      const { data, error } = await query;
      if (!error) {
        setDrills((prev) => (reset ? data! : [...prev, ...data!]));
        setHasMore(data!.length === PAGE_SIZE);
        setFrom(start + data!.length);
      } else {
        console.error(error);
      }
      setLoading(false);
    },
    [debouncedSearch, filters, from, hasMore, loading]
  );

  useEffect(() => {
    setFrom(0);
    setHasMore(true);
    fetchDrills(true);
  }, [debouncedSearch, filters]);

  useEffect(() => {
    setSearchText('');
    if (searchVisible) {
      searchInputRef.current?.focus();
    } else {
      setFrom(0);
      setHasMore(true);
      fetchDrills(true);
    }
  }, [searchVisible]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable onPress={() => setSearchVisible((v) => !v)}>
              {searchVisible ? (
                <MaterialCommunityIcons name="close" size={24} color="black" />
              ) : (
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color="black"
                />
              )}
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              style={{ marginRight: 8 }}
              onPress={() => setShowFilterModal(true)}
            >
              <MaterialCommunityIcons name="filter" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Screen>
        <Modal visible={showFilterModal} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {['Warm-up', 'Offensive', 'Defensive'].map((type) => (
                <Button
                  key={type}
                  title={type}
                  onPress={() => setFilters({ type })}
                />
              ))}
              <View style={styles.modalButtons}>
                <Button title="Clear" onPress={() => setFilters({})} />
                <Button
                  title="Apply"
                  onPress={() => setShowFilterModal(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
        <FlatList
          numColumns={2}
          data={drills}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card drill={item} />}
          onEndReached={() => fetchDrills()}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            searchVisible ? (
              <TextInput
                style={styles.searchInputHeader}
                placeholder="Search drills..."
                value={searchText}
                onChangeText={setSearchText}
                ref={searchInputRef}
                returnKeyType="search"
              />
            ) : (
              <></>
            )
          }
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          style={styles.flatlist}
          contentContainerStyle={{ gap: 8 }}
          columnWrapperStyle={{ gap: '2%' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      </Screen>
    </>
  );
}
