import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

import { api } from '../../services/api';
import Recipes from '../../component/Recipe';
import { useDetail } from '../../hooks/DetailContext';

const sigla = {
  'American': 'us',
  'British': 'gb',
  'Canadian': 'ca',
  'Chinese': 'cn',
  'Dutch': 'nl',
  'Egyptian': 'eg',
  'French': 'fr',
  'Greek': 'gr',
  'Indian': 'in',
  'Irish': 'ie',
  'Italian': 'it',
  'Jamaican': 'jm',
  'Japanese': 'jp',
  'Kenyan': 'kn',
  'Malaysian': 'my',
  'Mexican': 'mx',
  'Moroccan': 'ma',
  'Polish': 'pl',
  'Portuguese': 'pt',
  'Russian': 'ru',
  'Spanish': 'es',
  'Thai': 'th',
  'Tunisian': 'tn',
  'Turkish': 'tr',
  'Vietnamese': 'vn',

}

export default function Home() {
  const navigation = useNavigation();

  const [category, setCategory] = useState([]);
  const [area, setArea] = useState([]);
  const { detail, changeDetail } = useDetail();
  const [selectCategories, setSelectCategories] = useState([]);

  const modalizeRef = useRef(null);
  const modalizeRefArea = useRef(null);
  const onOpenCategory = () => {
    modalizeRef.current?.open();
  };
  const onOpenArea = () => {
    modalizeRefArea.current?.open();
  };

  useEffect (() => {
    getCategory();
    getArea();
  }, []) 

  const getCategory = async () => {
    const {data} = await api.get("categories.php");
    
    const auxCategory = data.categories.map( (category) => {
      return { 
        id: category.idCategory,
        name: category.strCategory,
        img: category.strCategoryThumb,
      }
    } )
    setCategory(auxCategory);
  }

  const getArea = async () => {
    const { data } = await api.get("list.php?a=list");

    const auxArea = data.meals.map( (area) => {
      let imgUrl = changeSigla(area.strArea)
      return {
        name: area.strArea,
        img: imgUrl
      }
    } )
    setArea(auxArea);
    console.log(auxArea);
  }

  const renderItemCategory = ( { item } ) => (
    <TouchableOpacity 
      style={{...styles.checkContainer, backgroundColor: selectCategories.includes( item.name ) ? '#dcdcdc' : '#FFF'}}
      onPress= { () => {
        const isCategorySelected = selectCategories.includes( item.name );
        if(isCategorySelected) {
          setSelectCategories( [...selectCategories.filter( (cat) =>  cat != item.name) ] )
        } else {
          setSelectCategories( [...selectCategories, item.name] )
        }

      }}
    >
      <View style = {{ flexDirection: 'row' }}>
        <Image
          source= {{uri: item.img}}
          style={styles.imgCheck}
        />

        <Text style= {styles.textCheck}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const buttonConfirmSelect =  () => (
    <TouchableOpacity 
      style={styles.confirmCheck}
      onPress={ ()=> {alert(selectCategories); console.log(selectCategories) } }
    >
      <Text style = { { color: '#FFFFFF', alignSelf: 'center' } }>Ver resultados</Text>
    </TouchableOpacity>
  )

  const changeSigla = (name) => {
    return(`https://www.countryflags.io/${sigla[name]}/shiny/64.png`);
  } 

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

      {/* {recipes.map( (recipe) => ( */}
      {/*key={recipe.id} */}

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}> 
        <Recipes 
          img={require('../../assets/5.jpg')} 
          // category = {recipe.strCategory} 
          category = {"Chicken"}
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
      {/* ) )} */}

    </ScrollView>

    <Modalize
      ref={modalizeRef}
      snapPoint={450}
      handlePosition={"inside"}
      HeaderComponent= {<Text style={styles.titleFilter}>Lista de Categoria</Text>}
      FooterComponent= {buttonConfirmSelect}
      flatListProps={{
        data: category,
        renderItem: renderItemCategory,
        keyExtractor: item => item.id,
        showsVerticalScrollIndicator: false,
      }}
      onOpen={ () => { setSelectCategories([]) } }
    />
    
    <Modalize
      ref={modalizeRefArea}
      snapPoint={450}
      handlePosition={"inside"}
      HeaderComponent= {<Text style={styles.titleFilter}>Lista de Area</Text>}
      FooterComponent= {buttonConfirmSelect}
      flatListProps={{
        data: area,
        renderItem: renderItemCategory,
        keyExtractor: item => item.name,
        showsVerticalScrollIndicator: false,
      }}
      onOpen={ () => { setSelectCategories([]) } }
    />

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
  },
  titleFilter: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
    padding: '5%',
    alignSelf: 'center',
    marginTop:'2%'
  },
  checkContainer: {
    padding: '2%',
    marginLeft: '8%',
    marginRight: '8%',
    borderRadius: 10,
  },
  imgCheck:{
    width: 35, 
    height: 30, 
    marginRight: '8%',
    alignSelf: "center",
    borderRadius: 6
  },
  textCheck: {
    fontFamily: 'Montserrat_400Regular',
    fontSize:15,
    alignSelf: "center"
  },
  confirmCheck: {
    marginTop: '4%',
    marginBottom: '4%',
    width: 250,
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: '#EA1D2C'
  }
});