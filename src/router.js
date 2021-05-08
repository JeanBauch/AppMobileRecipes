import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Home from './pages/Home';
import Detail from './pages/Detail';
import { DetailProvider } from './hooks/DetailContext';
import Login from './pages/Login';
import color from './styles/color';

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
                            headerRight: () => {
                                const navigation = useNavigation();
                                return(
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={{ marginRight: 15 }}>
                                            <Feather
                                                name = "search"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate('Login')}>
                                            <Feather
                                                name = "user"
                                                size={24}
                                                color="black"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            },
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
                            headerStyle:{
                                backgroundColor: color.orangePrimary
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
                        }}
                    />
                    
                    <Stack.Screen 
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DetailProvider>
    )
}

export default Routes;