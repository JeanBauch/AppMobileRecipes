import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert, Platform, TouchableOpacity} from 'react-native';
import { api } from '../../services/api';
import { FAB } from 'react-native-paper';
import  DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';

import Ingredients from '../../component/Ingredients';
import Instructions from '../../component/Instructions';
import color from '../../styles/color';
import { saveFavoriteRecipe, removeRecipe, saveNotification } from '../../libs/storage';
import { useDetail } from '../../hooks/DetailContext';
import CardYouTube from '../../component/CardYouTube';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Detail( { route } ) {
    const recipe = route.params;

    const { listFavorites, newFavorite, handleNewFavorite, handleRemoveFavoriteList } = useDetail();
    const [moreDetail, setMoreDetail] = useState({});
    const [ingredientsList, setIngredientsList] = useState([]);
    const [measureList, setMeasureList] = useState([]);
    const [instructionsString, setInstructionsString] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [changeStateFavorite, setChangeStateFavorite] = useState();
    const [isFavoriteList, setIsFavoriteList] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
    const [showDatePickerAndroidDate, setShowDatePickerAndroidDate] = useState(false);
    const [iconAlarm, setIconAlarm] = useState('alarm');

    useEffect(() => {
        getMoreDetail();
        getListFavorites();
    }, []);

    useEffect(() => {
        if(!loaded)
            return 
        getinstructionsString();
        getIngredientList();
    }, [loaded]);

    useEffect(() => {
        if(isFavorite && !isFavoriteList)  {
            saveRecipeStorage();
        } else {
            if(changeStateFavorite)
                handleRemoveFavorite();
        }
    },[isFavorite]);

    useEffect(() => {
        if(newFavorite) {
            handleNewFavorite(false);
        }
        getListFavorites();
    },[newFavorite]);

    useEffect(() => {
        if(showDatePickerAndroidDate) {
            setShowDatePicker(false);
        }
    },[showDatePickerAndroidDate]);

    const getMoreDetail = async () => {
        const { data } = await api.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${route.params.id}`);
        setMoreDetail(data);
        setLoaded(true);
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

    async function handlePressFavorite () {
        setIsFavorite(!isFavorite);
        setChangeStateFavorite(true);
    }

    async function saveRecipeStorage() {
        try{
            await saveFavoriteRecipe(recipe);
            setChangeStateFavorite(true);
            handleNewFavorite(true);
            handleRemoveFavoriteList(false);
        } catch{
            Alert.alert('Nao foi possivel salvar. 😢 ');
        }
    }

    const getListFavorites = () => {
        listFavorites.map( (idRecipes) => {
            if(idRecipes.id == recipe.id) {
                setIsFavorite(true);
                setIsFavoriteList(true);
                handleRemoveFavoriteList(false);
            }
        });
    }

    async function handleRemoveFavorite() {
        try {
            await removeRecipe(recipe.id);
            handleRemoveFavoriteList(true);
        } catch(error) {
            Alert.alert('Nao foi possivel remover. 😢 ');
        }
    }

    function handleChangeTime(event, dateTime) {
        if(Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date() )) {
            setSelectedDateTime(new Date());
            return Alert.alert("Escolha uma hora no futuro! ⏰");
        }

        if(dateTime) {
            setSelectedDateTime(dateTime);
            setShowDatePickerAndroidDate(true);
        }
    }

    function handleChangeDate(event, dateTime) {
        const now = new Date();

        if(Platform.OS == 'android') {
            setShowDatePickerAndroidDate(false);
        }

        if( (isBefore(dateTime.getDate(), now.getDate())) || (isBefore(dateTime.getMonth(), now.getMonth())) )
            return Alert.alert("Escolha uma hora no futuro! ⏰");

        if(dateTime) {
            setSelectedDate(dateTime);
        }
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState);
    }

    function handleSetNotification() {
        try{
            saveNotification({
                ...recipe,
                dateNotification: selectedDate,
                dateTimeNotification: selectedDateTime
            });
            setIconAlarm("alarm-check");
            Alert.alert("Lembrete salvo com sucesso! 🔔");
        } catch {
            console.log("Deu ruim");
        }
    }

    return (
        <>
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
                        <Text style ={styles.textDetail}>Categoria : {route.params.cat}</Text>
                        <Text style ={[styles.textDetail, { marginRight: 52 } ]}>País : {route.params.area}</Text>
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

                <CardYouTube thumb={recipe.img} link={recipe.link}/>

                <View style={styles.containerAlarm}>

                    <Text style={[styles.title, {alignSelf: 'center'}]}>Gostou da Receita?</Text>
                    <Text style={[styles.textDetail, {alignSelf: 'center'}]}>Mas deseja fazer em outro momento?</Text>
                    
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginBottom: '5%'}}>
                        <View style={styles.salveAlarmContainer}>
                            <Text style={[styles.textDetail, {fontSize: 18, color: color.orangeDark3, marginBottom: '5%'}]}>
                                {format(selectedDate, 'dd - MMM')}
                            </Text>

                            <TouchableOpacity
                                onPress={handleSetNotification}
                                style={styles.buttonAlarmContainer}
                            >
                                <MaterialCommunityIcons 
                                    name={iconAlarm}
                                    size={45}
                                    color={color.orangeDark3}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.textDetail, {color: color.orangeDark3, marginTop: '1%'}]}>
                                Salvar
                            </Text>
                        </View>

                        <View>
                            {Platform.OS === 'android' && (
                                <TouchableOpacity
                                    onPress={handleOpenDateTimePickerForAndroid}
                                >
                                    <Text style={[styles.textDetail, {fontSize: 12, color: color.orangeDark3, textAlign: 'center'}]}>
                                        Escolha a melhor data hora{'\n'}para ser lembrado:
                                    </Text>
                                    <Text style={styles.textHours}>
                                        {format(selectedDateTime, 'HH:mm')}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {showDatePicker && (
                        <DateTimePicker 
                            value={selectedDateTime}
                            mode="time"
                            display="default"
                            onChange={handleChangeTime}
                        />
                    )}

                    {showDatePickerAndroidDate && (
                        <DateTimePicker 
                            value={selectedDate}
                            mode="date"
                            display="calendar"
                            onChange={handleChangeDate}
                        />
                    )}
                </View>
            </ScrollView>

            <FAB 
                style={styles.fab}
                icon="heart"
                color={ !isFavorite ? color.background : color.orangeDark3}
                onPress={handlePressFavorite}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: '100%',
        backgroundColor: color.background
    },
    image:{
        width: '100%',
        height: 350,
    },
    containerDetail:{
        flex: 1,
        borderColor: '#C0C0C0',
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth: 1,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        marginBottom: '4%',
        backgroundColor: '#fff',
        elevation: 5,
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
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: color.orangePrimary,
    },
    containerAlarm: {
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: '4%',
        backgroundColor: '#fff',
        elevation: 5,
        marginBottom: '20%'
    },
    salveAlarmContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonAlarmContainer: {
        padding: 10,
        backgroundColor: color.orangeLight2,
        borderRadius: 60,
        elevation: 10,
    },
    textHours: {
        marginTop: '2%',
        textAlign: 'center',
        fontFamily: 'Montserrat_400Regular',
        fontSize: 32,
        color: color.orangeDark3,
        letterSpacing: 5,
    },
  });