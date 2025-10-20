import React, { useEffect, useMemo, useState } from 'react';
import { View, Button, Pressable, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '../../../contexts/theme';
import { makeStyles } from '../../../styles/makeStyles';
import { useDrillsUI } from './_layout';
import { supabase } from '../../../lib/supabase';
import { Text } from '../../../components/common/Text';

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

export default function FiltersScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  const {
    filterCategories,
    setFilterCategories,
    filterPlayers,
    setFilterPlayers,
    filterType,
    setFilterType,
  } = useDrillsUI();

  const [loadingCats, setLoadingCats] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    console.log('[Filters] mounted');
    return () => console.log('[Filters] unmounted');
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      console.log('[Filters] categories fetch start');
      setLoadingCats(true);
      setError(null);
      try {
        const { data, error, status, statusText } = await supabase
          .from('drills')
          .select('categories ( name )');

        if (cancelled) {
          console.log('[Filters] categories response ignored (unmounted)');
          return;
        }

        if (error) {
          console.error('[Filters] categories error:', describeError(error), {
            status,
            statusText,
          });
          setError(error);
          setCategoryOptions([]);
        } else {
          const set = new Set<string>();
          (data ?? []).forEach((row: any) => {
            (row?.categories ?? []).forEach((c: any) => {
              if (c?.name) set.add(c.name as string);
            });
          });
          const options = Array.from(set).sort((a, b) => a.localeCompare(b));
          console.log('[Filters] categories ok', {
            status,
            statusText,
            options: options.length,
          });
          setCategoryOptions(options);
        }
      } catch (e) {
        if (!cancelled) {
          console.error('[Filters] categories exception:', describeError(e));
          setError(e);
          setCategoryOptions([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingCats(false);
          console.log('[Filters] categories fetch end');
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleCategory = (name: string) => {
    const next = filterCategories.includes(name)
      ? filterCategories.filter((c) => c !== name)
      : [...filterCategories, name];
    console.log('[Filters] toggle category ->', { name, next });
    setFilterCategories(next);
  };

  const clearFilters = () => {
    console.log('[Filters] clear filters');
    setFilterCategories([]);
    setFilterPlayers('');
    setFilterType('');
  };

  const applyAndClose = () => {
    console.log('[Filters] apply', {
      filterType,
      filterPlayers,
      filterCategories,
    });
    router.back();
  };

  const typeOptions = useMemo(() => ['Drill', 'Play'], []);

  return (
    <>
      <Stack.Screen options={{ title: 'Filters' }} />
      <ScrollView
        contentContainerStyle={[
          styles.modalOverlay,
          { justifyContent: 'center' },
        ]}
      >
        <View style={[styles.modalContent, { gap: 16 }]}>
          {/* Type */}
          <View style={{ gap: 8 }}>
            <Text variant="label">Type</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <Pressable
                onPress={() => {
                  console.log('[Filters] set type -> All');
                  setFilterType('');
                }}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  borderWidth: 1,
                  opacity: filterType === '' ? 1 : 0.7,
                }}
              >
                <Text>All</Text>
              </Pressable>
              {typeOptions.map((t) => (
                <Pressable
                  key={t}
                  onPress={() => {
                    console.log('[Filters] set type ->', t);
                    setFilterType(t);
                  }}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 999,
                    borderWidth: 1,
                    backgroundColor:
                      filterType === t ? '#00000010' : 'transparent',
                  }}
                >
                  <Text>{t}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Players (max) */}
          <View style={{ gap: 8 }}>
            <Text variant="label">Players (max)</Text>
            <TextInput
              placeholder="Any"
              keyboardType="number-pad"
              value={filterPlayers === '' ? '' : String(filterPlayers)}
              onChangeText={(v) => {
                if (v === '') {
                  console.log('[Filters] set players -> Any');
                  return setFilterPlayers('');
                }
                const num = parseInt(v, 10);
                const next = Number.isNaN(num) ? '' : Math.max(1, num);
                console.log('[Filters] set players ->', next);
                setFilterPlayers(next);
              }}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
            />
          </View>

          {/* Categories */}
          <View style={{ gap: 8 }}>
            <Text variant="label">Categories</Text>
            {loadingCats ? (
              <Text>Loading categories…</Text>
            ) : error ? (
              <Text style={{ fontSize: 12, opacity: 0.7 }}>
                {JSON.stringify(describeError(error))}
              </Text>
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {categoryOptions.map((cat) => {
                  const selected = filterCategories.includes(cat);
                  return (
                    <Pressable
                      key={cat}
                      onPress={() => toggleCategory(cat)}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        borderWidth: 1,
                        backgroundColor: selected ? '#00000010' : 'transparent',
                      }}
                    >
                      <Text>{cat}</Text>
                    </Pressable>
                  );
                })}
                {categoryOptions.length === 0 && (
                  <Text style={{ opacity: 0.6 }}>No categories</Text>
                )}
              </View>
            )}
          </View>

          {/* Actions */}
          <View style={styles.modalButtons}>
            <Button title="Clear" onPress={clearFilters} />
            <Button title="Apply" onPress={applyAndClose} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
