/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const AuthPage = () => {
  const navigation = useNavigation();
  let inputRef = useRef(null);
  const [phoneNumb, setPhoneNumb] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(()=>{
    inputRef.focus();
  },[])


  function _onBlur (){
    setInputFocus(false);
  }

  function _onFocus (){
    setInputFocus(true);
  }

  function onPressContinue (){
    if(phoneNumb.length > 9){
      navigation.navigate('OTP', phoneNumb)
    }
  }


  return (
    <View style={styles.main_ctn}>
      <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      behavior ={Platform.OS === 'ios'?'padding' : 'height'}
      style={styles.keyboardAvoid_ctn}
      >
        <Text style={styles.title_txt}>{'Please input your phone number'}</Text>

        <View style={styles.input_ctn}>
          <View style={styles.left_ctn}>
            <Text>{''}</Text>
          </View>
          <TextInput
            ref={(input)=> inputRef = input}
            maxLength ={10}
            style={styles.input_st}
            placeholder={'0 909 2287 05'}
            keyboardType ={'numeric'}
            value={phoneNumb}
            onChangeText={(phone)=>setPhoneNumb(phone)}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
        </View>
        <View style={styles.bottom_ctn}>
          <TouchableOpacity
            onPress={onPressContinue}
            style={styles.btn_ctn}>
            <Text style={styles.btn_txt}>{'Continue'}</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
};


const styles = StyleSheet.create({
  main_ctn:{
    flex:1,
  },
  keyboardAvoid_ctn:{
    flex:1,
    alignItems: 'center',
    padding: 10,
  },
  title_txt:{
    color: '#2979ff',
    marginVertical: 50
  },
  input_ctn:{
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    borderBottomWidth:1,
    borderColor: '#2979ff'
  },
  left_ctn:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  input_st:{
    flex:1,
    height: 50,
    fontSize:18
  },
  bottom_ctn:{
    flex:1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center'
  },
  btn_ctn:{
    width:150,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#2979ff'
  },
  btn_txt:{
    color: 'white'
  }

})


export default AuthPage;
