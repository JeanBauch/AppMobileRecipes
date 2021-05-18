import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

//import loadAnimation from '../../assets/load.json';
import loaderAnimation from '../../assets/loader.json';

export function Load() {
  return(
    <View style={styles.container}>
      {/* <LottieView 
        source={loadAnimation}
        autoPlay
        loop
        style={styles.animation}
      /> */}

      <LottieView 
        source={loaderAnimation}
        autoPlay
        loop
        style={styles.animationLoader}
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
    backgroundColor: 'transparent',
    width: 200,
    height: 200,
  },
  animationLoader: {
    backgroundColor: 'transparent',
    width: 100,
    height: 100,
  }
})