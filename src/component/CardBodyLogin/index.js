import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Text, StatusBar} from 'react-native';
import color from '../../styles/color';
import ButtonConfirmLogin from '../ButtonConfirmLogin';
import ButtonLogin from '../ButtonLogin';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CardBodyLogin() {
  const [selectedScreen, setSelectedScreen] = useState('Login');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [email, setEmail] = useState('');

  function handleSelectedScreen(screen) {
    setSelectedScreen(screen);
    console.log(screen);
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!email);
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange(email){
    setIsFilled(!!email);
    setEmail(email);
  }

  return(
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={styles.content}>
        <View style={styles.selectLoginSignUp}>
          <ButtonLogin 
            title={'Login'} 
            selected={selectedScreen === 'Login'}
            onPress={() => handleSelectedScreen('Login')}
          />
          <ButtonLogin 
            title={'Sign Up'} 
            selected={selectedScreen === 'SignUp'}
            onPress={() => handleSelectedScreen('SignUp')}
          />
        </View>

        
        {selectedScreen === 'Login' ? 
          <View style={{marginTop: 50}}>
            
            <TextInput 
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: color.orangeDark2 }
              ]}
              placeholder="Email"
              
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <TextInput 
              style={[
                styles.input
              ]}
              placeholder="Senha"
              textContentType="password"
              keyboardType="visible-password"
            />
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Text style={styles.textInput}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </View>
        :(
          <View style={{marginTop: 25}}>
            <TextInput 
              style={[
                styles.input
              ]}
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TextInput 
              style={[
                styles.input
              ]}
              placeholder="Senha"
              textContentType="password"
              keyboardType="visible-password"
            />
            <TextInput 
              style={[
                styles.input,
                {marginBottom: 5}
              ]}
              placeholder="Confirmar Senha"
              textContentType="password"
              keyboardType="visible-password"
            />
          </View>
         )}
         

        <View style={styles.containerSpaceBetween}>
          <ButtonConfirmLogin
            title={'Login'} 
            selected={true}
          />
        </View>

        <View style={styles.containerSpaceBetween}>
          <Text style={styles.textInput}>
            Ou
          </Text>

          <View style={{flexDirection: 'row', marginTop: 25}}>

            <TouchableOpacity style={{paddingHorizontal: 5}}>
              <AntDesign name="facebook-square" size={34}/> 
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal: 5}}>
              <AntDesign name="google" size={34}/> 
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal: 5}}>
              <AntDesign name="instagram" size={34}/> 
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    width: '100%',
    height: windowHeight > 700 ? 500: 450,
    paddingHorizontal: '6%',
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: color.white,
    borderRadius: 35,
    elevation: 10,
    borderWidth: 1,
    borderColor: color.lineStyle,
    paddingHorizontal: 50,
  },
  selectLoginSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 225,
    marginTop: 50,

    borderWidth: 1,
    borderRadius: 14,
    borderColor: color.lineStyle,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: color.lineStyle,
    color: color.orangeDark3,
    width: '100%',
    fontSize: 12,
    fontFamily: 'Montserrat_300Light',
    marginBottom: 20,
  },
  textInput: {
    fontFamily: 'Montserrat_300Light',
    fontSize: 10
  },
  containerSpaceBetween: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  }
});