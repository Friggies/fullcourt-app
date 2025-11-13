import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { Stack } from 'expo-router';
import Card from '../../../components/pages/drills/Card';
import { supabase } from '../../../lib/supabase';
import { useDebounce } from '../../../lib/hooks/debounce';
import { useTheme } from '../../../contexts/theme';
import { makeStyles } from '../../../styles/makeStyles';
import { Text } from '../../../components/common/Text';
import { useDrillsUI } from './_layout';
import { Drill } from '../../../types/Drill';

const TIMEOUT_MS = 12000;

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

const attachAbort = (q: any, signal: AbortSignal) => {
  // postgrest-js supports .abortSignal(); if not present, just return q
  return typeof q.abortSignal === 'function' ? q.abortSignal(signal) : q;
};

export default function Drills() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const {
    searchVisible,
    searchText,
    setSearchText,
    filterCategories,
    filterPlayers,
    filterType,
    filterBookmarked,
    drills,
    setDrills,
  } = useDrillsUI();

  const debouncedSearch = useDebounce(searchText, 300);
  const searchInputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const mounted = useRef(true);
  useEffect(() => {
    console.log('[Drills] mounted');
    return () => {
      mounted.current = false;
      console.log('[Drills] unmounted');
    };
  }, []);

  const fetchDrills = useCallback(async () => {
    console.log('[Drills] fetch start');
    setLoading(true);
    setError(null);
    setTimedOut(false);
    setUsedFallback(false);

    const ac = new AbortController();
    const timeout = setTimeout(() => {
      console.warn('[Drills] fetch timeout after', TIMEOUT_MS, 'ms');
      setTimedOut(true);
      ac.abort();
    }, TIMEOUT_MS);

    try {
      // Full query including categories relation
      let q = supabase
        .from('drills')
        .select(
          `
          id,
          name,
          type,
          premium,
          description,
          link,
          players,
          categories ( name ),
          profiles_drills ( profile_id )
        `
        )
        .order('id', { ascending: true });
      console.log('Drills fetched query:', q);
      const { data, error, status, statusText } = await attachAbort(
        q,
        ac.signal
      );
      if (!mounted.current) {
        console.log('[Drills] fetch response ignored (unmounted)');
        return;
      }

      if (error) {
        console.error('[Drills] fetch error:', describeError(error), {
          status,
          statusText,
        });
        // Fallback: try without the relation to identify join/permissions issues
        console.log(
          '[Drills] attempting fallback query without categories relation'
        );
        setUsedFallback(true);

        const ac2 = new AbortController();
        const timeout2 = setTimeout(() => {
          console.warn('[Drills] fallback timeout after', TIMEOUT_MS, 'ms');
          ac2.abort();
        }, TIMEOUT_MS);

        try {
          const simple = await attachAbort(
            supabase
              .from('drills')
              .select('id, name, type, premium, description, link, players')
              .order('id', { ascending: true }),
            ac2.signal
          );

          if (!mounted.current) return;

          if (simple.error) {
            console.error(
              '[Drills] fallback error:',
              describeError(simple.error),
              {
                status: simple.status,
                statusText: simple.statusText,
              }
            );
            setError(simple.error);
            setDrills([]);
          } else {
            console.log('[Drills] fallback ok', {
              status: simple.status,
              rows: (simple.data ?? []).length,
            });
            setDrills(
              (simple.data ?? []).map((d: any) => ({
                ...d,
                categories: [],
              }))
            );
          }
        } finally {
          clearTimeout(timeout2);
        }
      } else {
        console.log('[Drills] fetch ok', {
          status,
          statusText,
          rows: (data ?? []).length,
          firstId: data?.[0]?.id ?? null,
        });
        setDrills(data);
      }
    } catch (e) {
      if (!mounted.current) return;
      console.error('[Drills] fetch exception:', describeError(e));
      setError(e);
      setDrills([]);
    } finally {
      clearTimeout(timeout);
      if (mounted.current) {
        setLoading(false);
        console.log('[Drills] fetch end');
      }
    }
  }, []);

  useEffect(() => {
    console.log('[Drills] initial load');
    if (drills.length === 0) {
      fetchDrills();
    } else {
      console.log('[Drills] skipping fetch, drills already loaded');
    }
  }, [fetchDrills]);

  useEffect(() => {
    console.log('[Drills] searchVisible ->', searchVisible);
    if (searchVisible) {
      searchInputRef.current?.focus();
      console.log('[Drills] focused search input');
    }
  }, [searchVisible]);

  const filtered = useMemo(() => {
    const search = (debouncedSearch ?? '').trim().toLowerCase();
    console.log('[Drills] applying filters', {
      search,
      filterType,
      filterCategories,
      filterPlayers,
      filterBookmarked,
      total: drills.length,
    });

    const out = drills.filter((d) => {
      const matchesSearch =
        !search || (d.name ?? '').toLowerCase().includes(search.toLowerCase());
      const matchesType = !filterType || d.type === filterType;
      const filterSet = new Set(filterCategories);
      const matchesCategories =
        filterSet.size === 0 ||
        (d.categories ?? []).some((c) => filterSet.has(c.name));
      const matchesPlayers =
        filterPlayers === '' ||
        (typeof filterPlayers === 'number' &&
          (d.players ?? 0) <= filterPlayers);
      const matchesBookmarked =
        !filterBookmarked ||
        (d.profiles_drills != null && d.profiles_drills.length > 0);
      return (
        matchesSearch &&
        matchesType &&
        matchesCategories &&
        matchesPlayers &&
        matchesBookmarked
      );
    });

    console.log('[Drills] filtered results:', out.length);
    return out;
  }, [
    drills,
    debouncedSearch,
    filterType,
    filterCategories,
    filterPlayers,
    filterBookmarked,
  ]);

  return (
    <>
      <Stack.Screen options={{}} />

      {loading && drills.length === 0 ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : error ? (
        <View
          style={{ alignItems: 'center', marginTop: 24, paddingHorizontal: 16 }}
        >
          <Text style={{ textAlign: 'center', marginBottom: 8 }}>
            Failed to load drills.
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 12,
            }}
          >
            {JSON.stringify({
              timeout: timedOut,
              fallback: usedFallback,
              ...describeError(error),
            })}
          </Text>
          <Pressable
            onPress={() => {
              console.log('[Drills] retry pressed');
              fetchDrills();
            }}
            disabled={loading}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderWidth: 1,
              borderRadius: 8,
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Text>{loading ? 'Retrying…' : 'Retry'}</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          numColumns={2}
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Card drill={item as any} />}
          ListHeaderComponent={
            searchVisible ? (
              <TextInput
                style={styles.searchInputHeader}
                placeholder="Search drills..."
                value={searchText}
                onChangeText={(t) => {
                  console.log('[Drills] change search text ->', t);
                  setSearchText(t);
                }}
                ref={searchInputRef}
                returnKeyType="search"
              />
            ) : null
          }
          ListEmptyComponent={
            !loading ? (
              <Text style={{ textAlign: 'center', marginTop: 32 }}>
                No drills found.
              </Text>
            ) : null
          }
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          style={styles.flatlist}
          contentContainerStyle={{ gap: 8, flexGrow: 1 }}
          columnWrapperStyle={{ gap: '2%' }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          refreshing={loading && drills.length > 0}
          onRefresh={() => {
            console.log('[Drills] pull-to-refresh');
            fetchDrills();
          }}
        />
      )}
    </>
  );
}
