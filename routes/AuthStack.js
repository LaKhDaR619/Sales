import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import AddUserScreen from '../screens/AddUserScreen';

import {connect} from 'react-redux';

const Stack = createStackNavigator();

function AuthStack({usersLoading, users, getAllUsers}) {
  useEffect(() => {
    getAllUsers();
  }, []);

  if (usersLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Stack.Navigator headerMode="none">
      {users.length == 0 ? (
        <Stack.Screen
          name="Add User"
          component={AddUserScreen}
          register={true}
          initialParams={{register: true}}
        />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    usersLoading: state.users.usersLoading,
  };
};
const mapDisptachToProps = dispatch => {
  return {
    getAllUsers: () => dispatch({type: 'GET_ALL_USERS'}),
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(AuthStack);
