import React from 'react';
import { TouchableOpacity, View, Alert, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import Detail from '../pages/Detail';
import { DetailProvider, useDetail } from '../hooks/DetailContext';
import Login from '../pages/Login';
import color from '../styles/color';
import AuthRoutes from './tab.routes';
import { authDatabase } from '../config/firebase';

const Stack = createStackNavigator();

function Routes(){
    return(
        <DetailProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={AuthRoutes}
                        options={{ 
                            headerTitle: ()=>{
                                const { relaod, setReload} = useDetail();
                                return(
                                    <TouchableOpacity onPress={()=>{setReload(false)}}>
                                        <Text style={{fontFamily: 'Montserrat_500Medium', color: color.orangeDark3, fontSize: 28,}}>Recipes</Text>
                                    </TouchableOpacity>
                                )
                            },
                            headerStyle: {
                                backgroundColor: color.background
                            },
                            headerRight: () => {
                                const navigation = useNavigation();
                                const { isLogged, handleSetIslogged } = useDetail();
                                
                                const navigateLogin = () => {
                                    navigation.navigate('Login');
                                }
                                const logOff = () => {
                                    Alert.alert('Deslogar',"Deseja deslogar?", [
                                        {
                                            text: 'Nao!',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'Sim!',
                                            onPress: () => { 
                                                handleSetIslogged(false);
                                                authDatabase.signOut();
                                                navigation.navigate('Login'); 
                                            }
                                        }
                                    ]);
                                }

                                return(
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={{ marginRight: 15 }}>
                                            <Feather
                                                name = "search"
                                                size={24}
                                                color={color.orangeDark3}
                                            />
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity 
                                            style={{ marginRight: 15 }} 
                                            onPress={isLogged? logOff:navigateLogin}
                                        >
                                            <Feather
                                                name={isLogged? "user-check" : "user"}
                                                size={24}
                                                color={color.orangeDark3}
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
                    <Stack.Screen 
                        name="Favorites"
                        component={AuthRoutes}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DetailProvider>
    )
}

export default Routes;