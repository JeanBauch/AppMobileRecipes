import AsyncStorage from '@react-native-async-storage/async-storage';


export async function saveFavoriteRecipe(recipe) {
  try{
    const data = await AsyncStorage.getItem('@plantmanager:favrecipes');
    const oldRecipes = data ? (JSON.parse(data)) : {};

    const newRecipe = {
      [recipe.id]: {
        data: recipe,
      }
    }

    await AsyncStorage.setItem('@plantmanager:favrecipes', 
    JSON.stringify({
      ...newRecipe,
      ...oldRecipes
    }))
    console.log("salvou!");

  } catch(error) {
    throw new Error(error);
  }
}

export async function loadRecipe() {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:favrecipes');
    const recipe = data ? (JSON.parse(data)) : {};
    console.log("carregou!");

    const recipes = Object
    .keys(recipe)
    .map((favoriteRecipes) => {
      return {
        ...recipe[favoriteRecipes].data
      }
    });

    return recipes;

  } catch(error) {
    throw new Error(error);
  }
}

export async function removeRecipe(id) {
  console.log("---> Removendo <----");
  const data = await AsyncStorage.getItem('@plantmanager:favrecipes');
  const recipes = data ? (JSON.parse(data)) : {};

  delete recipes[id];

  await AsyncStorage.setItem('@plantmanager:favrecipes', JSON.stringify(recipes));
}