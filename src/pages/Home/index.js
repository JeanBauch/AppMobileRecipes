import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Modalize } from 'react-native-modalize'

import Recipes from '../../component/Recipe';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Dessert',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Side',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Chicken',
  }
]; 

export default function Home() {
  const navigation = useNavigation();

  const modalizeRef = useRef(null);
  const modalizeRefArea = useRef(null);
  const onOpenCategory = () => {
    modalizeRef.current?.open();
  };
  const onOpenArea = () => {
    modalizeRefArea.current?.open();
  };

  const Item = ( {title} ) => {
    return(
      <View style={{ padding: 20, marginVertical: 8, marginHorizontal: 16 }}>
        <Text style={{ fontSize: 24 }}>{title}</Text>
      </View>
    )
  };

  const renderItem = ( { item } ) => (
      <Item title={item.title}/>
  );

 return (
   <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.filterContainer}> 

        <TouchableOpacity style={[styles.filterBtn, { marginLeft: 40 }]} onPress={onOpenCategory}>
          <Text style={styles.text}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterBtn, { marginRight: 40 }]} onPress={onOpenArea}>
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

    <Modalize
      ref={modalizeRef}
      snapPoint={450}
    >
      <Text>Lista de Categoria</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Modalize>

    <Modalize
      ref={modalizeRefArea}
      snapPoint={450}
    >
      <Text>Lista de Area</Text>
    </Modalize>

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