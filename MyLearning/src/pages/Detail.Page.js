/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const DetailPage = () => {
  return (
    <View style={styles.main_ctn}>
      <Text>{'DETAIL PAGE'}</Text>
      <TouchableOpacity>
        <Text style={styles.btn_txt}>{'MORE'}</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  main_ctn:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_txt:{
    color: '#2979FF'
  },

})


export default DetailPage;
