import React, {useEffect} from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import MainDrawer from './routes/MainDrawer';
import AuthStack from './routes/AuthStack';

import {connect} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import {encrypt} from './BL/myCrypt';

const App = ({
  getUserDataAndLogin,
  settingsLoading,
  authLoading,
  loggedIn,
  getSettings,
}) => {
  useEffect(() => {
    getUserDataAndLogin();
    getSettings();

    encrypt('admin').then(res => {
      console.log('test');
      console.log(res);
    });
  }, []);

  //return <Testing />;

  if (authLoading || settingsLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <NavigationContainer>
      {loggedIn ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    authLoading: state.auth.authLoading,
    wordsLoading: state.settings.settingsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDataAndLogin: () =>
      dispatch({
        type: 'GET_USER_DATA',
      }),
    getSettings: () => {
      dispatch({
        type: 'GET_SETTINGS',
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});
