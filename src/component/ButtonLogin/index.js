import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '../../styles/color';

export default function ButtonLogin( {title, selected} ){
  return(
    <RectButton style={ [styles.container, selected && styles.containerActive] }>
      <Text style={[styles.text, selected && styles.textSelect]}>{title}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 112,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  containerActive: {
    backgroundColor: colors.orangePrimary,
  },
  text: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 12,
    color: colors.orangePrimary,
  },
  textSelect: {
    color: colors.orangeDark3,
  }  
});