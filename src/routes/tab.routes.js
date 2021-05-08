import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import color from '../styles/color';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return(
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: color.orangePrimary,
        inactiveTintColor: color.gray,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 62,
        },
      }}
    >
      
      <AppTab.Screen 
        name="Explorar Receitas"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons 
              name="restaurant-menu"
              size={size}
              color={color}
            />
          )
        }}
      />

      <AppTab.Screen 
        name="Meus Favoritos"
        component={Favorites}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialIcons 
              name="favorite-border"
              size={size}
              color={color}
            />
          )
        }}
      />

    </AppTab.Navigator>
  )
}

export default AuthRoutes;