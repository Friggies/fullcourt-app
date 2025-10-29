import { useEffect, useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Screen from '../../../components/pages/board/Screen';
import Canvas, { CanvasHandle } from '../../../components/pages/board/Canvas';
import { TrashIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react-native';
import { useTheme } from '../../../contexts/theme';

export default function Board() {
  const { theme } = useTheme();
  const headerTint = theme.colors.text === '#ffffff' ? '#F2791C' : '#62241c';

  const canvasRef = useRef<CanvasHandle>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    canvasRef.current?.clear();
  }, [zoomed]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Pressable
              accessibilityRole="button"
              onPress={() => canvasRef.current?.clear()}
              hitSlop={8}
              style={{ paddingHorizontal: 8 }}
            >
              <TrashIcon color={headerTint} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              accessibilityRole="button"
              onPress={() => setZoomed((z) => !z)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{ paddingHorizontal: 8 }}
            >
              {zoomed ? (
                <ZoomOutIcon color={headerTint} />
              ) : (
                <ZoomInIcon color={headerTint} />
              )}
            </Pressable>
          ),
        }}
      />
      <Screen zoomed={zoomed}>
        <Canvas ref={canvasRef} />
      </Screen>
    </>
  );
}
