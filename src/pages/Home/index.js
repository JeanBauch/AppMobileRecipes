import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Recipes from '../../component/Recipe';

export default function Home() {
  const navigation = useNavigation();

 return (
   <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.filterContainer}> 

        <TouchableOpacity style={[styles.filterBtn, { marginLeft: 40 }]}>
          <Text style={styles.text}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterBtn, { marginRight: 40 }]}>
          <Text style={styles.text}>Area</Text>
        </TouchableOpacity>

      </View>
    </View>

    <View style={styles.line} />

    <ScrollView style={styles.recipesContainer} showsVerticalScrollIndicator={false}>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Recipes 
          img={require('../../assets/1.jpg')} 
          category="Dessert" area = "American" 
          onClick={ ()=> navigation.navigate('Detail') }
        >
          Penaut Butter Cheesecake
        </Recipes>

        <Recipes 
          img={require('../../assets/2.jpg')} 
          category="Dessert" 
          area = "British" 
          onClick={()=>alert('Clicou')}
        >
          Christmas cake
        </Recipes>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Recipes 
          img={require('../../assets/3.jpg')} 
          category="Dessert" 
          area = "Canadian" onClick={()=>alert('Clicou')} >
          Canadian Butter Tarts
        </Recipes>

        <Recipes 
          img={require('../../assets/4.jpg')} 
          category="Side" 
          area = "French" 
          onClick={()=>alert('Clicou')}
        >
          Brioche
        </Recipes>

      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Recipes 
          img={require('../../assets/5.jpg')} 
          category="Chicken" 
          area = "Japanese" 
          onClick={()=>alert('Clicou')}
        >
          Chicken Karaage
        </Recipes>

        <Recipes 
          img={require('../../assets/6.jpg')} 
          category="Beef" 
          area = "Dutch" 
          onClick={()=>alert('Clicou')}
        >
          Itterballen (Dutch meatballs)
        </Recipes>

      </View>


      
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: '#FFF'
  },
  header:{
    marginBottom: 5
  },
  filterContainer:{
    flexDirection: 'row',
    marginVertical: '3%',
    height: 43,
    justifyContent: 'space-between'
  },
  filterBtn:{
    width: 130,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D8d8d8',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  text:{
    fontFamily: 'Montserrat_300Light',
    fontSize:15,
  },
  line:{
    borderBottomColor: '#D8d8d8',
    borderBottomWidth: 2,
  },
  recipesContainer:{
    marginHorizontal: '3%',
    marginVertical: '5%',
  }
});