import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';

import Ingredients from '../../component/Ingredients';
import Instructions from '../../component/Instructions';


export default function Detail() {

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/1.jpg')}
                style={styles.image}
                resizeMode = "cover"
            />

            <View style = {styles.containerDetail}>
                <View>
                    <Text style={[styles.title]}>Peanut Butter Cheesecake</Text>
                </View>

                <View style = {styles.containerFilter}>
                    <Text style ={styles.textDetail}>Category : Dessert</Text>
                    <Text style ={[styles.textDetail, { marginRight: 52 } ]}>Area : British</Text>
                </View>
            </View>

            <Ingredients/>
            <Instructions/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        backgroundColor: '#FFF'
    },
    image:{
        width: '100%',
        height: 350
    },
    containerDetail:{
        height: 100,
        borderColor: '#808080',
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth: 1,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        marginBottom: '4%'
    },
    title:{
        fontFamily: 'Montserrat_500Medium',
        marginTop: '3%',
        marginHorizontal: '5%',
        marginBottom: '3%',
        fontSize: 22
    },
    containerFilter:{
        flexDirection: 'row',
        justifyContent: "space-between"
    }, 
    textDetail:{
        fontFamily: 'Montserrat_300Light',
        marginHorizontal: '5%',
        fontSize: 14
    },
    line:{
        borderWidth: 1,
        borderBottomColor: '#DDD',
        marginVertical: '2%'
    }
  });