import { Image, View, Pressable } from 'react-native';
import { useTheme } from '../../../contexts/theme';
import { makeStyles } from '../../../styles/makeStyles';
import { Text } from '../../common/Text';
import { Drill } from '../../../types/Drill';
import { Link } from 'expo-router';
import { UsersIcon } from 'lucide-react-native';

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
        <View style={styles.cardPlayers}>
          <UsersIcon color={theme.colors.text} size={12} />
          <Text variant="label">
            {drill.players === 1 ? '1 player' : `${drill.players} players`}
          </Text>
        </View>
        <View style={styles.content}>
          <Text>{drill.name}</Text>
          <View style={styles.info}>
            <Text variant="label">
              {(drill.categories ?? []).map((c) => c.name).join(', ')}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
