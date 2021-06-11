/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React,{useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
//
import HomePage from "./src/pages/Home.Page";
import DetailPage from "./src/pages/Detail.Page";
import AuthPage from "./src/pages/Auth.Page";
import OtpPage from "./src/pages/Otp.Page";
import SignInPage from "./src/pages/Signin.Page";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


/*------config-*/
GoogleSignin.configure({
  webClientId: '434864754377-e12ri35ofu2bun9nddhf5ntd2tkt5bo8.apps.googleusercontent.com',
});
//
const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouterName={'Sign-in'}>
        <Stack.Screen name="Sign-in" component={SignInPage} />
        <Stack.Screen name="Auth" component={AuthPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Detail" component={DetailPage} />
        <Stack.Screen name="OTP" component={OtpPage} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
