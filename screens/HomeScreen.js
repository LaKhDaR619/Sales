import React, {useEffect} from 'react';
import {StyleSheet, Text, View, BackHandler, Alert, Button} from 'react-native';

import Header from '../Components/Header';

export default function HomeScreen({navigation}) {
  /*useEffect(() => {
    console.log('here');

    BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert('Exit', 'Are you sure you want to Exit', [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ]);

      //  false means do the default + the above
      return true;
    });
  });*/

  return (
    <View>
      <Header navigation={navigation} title="Home" />
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
