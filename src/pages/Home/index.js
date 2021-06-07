import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';

import { api } from '../../services/api';
import Recipes from '../../component/Recipe';
import { useDetail } from '../../hooks/DetailContext';
import color from '../../styles/color';
import { Load } from '../../component/Load';
import SwiperSlider from '../../component/SwiperSlider';

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

  const { detail, getDestaques, loaded, selectCategorySlider, handleSelectCategorySlider, reload, setReload } = useDetail();
  const [category, setCategory] = useState([]);
  const [area, setArea] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);
  const [propsRecipe, setpropsRecipe] = useState([]);
  const [pressSelectFilter, setPressSelectFilter] = useState(false);
  const [prosRecipeSelected, setProsRecipeSelected] = useState([]);
  //const [reload, setReload] = useState(false);
  const [siglaFilterName, setSiglaFilterName] = useState("");
  const [isReload, setIsReload] = useState(false);

  const modalizeRefCategory = useRef(null);
  const modalizeRefArea = useRef(null);

  const onOpenCategory = () => {
    modalizeRefCategory.current?.open();
  };

  const onCloseModal = () => {
    modalizeRefCategory.current?.close();
    modalizeRefArea.current?.close();
  };

  const onOpenArea = () => {
    modalizeRefArea.current?.open();
  };
  

  useEffect (() => {
    getCategory();
    getArea();
    getDestaques();
  }, []) 

  useEffect (() => {
    if(!loaded)
      return 

    getProps();
  }, [loaded])

  useEffect (() => {
    if(!pressSelectFilter)
      return
    getSelectFilter();
  }, [pressSelectFilter, reload]) 

  useEffect(()=> {
    if(selectCategorySlider){
      setSelectCategories([ ...selectCategories,selectCategorySlider]);
      setSiglaFilterName("c");
      setPressSelectFilter(true);
      setReload(true);
      setIsReload(false);
      handleSelectCategorySlider("");
    }
  },[selectCategorySlider]);

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
  }

  const getSelectFilter = async () => {
    const filterIDAux = [];
    
    const response = selectCategories.map( async (selectFilter)  => {
        const { data } = await api.get(`filter.php?${siglaFilterName}=${selectFilter}`); 
        filterIDAux.push( data.meals ); 
    })
    Promise.all(response).then( () => {
      const filterDetailAux = [];
      
      const responseObj = filterIDAux.map( async (selected)  => {
      const responseD = selected.map( async (d) => {
        const { data } = await api.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${d.idMeal}`);
          filterDetailAux.push( data.meals[0] );
        } )
        return Promise.all(responseD);
      })
      Promise.all(responseObj).then( () => {
        setProsRecipeSelected(filterDetailAux);
        setIsReload(true);
      } )
    } )
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
      onPress={ ()=> {
        setPressSelectFilter(true); 
        setReload(true);  
        onCloseModal('default');
        setIsReload(false);
      } }
    >
      <Text style = { { color: '#FFFFFF', alignSelf: 'center' } }>Ver resultados</Text>
    </TouchableOpacity>
  )

  const changeSigla = (name) => {
    return(`https://www.countryflags.io/${sigla[name]}/shiny/64.png`);
  } 

  const getProps = () => {
    if(detail.length === 0)
      return
    
    const parts = detail.map( (d) => {
      return {
        id: d.meals[0].idMeal,
        name: d.meals[0].strMeal,
        category: d.meals[0].strCategory,
        area: d.meals[0].strArea,
        img: d.meals[0].strMealThumb,
        link: d.meals[0].strYoutube
      }  
    } )
    setpropsRecipe(parts);
    //console.log(parts);
  }

  if(!loaded)
    return <Load />

  return (
   <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.filterContainer}> 

        <TouchableOpacity style={[styles.filterBtn, { marginLeft: 30 }]} onPress={onOpenCategory}>
          <Text style={styles.text}>Categoria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.filterBtn, { marginRight: 30 }]} onPress={onOpenArea}>
          <Text style={styles.text}>País</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.line} />

    {!reload ? (
      <ScrollView style={styles.recipesContainer} showsVerticalScrollIndicator={false}>
        
        <View style={{ width: '100%', height: 200, marginBottom: '5%'}}>
          <SwiperSlider />
        </View>

        <View style={{flex: 1, marginHorizontal: '3%', marginBottom: '3%'}}>
          <Text style={styles.subTitle}>Destaques</Text>
        </View>

        <View style={styles.scrollContainer}>
        {
          propsRecipe.map( (pr) => (
              <Recipes
                name={pr.name}
                img={pr.img}
                category={pr.category}
                area={pr.area}
                onClick={ () => navigation.navigate('Detail', {id: pr.id, name: pr.name, img: pr.img, cat: pr.category, area: pr.area, link: pr.link}) }
                key={pr.id}
              />
          ))
        }
      </View>

    </ScrollView>
    ) : isReload ? (
      <ScrollView style={styles.recipesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContainer}>
          {
            prosRecipeSelected.map( (pr, index) => (
              <Recipes
                name={pr.strMeal}
                img={pr.strMealThumb}
                category={pr.strCategory}
                area={pr.strArea}
                onClick={ () => navigation.navigate('Detail', {id: pr.idMeal, name: pr.strMeal, img: pr.strMealThumb, cat: pr.strCategory, area: pr.strArea, link: pr.strYoutube}) }
                key={pr.idMeal}
              />
            ))
          }
        </View>
      </ScrollView>
    ) : (
      <Load />
    )}
    

    <Modalize
      ref={modalizeRefCategory}
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
      onOpen={ () => { setSelectCategories([]); setReload(false); setSiglaFilterName("c"); } }
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
      onOpen={ () => { setSelectCategories([]); setReload(false); setSiglaFilterName("a"); } }
    />

  </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: color.background,
  },
  header:{
    marginBottom: 5,
  },
  scrollContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: '10%',
  },
  filterContainer:{
    flexDirection: 'row',
    marginVertical: '3%',
    height: 43,
    justifyContent: 'space-between',
  },
  filterBtn:{
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    //borderColor: '#D8d8d8',
    borderColor: color.orangeDark3,
    //backgroundColor: color.orangeLight2,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  text:{
    fontFamily: 'Montserrat_500Medium',
    fontSize:15,
    color: color.orangeDark3,
  },
  line:{
    //borderBottomColor: '#D8d8d8',
    borderBottomColor: color.lineStyle,
    borderBottomWidth: 2,
  },
  subTitle: {
    fontFamily: 'Montserrat_500Medium',
    fontSize:24,
    color: color.orangeDark3,
  },
  recipesContainer:{
    flex: 1,
    marginHorizontal: '3%',
    //marginVertical: '5%'
    paddingTop: '5%'
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
    //backgroundColor: '#EA1D2C'
    backgroundColor: color.orangePrimary,
  }
});