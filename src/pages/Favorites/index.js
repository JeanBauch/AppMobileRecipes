import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Favorites() {
  return(
    <View style={styles.container}>
      <Text>
        Meus favoritos
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});