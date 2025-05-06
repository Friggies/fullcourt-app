// DrawingCanvas.tsx

import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
type Point = { x: number; y: number };

export default function DrawingCanvas() {
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const currentStroke = useRef<Point[]>([]);

  // Convert a stroke (array of points) to an SVG 'd' string
  const makePath = (points: Point[]) =>
    points.length === 0
      ? ''
      : points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // Use locationX/Y here…
      onPanResponderGrant: (e: GestureResponderEvent) => {
        const { locationX: x, locationY: y } = e.nativeEvent;
        currentStroke.current = [{ x, y }];
        setStrokes((prev) => [...prev, currentStroke.current]);
      },
      // …and *also* locationX/Y here
      onPanResponderMove: (e: GestureResponderEvent) => {
        const { locationX: x, locationY: y } = e.nativeEvent;
        currentStroke.current.push({ x, y });
        setStrokes((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = [...currentStroke.current];
          return copy;
        });
      },
      onPanResponderRelease: () => {
        /* nothing extra needed */
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg width={width} height={height} style={styles.svg}>
        {strokes.map((pts, i) => (
          <Path
            key={i}
            d={makePath(pts)}
            stroke="black"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  svg: {
    backgroundColor: 'transparent',
  },
});
