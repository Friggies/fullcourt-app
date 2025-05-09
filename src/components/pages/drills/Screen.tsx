import React from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return (
    <ImageBackground
      source={require('../../../../assets/images/basketball-court-floor.jpg')}
      style={styles.container}
    >
      <View style={styles.column}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  column: {
    flex: 1,
    gap: 8,
  },
});
