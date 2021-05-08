import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Instructions(props) {
 
    function spacing(text){
        const textFormated = text.split(". ").join(". \n\n\n") ;
        return textFormated;
    }
 
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Instructions</Text>

            <View style={styles.instructionContainer}>
                <View>
                    <Text style={styles.text}>
                        {spacing(props.instructions)}
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
        marginBottom: '4%',
        backgroundColor: '#fff',
        elevation: 5
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