import React from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import UsersScreen from '../screens/UsersScreen';
import AddUserScreen from '../screens/AddUserScreen';
import Header from '../Components/Header';

import {connect} from 'react-redux';

const Tabs = createMaterialBottomTabNavigator();

function UsersTabs({navigation, words}) {
  const iconSize = 24;

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} title={words.users} />
      <Tabs.Navigator
        initialRouteName="Users"
        barStyle={{
          height: 53,
        }}
        activeColor="#fff"
        shifting={true}>
        <Tabs.Screen
          name="Users"
          component={UsersScreen}
          options={{
            tabBarLabel: words.users,
            tabBarIcon: ({color}) => (
              <Entypo name="users" color={color} size={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="Add User"
          component={AddUserScreen}
          options={{
            tabBarLabel: words.adduser,
            tabBarIcon: ({color}) => (
              <Ionicons name="add-circle" color={color} size={iconSize} />
            ),
          }}
        />
      </Tabs.Navigator>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    words: state.settings.words,
  };
};

export default connect(
  mapStateToProps,
  null,
)(UsersTabs);
