/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Button, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

/*-----------------SignInPage----*/
const SignInPage = () => {
  const navigation = useNavigation();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    if (!user) {
      console.log("[user]-----logout");
      setIsLogin(false);
      //
      return;
    }
    console.log("[user]-----had login", user);
    setUser(user);
    setIsLogin(true);
  }


  //--check
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  /*-----_onGoogleButtonPress--*/
  async function _onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      // const {idToken, user, serverAuthCode} = await GoogleSignin.signIn();
      const userInfo = await signInWithGoogle();
      console.log("[success]-----userInfo", userInfo);
      setUser(userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("[err]-----user cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("[err]-----operation (e.g. sign in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("[err]-----play services not available or outdated");
      } else {
        // some other error happened
        console.log("[err]-----user cancelled the login flow");
      }
    }
  }

  /*---------------*/
  async function signInWithGoogle() {
    // Get the users ID token
    try {
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    }catch (e){
      console.log('[err]------',e)
      return null
    }

  }


  /*-----_signOut*/
  async function _signOutGG() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error("[sign-out]----", error);
    }
  }


  /*-----_signOutAuth*/
  async function _signOutAuth() {
    try {
      auth()
        .signOut()
        .then(() => {
          console.log("User signed out!");
          setUser(null); // Remember to remove the user from your app's state as well
          setIsLogin(false);
        });
    } catch (error) {
      console.error("[sign-out]----", error);
    }
  }


  async function signInWithFaceBook() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    }catch (e){
      console.log('[Err]-------',e)
      return null
    }

  }


  async function onFacebookButtonPress() {
      const result = await signInWithFaceBook();
    console.log("[signInWithFB]----", result);
  }


  /*--------------------*/
  return (
    <View style={styles.main_ctn}>
      <Text style={styles.title_txt}>{"Sign in social"}</Text>
      <View style={styles.user_view}>
        <Text style={styles.user_txt}>User name: {user && user.displayName ? user.displayName : ""}</Text>
        <Text style={styles.user_txt}>User email: {user && user.email ? user.email : ""}</Text>
        <Text style={styles.user_txt}> Phone: {user && user.phoneNumber ? user.phoneNumber : ""}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_onGoogleButtonPress}
          disabled={isLogin} />

        <View style={{ height: 30 }} />

        <Button
          title="Facebook Sign-In"
          onPress={onFacebookButtonPress}
        />


      </View>


      <View style={styles.bottom_view}>
        <TouchableOpacity
          onPress={_signOutAuth}
          style={styles.btn_signOut}>
          <Text style={styles.btn_txt}>{"Sign Out"}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  main_ctn: {
    flex: 1,
    alignItems: "center",
  },

  title_txt: {
    color: "#2979ff",
    marginVertical: 50,
    alignItems: "center",
  },

  user_view: {
    width: "90%",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
  },
  user_txt: {
    color: "#2979ff",
    marginVertical: 10,
    alignItems: "center",
  },
  bottom_view: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  btn_signOut: {
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 8,
  },
  btn_txt: {
    color: "white",
    alignItems: "center",
    fontSize: 16,
  },

});


export default SignInPage;
