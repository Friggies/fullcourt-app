import React, { useEffect, useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from '../../../components/pages/board/Screen';
import Canvas, { CanvasHandle } from '../../../components/pages/board/Canvas';

export default function Board() {
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
              onPress={() => canvasRef.current?.clear()}
              style={{ marginLeft: 8 }}
            >
              <MaterialCommunityIcons
                name="trash-can"
                size={24}
                color="black"
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => setZoomed((z) => !z)}
              style={{ marginRight: 8 }}
            >
              <MaterialCommunityIcons
                name={zoomed ? 'magnify-minus' : 'magnify-plus'}
                size={24}
                color="black"
              />
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
