import { Text } from 'react-native';

import Screen from '../../../components/pages/board/Screen';
import DrawingCanvas from '../../../components/pages/board/Canvas';

export default function Board() {
  return (
    <Screen>
      <Text>HEJ</Text>
      <DrawingCanvas />
    </Screen>
  );
}
