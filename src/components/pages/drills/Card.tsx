// Card.tsx
import React from 'react';
import { Image, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../../contexts/theme';
import { makeStyles } from '../../../styles/makeStyles';
import { Text } from '../../common/Text';

type CardProps = {
  drill: {
    title: string;
    type: string;
    categories: string[];
    players: number;
  };
};

export default function Card({ drill }: CardProps) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <Pressable style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
      <View style={styles.categories}>
        {drill.categories.map((category) => (
          <Text key={category} style={styles.categoryText}>
            {category}
          </Text>
        ))}
      </View>
      <View style={styles.content}>
        <Text variant="title">{drill.title}</Text>
        <View style={styles.info}>
          <Text>{drill.type} drill</Text>
          <Text>
            {`${drill.players} `}
            <MaterialCommunityIcons
              name="account-group"
              size={16}
              color={theme.colors.text}
            />
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
