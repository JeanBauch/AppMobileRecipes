import React, { useState, useEffect } from 'react';
import { Animated ,View, StyleSheet, TextInput, Dimensions, TouchableOpacity, Text, StatusBar, Alert} from 'react-native';
import color from '../../styles/color';
import ButtonConfirmLogin from '../ButtonConfirmLogin';
import ButtonLogin from '../ButtonLogin';
import { AntDesign } from '@expo/vector-icons';
import { authDatabase, provider, FirebaseOther, providerFacebook } from './../../config/firebase';
import { useNavigation } from '@react-navigation/core';
import * as Facebook from 'expo-facebook';
import { facebookConfig } from '../../config/facebook';
import { useDetail } from '../../hooks/DetailContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CardBodyLogin() {
  const navigation = useNavigation();

  const { setIsLogged } = useDetail();
  const [selectedScreen, setSelectedScreen] = useState('Login');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailCorrect, setIsEmailCorrect] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
 
  function handleSelectedScreen(screen) {
    setSelectedScreen(screen);
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

  function handleInputPasswordChange(password){
    setPassword(password);
  }

  function handleInputConfirmPasswordChange(confirmPassword){
    setConfirmPassword(confirmPassword);
  }

  function handleCreateUserSubmit(screen){

    if(screen === "Login") {
      authDatabase.signInWithEmailAndPassword(email, password)
        .then((userCrential) => {
          var user = userCrential.user;
          console.log("Logado com sucesso!");
          setEmail('');
          setPassword('');
          setIsLogged(true);
          navigation.navigate("Home");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if((errorCode === "auth/user-not-found") || (errorCode === "auth/invalid-email"))
            setIsEmailCorrect(false);
          else
            setIsEmailCorrect(true);
          if(errorCode === "auth/wrong-password") {
            Alert.alert("Senha incorreta, verifique novamente!");
            setIsPasswordCorrect(false);
          } else 
            setIsPasswordCorrect(true);
          console.log(errorCode);
          console.log("-->");
          console.log(errorMessage);
        })


    } else if (screen === "SignUp") {

      if(password === confirmPassword) {
        setIsPasswordCorrect(true);
      } else {
        setIsPasswordCorrect(false);
        return
      }

      authDatabase.createUserWithEmailAndPassword(email, password)
      .then((userCrential) => {
        var user = userCrential.user;
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsLogged(true);
        navigation.navigate("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === "auth/invalid-email")
          setIsEmailCorrect(false);
        else
          setIsEmailCorrect(true);
        if(errorCode === "auth/weak-password") {
          Alert.alert("A senha deve conter mais de 6 caracteres!");
          setIsPasswordCorrect(false);
        } else 
          setIsPasswordCorrect(true);
        console.log(errorCode);
        console.log("-->");
        console.log(errorMessage);
      });
    }
  }

  function handleForgetPassword(){
    if(email != null) {
      authDatabase.sendPasswordResetEmail(email)
        .then( (task) => {
          console.log(task);
          Alert.alert("Email de recuperação de senha enviado! 😄");
        })
        .catch( (error) => {
          console.log(error);
          Alert.alert("Insira um email valido no campo Email!");
          console.log("falha ao enviar o email");
        } )
    }   
  }

  function handleGoogleLogin(){
    // console.log("Google!");
    // authDatabase.signInWithRedirect(provider);

    // authDatabase.getRedirectResult()
    //   .then((result) => {
    //     if(result.credential) {
    //       var credential = result.credential;
    //       var token = credential.accessToken;

    //       console.log(credential);
    //       console.log(token);
    //     }
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     var email = error.email;
    //     var credential = error.credential;

    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     console.log(email);
    //     console.log(credential);
    //   });
  }

  async function handleFacebookLogin(){

    // await Facebook.initializeAsync({
    //   appId: facebookConfig.appId,
    //   appName: 'MobileRecipe',
    // });

    // const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    //   { permissions: ['public_profile', 'email'] },
    // );
    // console.log(type);
    // console.log(token);

    // // if(type === 'success' && token) {
    // //   const credential = FirebaseOther.auth.FacebookAuthProvider.credential(token);

    // //   const response = await authDatabase.signInWithCredential(credential);
    // //   console.log(response);
    // // }

  //   FirebaseOther.auth()
  //     .getRedirectResult()
  //       .then((result) => {
  //       if(result.credential) {
  //         // @type {firebase.auth.OAuthCredential}
  //         var credential = result.credential;

  //         // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //         var token = credential.accessToken;

  //         // The signed-in user info.
  //         var user = result.user;
  //       }
  //     }).catch((error) => {
  //         var errorCode = error.code;
  //         var errorMessage = error.message;
  //         var email = error.email;
  //         var credential = error.credential;
  //         console.log(errorCode);
  //         console.log(errorMessage);
  //         console.log(email);
  //         console.log(credential);
  //     })
  //   FirebaseOther.auth().signInWithRedirect(providerFacebook);

  }

  return(
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={styles.content}>
        <View style={styles.selectLoginSignUp} >
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
                (isFocused || isFilled) && { borderColor: color.orangeDark2 },
                !isEmailCorrect && { borderColor: color.red }
              ]}
              placeholder="Email"
              keyboardType="email-address"
              
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <TextInput 
              style={[
                styles.input,
                !isPasswordCorrect && { borderColor: color.red }
              ]}
              placeholder="Senha"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={handleInputPasswordChange}
            />
            <TouchableOpacity onPress={handleForgetPassword} style={{alignSelf: 'flex-end'}}>
              <Text style={styles.textInput}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </View>
        :(
          <View style={{marginTop: 25}}>
            <TextInput 
              style={[
                styles.input,
                (isFocused || isFilled) && { borderColor: color.orangeDark2 },
                !isEmailCorrect && { borderColor: color.red }
              ]}
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"

              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onChangeText={handleInputChange}
            />
            <TextInput 
              style={[
                styles.input,
                !isPasswordCorrect && { borderColor: color.red }
              ]}
              placeholder="Senha"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={handleInputPasswordChange}
            />
            <TextInput 
              style={[
                styles.input,
                {marginBottom: 5},
                !isPasswordCorrect && { borderColor: color.red }
              ]}
              placeholder="Confirmar Senha"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={handleInputConfirmPasswordChange}
            />
          </View>
         )}
         

        <View style={styles.containerSpaceBetween}>
          <ButtonConfirmLogin
            title={'Login'} 
            selected={true}
            onPress={() => handleCreateUserSubmit(selectedScreen)}
          />
        </View>

        <View style={styles.containerSpaceBetween}>
          <Text style={styles.textInput}>
            Ou
          </Text>

          <View style={{flexDirection: 'row', marginTop: 25}}>

            <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => handleFacebookLogin()}>
              <AntDesign name="facebook-square" size={34} color={'#4464B4'}/> 
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal: 5}} onPress={() => handleGoogleLogin()}>
              <AntDesign name="google" size={34} color={'black'}/> 
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal: 5}}>
              <AntDesign name="twitter" size={34} color={'#1C9CF4'}/> 
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
    //alignItems: 'center',
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