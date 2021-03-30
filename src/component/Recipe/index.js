import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function Recipes(props) {

 function filterDesc(desc){
    if(desc.length < 10){
        return desc;
    }

    return `${desc.substring(0, 18)}...`;
 }

 return (
   <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <Image
        source={props.img}
        style={styles.recipeImg}
      />
      <Text style={styles.recipeText}>
          {filterDesc(props.children)}
      </Text>
      <View opacity={0.4}>
        <Text style={styles.recipeText}> {props.category} </Text>
      </View>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    recipeImg:{
        width: 140,
        height: 140,
        borderRadius: 30
    },
    recipeText:{
        fontFamily: 'Montserrat_300Light',
        fontSize: 14,
        marginTop: '3%'
    }
});