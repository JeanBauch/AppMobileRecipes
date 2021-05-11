import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Load } from '../../component/Load';
import Recipes from '../../component/Recipe';
import { saveFavoriteRecipe, loadRecipe } from '../../libs/storage'

export default function Favorites() {
  const navigation = useNavigation();

  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    async function loadStorageDate() {
      const favoriteRecipes = await loadRecipe();
      console.log(favoriteRecipes);
      setMyRecipes(favoriteRecipes);
      setLoading(false);
    }

    loadStorageDate();
  },[]);

  useEffect(() => {
    async function loadStorageDate() {
      const favoriteRecipes = await loadRecipe();
      console.log("ta atualizando!");
      setMyRecipes(favoriteRecipes);
      setLoading(false);
      setIsRefresh(false);
    }

    loadStorageDate();
  },[isRefresh]);

  const handleRefresh = () => {
    setIsRefresh(true);
  }

  if(loading)
    return <Load />

  return(
    <View style={styles.container}>
      <Text>
        Meus favoritos: 
      </Text>

      <View style={styles.myfavoriteRecipe}>
        <FlatList 
          data={myRecipes}
          keyExtractor={(item) => String(item.id)}
          renderItem={( {item} ) => (
            <Recipes
              name={item.name}
              img={item.img}
              category={item.cat}
              area={item.area}
              onClick={ () => navigation.navigate('Detail', {id: item.id, name: item.name, img: item.img, cat: item.cat, area: item.area}) }
              key={item.id}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={handleRefresh}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  myfavoriteRecipe: {
    flex: 1,
    //paddingHorizontal: 10,
    justifyContent: 'center'
  }
});