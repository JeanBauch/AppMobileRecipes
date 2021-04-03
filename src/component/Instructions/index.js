import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Instructions() {
 return (
   <View style={styles.container}>
       <Text style={styles.title}>Instructions</Text>

        <View style={styles.instructionContainer}>
            <View>
                <Text style={styles.text}>
                Oil and line a 20cm round loose- bottomed cake tin with cling film, making it as smooth as possible. 
                Melt the butter in a pan. 
                Crush the biscuits by bashing them in a bag with a rolling pin, then stir them into the butter until very well coated. 
                Press the mixture firmly into the base of the tin and chill.
                Soak the gelatine in water while you make the filling.
                Tip the ricotta into a bowl, then beat in the peanut butter and syrup. 
                Ricotta has a slightly grainy texture so blitz until smooth with a stick blender for a smoother texture if you prefer.
                Take the soaked gelatine from the water and squeeze dry. 
                Put it into a pan with the milk and heat very gently until the gelatine dissolves
                </Text>
            </View>
        </View>

   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: '4%'
    },
    instructionContainer:{
        paddingBottom: '5%'
    },
    title: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 20,
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    text:{
        fontFamily: 'Montserrat_400Regular',
        paddingHorizontal: '8%',
        padding: '1%'
    }
});