import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

import imgHeaderTop from '../../assets/3.jpg';
import colors from '../../styles/color';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HeaderLogin() {
  return(
    <View style={styles.container}>
        <LinearGradient 
          colors={[colors.orangePrimary, colors.orangeLight3]}
          style={styles.container}
          start={[0.4, 0.3]}
        />
        <Image 
          source={imgHeaderTop}
          style={styles.image}
          resizeMode='contain'
        />
        <LinearGradient 
          colors={[colors.orangePrimaryRGBA, colors.orangeLight3RGBA, 'transparent']}
          style={styles.container}
          start={[0.4, 0.3]}
        />

        <View style={styles.logoContainer}>
          <Text style={styles.logo}>
            Recipe
          </Text>

          <Entypo
              name="bowl"
              size={32}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 450,
    height: windowHeight > 700 ? 550 : 450,
    borderRadius: 250,
    top: '-14%',
    left: '-5%',

    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ellipseOut: {
    position: 'absolute',
  },
  image: {
    position: 'absolute',
    width: 450,
    height: windowHeight > 700 ? 650 : 450,
    borderRadius: 250,
    top: '-14%',
    left: '-5%',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: '-5%',
    top: windowHeight > 700 ? '-8%': '-10%',
  },
  logo: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 40,
  }
})