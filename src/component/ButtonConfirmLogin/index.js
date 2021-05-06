import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../../styles/color';

export default function ButtonConfirmLogin( {title} ){
  return(
    <RectButton style={ styles.container }>
      <Text style={styles.text}>{title}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 225,
    height: 45,
    borderRadius: 14,
    backgroundColor: colors.orangePrimary,
  },
  text: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 14,
    color: colors.orangeDark3,
  },
});