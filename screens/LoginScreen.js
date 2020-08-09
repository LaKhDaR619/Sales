import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';

import {connect} from 'react-redux';

function LoginScreen({userLogin, errorMessage, navigation, words}) {
  const pageWords = words.loginScreen;

  const [loginInputs, setLoginInputs] = useState({
    userName: '',
    password: '',
  });

  const handleLogin = () => {
    userLogin(loginInputs.userName, loginInputs.password, navigation);
  };

  // TODO fix lossing input values after trying to login
  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>{pageWords.login}</Text>
      <Input
        autoCapitalize="none"
        inputStyle={{textAlign: 'center'}}
        onChangeText={txt => setLoginInputs({...loginInputs, userName: txt})}
        value={loginInputs.userName}
        placeholder={pageWords.username}
      />
      <Input
        autoCapitalize="none"
        secureTextEntry={true}
        inputStyle={{textAlign: 'center'}}
        onChangeText={txt => setLoginInputs({...loginInputs, password: txt})}
        value={loginInputs.password}
        placeholder={pageWords.password}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button title={pageWords.login} onPress={handleLogin} />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    errorMessage: state.auth.errorMessage,
    words: state.settings.words,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (userName, password, navigation) =>
      dispatch({
        type: 'USER_LOGIN',
        payload: {
          navigation,
          userName,
          password,
        },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  mainHeader: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 30,
  },
  loginButton: {
    backgroundColor: 'lightblue',
    height: 30,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    paddingBottom: 20,
  },
});
