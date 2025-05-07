import React from 'react';
import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type CardProps = {
  drill: {
    title: string;
    type: string;
    categories: string[];
    players: number;
  };
};

export default function Card({ drill }: CardProps) {
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
          <Text key={category} style={styles.category}>
            {category}
          </Text>
        ))}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{drill.title}</Text>
        <View style={styles.info}>
          <Text>{drill.type} drill</Text>
          <Text>
            {`${drill.players} `}
            <MaterialCommunityIcons
              name="account-group"
              size={16}
              color="black"
            />
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  categories: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 4,
    top: 140,
    right: 16,
  },
  category: {
    backgroundColor: 'white',
    paddingBlock: 4,
    paddingInline: 8,
    fontSize: 12,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 50,
  },
  content: {
    padding: 16,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
});
