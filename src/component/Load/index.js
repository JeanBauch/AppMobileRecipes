import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../../assets/load.json';

export function Load() {
  return(
    <View style={styles.container}>
      <LottieView 
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  animation: {
    flex: 1,
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  }
})