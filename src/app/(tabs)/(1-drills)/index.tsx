import { Text, TouchableOpacity, View } from 'react-native';
import Screen from '../../../components/pages/drills/Screen';

export default function Drills() {
  return (
    <Screen>
      <TouchableOpacity onPress={() => alert('HEJ')}>
        <Text>Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('HEJ')}>
        <Text>Button</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('HEJ')}>
        <Text>Button</Text>
      </TouchableOpacity>
    </Screen>
  );
}
