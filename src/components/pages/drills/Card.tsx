import { Image, View, Pressable } from 'react-native';
import { useTheme } from '../../../contexts/theme';
import { makeStyles } from '../../../styles/makeStyles';
import { Text } from '../../common/Text';
import { Drill } from '../../../types/Drill';
import { Link } from 'expo-router';

type CardProps = {
  drill: Drill;
};

export default function Card({ drill }: CardProps) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <Link
      style={styles.card}
      href={{
        pathname: '/(tabs)/(1-drills)/[drillId]',
        params: { drillId: drill.id },
      }}
      asChild
    >
      <Pressable>
        <Image
          style={styles.image}
          source={{
            uri: 'https://fullcourt-training.com/thumbnails/3.webp',
          }}
        />
        <View style={styles.content}>
          <Text>{drill.name}</Text>
          <View style={styles.info}>
            <Text variant="label">
              {`${drill.players} ${drill.players === 1 ? 'player' : 'players'}`}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
