import React from 'react';
import { StyleSheet, ImageBackground, ImageStyle, View } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return (
    <ImageBackground
      source={require('../../../../assets/images/basketball-court-tilted.jpg')}
      style={styles.container}
      imageStyle={styles.rotatedImage}
    >
      <View style={styles.column}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4',
  },
  rotatedImage: {
    width: 'auto',
    height: 'auto',
    resizeMode: 'contain',
  } as ImageStyle,
  column: {
    flex: 1,
    gap: 16,
  },
});
