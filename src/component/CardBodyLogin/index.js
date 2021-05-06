import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Text} from 'react-native';
import color from '../../styles/color';
import ButtonConfirmLogin from '../ButtonConfirmLogin';
import ButtonLogin from '../ButtonLogin';
import { AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CardBodyLogin() {
  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.selectLoginSignUp}>
          <ButtonLogin 
            title={'Login'} 
            selected={true}
          />
          <ButtonLogin 
            title={'Sign Up'} 
            selected={false}
          />
        </View>

        <View>
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
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Text style={styles.textInput}>
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>
        </View>

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
    marginBottom: 50,

    borderWidth: 1,
    borderRadius: 14,
    borderColor: color.lineStyle,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: color.lineStyle,
    color: color.orangeDark3,
    width: '100%',
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    fontFamily: 'Montserrat_300Light',
    fontSize: 10
  },
  containerSpaceBetween: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  }
});