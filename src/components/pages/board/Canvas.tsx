import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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
export type CanvasHandle = {
  clear: () => void;
};

const Canvas = forwardRef<CanvasHandle>((props, ref) => {
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const currentStroke = useRef<Point[]>([]);

  useImperativeHandle(ref, () => ({
    clear: () => setStrokes([]),
  }));

  const makePath = (points: Point[]) =>
    points.length === 0
      ? ''
      : points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent) => {
        const { locationX: x, locationY: y } = e.nativeEvent;
        currentStroke.current = [{ x, y }];
        setStrokes((prev) => [...prev, currentStroke.current]);
      },
      onPanResponderMove: (e: GestureResponderEvent) => {
        const { locationX: x, locationY: y } = e.nativeEvent;
        currentStroke.current.push({ x, y });
        setStrokes((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = [...currentStroke.current];
          return copy;
        });
      },
      onPanResponderRelease: () => {},
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
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </Svg>
    </View>
  );
});

export default Canvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  svg: {
    backgroundColor: 'transparent',
  },
});
