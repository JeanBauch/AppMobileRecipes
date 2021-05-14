import AsyncStorage from '@react-native-async-storage/async-storage';
import { recipeDataBase } from '../config/firebase';
import * as Notifications from 'expo-notifications';
import { differenceInSeconds } from 'date-fns';

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
    }));

    const dbFavRef = recipeDataBase.collection("favorites").doc("listFavorites");
    dbFavRef.update({
      favorites: JSON.stringify({...newRecipe, ...oldRecipes})
    });
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

  const dbFavRef = recipeDataBase.collection("favorites").doc("listFavorites");
  dbFavRef.update({
    favorites : JSON.stringify(recipes)
  });
}

export async function saveNotification(recipe) {
  console.log(`DATA: ${recipe.dateNotification}`);
  console.log(`Horario: ${recipe.dateTimeNotification}`);

  const now = new Date();

  const dateDay = recipe.dateNotification.getDate();
  const dateMonth = recipe.dateNotification.getMonth();
  const dateYear = recipe.dateNotification.getFullYear();

  const hours = recipe.dateTimeNotification.getHours();
  const minutes = recipe.dateTimeNotification.getMinutes();
  const seconds = recipe.dateTimeNotification.getSeconds();

  console.log(`${dateDay} / ${dateMonth} / ${dateYear} / ${hours} / ${minutes}/ ${seconds}`);

  const targetDate = new Date(dateYear, dateMonth, dateDay, hours, minutes, seconds);

  const dateDiff = differenceInSeconds(targetDate, now);
  console.log(dateDiff);

  const notificationId = await Notifications.scheduleNotificationAsync(
    {
      content: {
        title: 'Vai uma receitinha ai? 😋',
        body: `O que acha de fazer um delicioso ${recipe.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
      trigger: {
        seconds: dateDiff
      }
    }
  )
  console.log(notificationId);
}