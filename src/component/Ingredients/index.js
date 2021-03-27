import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Ingredients() {
 return (
   <View style={styles.container}>
       <Text style={styles.title}>Ingredients</Text>


        <View style={styles.ingredientsContainer}>
            <View>
                <Text style={styles.text}>
                    50g
                </Text>
                <Text style={styles.text}>
                    175g
                </Text>
                <Text style={styles.text}>
                    5
                </Text>
                <Text style={styles.text}>
                    500g
                </Text>
                <Text style={styles.text}>
                    175g
                </Text>
                <Text style={styles.text}>
                    175g
                </Text>
                <Text style={styles.text}>
                    150ml
                </Text>
                <Text style={styles.text}>
                    275ml
                </Text>
                <Text style={styles.text}>
                    2 tblsp
                </Text>
                <Text style={styles.text}>
                    Crushed
                </Text>
            </View>

            <View>
                <Text style={styles.text}>
                    Butter
                </Text>
                <Text style={styles.text}>
                    Peanut Cookies
                </Text>
                <Text style={styles.text}>
                    Gelatine Leafs
                </Text>
                <Text style={styles.text}>
                    Ricotta
                </Text>
                <Text style={styles.text}>
                    Peanut Butter
                </Text>
                <Text style={styles.text}>
                    Golden Syrup
                </Text>
                <Text style={styles.text}>
                    Milk
                </Text>
                <Text style={styles.text}>
                    Double Cream
                </Text>
                <Text style={styles.text}>
                    Light Brown Soft Sugar
                </Text>
                <Text style={styles.text}>
                    Peanut Brittle
                </Text>
            </View>
        </View>

   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: '4%'
    },
    title: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 20,
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    ingredientsContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingBottom: '5%'
    },
    text:{
        fontFamily: 'Montserrat_400Regular',
        paddingLeft: 50,
    }
});