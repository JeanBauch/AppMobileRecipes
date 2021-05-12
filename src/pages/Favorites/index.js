import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Load } from '../../component/Load';
import Recipes from '../../component/Recipe';
import { useDetail } from '../../hooks/DetailContext';
import { saveFavoriteRecipe, loadRecipe } from '../../libs/storage'
import color from '../../styles/color';

export default function Favorites() {
  const navigation = useNavigation();

  const { newFavorite, isRemoveFavoriteList } = useDetail();
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    async function loadStorageDate() {
      const favoriteRecipes = await loadRecipe();
      setMyRecipes(favoriteRecipes);
      setLoading(false);
    }

    loadStorageDate();
  },[]);

  useEffect(() => {
    loadStorageDate();
  },[isRefresh]);

  useEffect(() => {
    if(newFavorite)
      loadStorageDate();

  },[newFavorite]);

  useEffect(() => {
    if(isRemoveFavoriteList)
      loadStorageDate();

  },[isRemoveFavoriteList]);

  async function loadStorageDate() {
    const favoriteRecipes = await loadRecipe();
    setMyRecipes(favoriteRecipes);
    setLoading(false);
    setIsRefresh(false);
  }

  const handleRefresh = () => {
    setIsRefresh(true);
  }

  if(loading)
    return <Load />

  return(
    <View style={styles.container}>
      <View style={styles.myfavoriteRecipe}>
        <FlatList 
          data={myRecipes}
          keyExtractor={(item) => String(item.id)}
          renderItem={( {item} ) => (
            <View style={{marginHorizontal: 20, marginTop: 15}}>
              <Recipes
                name={item.name}
                img={item.img}
                category={item.cat}
                area={item.area}
                onClick={ () => navigation.navigate('Detail', {id: item.id, name: item.name, img: item.img, cat: item.cat, area: item.area}) }
                key={item.id}
              />
            </View>
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
    width: '100%',
    backgroundColor: color.background,
  },
  myfavoriteRecipe: {
    flex: 1,
    //paddingHorizontal: 10,
    justifyContent: 'center'
  }
});