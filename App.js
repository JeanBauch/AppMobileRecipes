import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Archivo_400Regular} from '@expo-google-fonts/archivo';
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_300Light} from '@expo-google-fonts/montserrat'

import Routes from './src/routes/router';

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_300Light,

  });

  if(!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#000" translucent={true} />
      <Routes/>
    </>
  );
}