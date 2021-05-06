import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardBodyLogin from '../../component/CardBodyLogin';
import HeaderLogin from '../../component/HeaderLogin';
import color from '../../styles/color';

export default function Login() {
  return(
    <View style={styles.container}>
      <HeaderLogin />
      <CardBodyLogin />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.background,
  }
})