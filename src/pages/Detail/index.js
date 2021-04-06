import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { api } from '../../services/api';

import Ingredients from '../../component/Ingredients';
import Instructions from '../../component/Instructions';


export default function Detail( { route } ) {

    const [moreDetail, setMoreDetail] = useState({});
    const [ingredientsList, setIngredientsList] = useState([]);
    const [measureList, setMeasureList] = useState([]);
    const [instructionsString, setInstructionsString] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getMoreDetail();
    }, []);

    useEffect(() => {
        if(!loaded)
            return 
        getinstructionsString();
        getIngredientList();
    }, [loaded]);

    const getMoreDetail = async () => {
        const { data } = await api.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`);
        setMoreDetail(data);
        setLoaded(true);
        //console.log(data.meals[0].strMeal);
    }

    const getIngredientList = () => {
        const measures = [];
        const ingredients = [];

        for(let i=1; i<21; i++) {
            const ingredientAux = `strIngredient${i}`;
            const ingredient = moreDetail.meals[0][ingredientAux];
            if (!ingredient)
                continue;
            
            const measureAux = `strMeasure${i}`;
            const measure = moreDetail.meals[0][measureAux];
            if (!measure)
                continue;
            
            measures.push(measure);
            ingredients.push(ingredient);
        }
        setIngredientsList(ingredients);
        setMeasureList(measures);
    }

    const getinstructionsString = () => {
        setInstructionsString(moreDetail.meals[0].strInstructions);
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: route.params.img }}
                style={styles.image}
                resizeMode = "cover"
            />
            
            <View style = {styles.containerDetail}>
                <View>
                    <Text style={[styles.title]}>{route.params.name}</Text>
                </View>

                <View style = {styles.containerFilter}>
                    <Text style ={styles.textDetail}>Category : {route.params.cat}</Text>
                    <Text style ={[styles.textDetail, { marginRight: 52 } ]}>Area : {route.params.area}</Text>
                </View>
            </View>

            {loaded ? (
                <Ingredients
                    ingredientList={ingredientsList}
                    measureList={measureList}
                />
            ) : null }
            
            <Instructions 
                instructions={instructionsString}
            />

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
        flex: 1,
        borderColor: '#C0C0C0',
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
        marginBottom: '3%',
        marginHorizontal: '5%',
        fontSize: 22
    },
    containerFilter:{
        flexDirection: 'row',
        justifyContent: "space-between"
    }, 
    textDetail:{
        fontFamily: 'Montserrat_300Light',
        marginHorizontal: '5%',
        marginBottom: '5%',
        fontSize: 14,
    },
    line:{
        borderWidth: 1,
        borderBottomColor: '#DDD',
        marginVertical: '2%'
    }
  });