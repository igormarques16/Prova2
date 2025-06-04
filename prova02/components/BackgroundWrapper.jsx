import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Images } from './Images';

export default function BackgroundWrapper({ children }) {
  return (
    <ImageBackground
      source={Images.background}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)' // ideal para contraste com texto branco
,

    padding: 10,
  },
});