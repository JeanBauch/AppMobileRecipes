import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Ingredients( props ) {
return (
   <View style={styles.container}>
       <Text style={styles.title}>Ingredients</Text>

        <View style={styles.ingredientsContainer}>
            <View>
                {
                    props.measureList.map( (measure, index) => (
                        <Text style={styles.text} key={index}>
                            {measure}
                        </Text>
                    ))
                }
            </View>

            <View>
                {
                    props.ingredientList.map( (ingredient, index) => (
                        <Text style={styles.text} key={index}>
                            {ingredient}
                        </Text>
                    ))
                }
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
        marginBottom: '4%',
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 20,
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    ingredientsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: '5%'
    },
    text:{
        fontFamily: 'Montserrat_400Regular',
    }
});