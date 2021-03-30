import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import Home from './pages/Home';
import Detail from './pages/Detail';
import { DetailProvider } from './hooks/DetailContext';

const Stack = createStackNavigator();

function Routes(){
    return(
        <DetailProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ 
                        title: 'Recipe',
                        headerTitleStyle:{
                            fontFamily: 'Montserrat_500Medium'
                        },
                        headerRight: () => (
                            <TouchableOpacity style={{ marginRight: 15 }}>
                                <Feather
                                    name = "search"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        ),
                        headerShown: true
                    }}
                    />
                    <Stack.Screen 
                    name="Detail"
                    component={Detail}
                    options={{
                        headerTitleStyle:{
                            fontFamily: 'Montserrat_500Medium'
                        },
                        headerRight: () => (
                            <TouchableOpacity style={{ marginRight: 15 }}>
                                <Feather
                                    name = "search"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        )
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DetailProvider>
    )
}

export default Routes;