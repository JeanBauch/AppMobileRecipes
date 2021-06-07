import React from 'react';
import { View, ImageBackground, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDetail } from '../../hooks/DetailContext';

import colors from '../../styles/color';

export default function SwiperSlider() {
  const { handleSelectCategorySlider } = useDetail();

  return(
    <Swiper 
      style={styles.wrapper} 
      showsButtons 
      loop={true} 
      autoplay={true}
      autoplayTimeout={5}
      activeDotColor={colors.orangePrimary} 
      nextButton={(<Text style={styles.nextButton}>›</Text>)}
      prevButton={(<Text style={styles.prevButton}>‹</Text>)}
      
    >
      <View testID="Dessert" style={styles.slide1}>
        <TouchableOpacity onPress={()=>{ handleSelectCategorySlider("Dessert") }}>
          <ImageBackground source={{uri: "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg"}} style={{ flex:1, resizeMode: "cover", justifyContent: "center", alignItems: "center", borderRadius: 20, overflow: "hidden"}}>
            <Image 
              source={require('../../assets/rotulacaoDessert.png')}
              resizeMode="cover"
            />
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View testID="Vegetarian" style={styles.slide2}>
        <TouchableOpacity onPress={()=>{ handleSelectCategorySlider("Vegetarian") }}>
          <ImageBackground source={{uri: "https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg"}} style={{ flex:1, resizeMode: "cover", justifyContent: "center", alignItems: "center", borderRadius: 20, overflow: "hidden"}}>
            <Image 
              source={require('../../assets/rotulacaoVegetarian.png')}
              resizeMode="cover"
            />
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View testID="Pasta" style={styles.slide3}>
        <TouchableOpacity onPress={()=>{ handleSelectCategorySlider("Pasta") }}>
          <ImageBackground source={{uri: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg"}} style={{ flex:1, resizeMode: "cover", justifyContent: "center", alignItems: "center", borderRadius: 20, overflow: "hidden"}}>
            <Image 
              source={require('../../assets/rotulacaoPasta.png')}
              resizeMode="cover"
            />
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </Swiper>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    color: colors.orangePrimary,
    fontSize: 48,
  },
  prevButton: {
    color: colors.orangePrimary,
    fontSize: 48,
  },
})