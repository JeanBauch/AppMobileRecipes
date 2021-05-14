import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

export default function CardYouTube({ thumb, link }) {

  async function handleLinkYoutube() {
    const result = await WebBrowser.openBrowserAsync(link);
  }

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.ImageThumb} onPress={handleLinkYoutube}>
        <Image 
          source={{ uri: thumb }}
          resizeMode = "cover"
          blurRadius={5}
          style={styles.image}
        />
        <AntDesign 
          name="youtube"
          size={70}
          color={'#FC0404'}
          style={styles.logo}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Watch on YoTube</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: '4%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: '5%',
  },
  text: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    left: -55
  },
  ImageThumb: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '8%',
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 20,
  },
  logo: {
    position: 'relative',
    left: -110
  }
});