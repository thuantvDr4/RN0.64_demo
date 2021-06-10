/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';

const OtpPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const lengthCode =6;
  let textInput = useRef(null);
  const [otpCode, setOtpCode] = useState('');
  const [phone, setPhone] = useState('');
  const [confirm, setConfirm] = useState(null);

  const [waiting, setWaiting] = useState(false);

  useEffect(()=>{
    const _phoneNumb = route.params;
    setPhone(_phoneNumb)
    //
    signInWithPhoneNumber()

  },[route.params]);


  useEffect(()=>{
    textInput.focus();
  },[])


  async function signInWithPhoneNumber (){
    try {
      const confirmation = await auth().signInWithPhoneNumber('+84909792583');
      console.log('-----signInWithPhoneNumber', confirmation)
      setConfirm(confirmation);
    }catch (e){
      console.log('-----signInWithPhoneNumber', e)
    }

  }


  function onPressVerify (){
    if(otpCode.length ===lengthCode){
      //
      setWaiting(true);
      //
      confirmCode();
    }

  }

  async function confirmCode (){
    try {
      const result = await confirm.confirm(otpCode);
      console.log('---confirmCode', result);
      if(result){
        navigation.replace('Home');
      }
      setWaiting(false);
    }
    catch (e){
      setWaiting(false);
      console.log('---confirmCode', e)
      alert('Invalid code.')
    }

  }

  /*--------------*/
  return (
    <View style={styles.main_ctn}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior ={'padding'}
        style={styles.keyboardAvoid_ctn}
      >
        <Text style={styles.title_txt}>{'Input your OTP code via SMS'}</Text>
        <Text style={styles.title_txt}>{phone}</Text>
        <View>
          <TextInput
            ref={(input)=> textInput = input}
            style={{width:0, height:0}}
            maxLength={lengthCode}
            keyboardType ={'numeric'}
            returnKeyType={'done'}
            value={otpCode}
            onChangeText={(code)=>setOtpCode(code)}
          />

          <View style={styles.input_ctn}>
            {Array(lengthCode).fill().map((code, index)=>{
              return(
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={()=>textInput.focus()}
                  key={'Key:'+index}
                      style={[styles.cell_ctn,{
                        borderBottomColor: index === otpCode.length? '#ff9800': '#ffffff'
                      }]}>
                  <Text
                    style={styles.cell_txt}>
                    {otpCode&&otpCode.length >0? otpCode[index] : ""}
                  </Text>
                </TouchableOpacity>
              )
            })
            }
          </View>
        </View>
        <View style={styles.bottom_cnt}>
          <TouchableOpacity
            onPress={onPressVerify}
            style={styles.btn_verify}>
            {waiting?  <ActivityIndicator size="large" color="#00ff00" /> :
              <Text style={styles.verify_txt}>{'Verify'}</Text>
            }

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
    alignItems: 'center',
    justifyContent: 'center'
  },
  cell_ctn:{
    paddingVertical: 10,
    margin:5,
    width:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth:1,
  },
  cell_txt:{
    color: '#ff9800',
    fontSize: 20,
    fontWeight: '600'
  },
  bottom_cnt:{
    justifyContent: 'flex-end',
    flex:1,
    marginBottom:50
  },
  btn_verify:{
    height: 50,
    width: 150,
    borderRadius:10,
    backgroundColor: '#2979ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  verify_txt:{
    color: 'white',
    alignItems: 'center'
  }


})


export default OtpPage;
