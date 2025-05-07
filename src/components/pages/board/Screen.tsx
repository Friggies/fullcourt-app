import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

type ScreenProps = {
  children: React.ReactNode;
  zoomed?: boolean;
};

export default function Screen({ children, zoomed = false }: ScreenProps) {
  const source = zoomed
    ? require('../../../../assets/images/basketball-half-court-916.jpg')
    : require('../../../../assets/images/basketball-court-tilted.jpg');

  return (
    <ImageBackground
      source={source}
      style={styles.container}
      imageStyle={styles.rotatedImage}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rotatedImage: {
    resizeMode: 'stretch',
  },
});
