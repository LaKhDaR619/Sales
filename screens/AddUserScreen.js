import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {Input, Button} from 'react-native-elements';

import MyDropPicker from '../Components/MyDropPicker';

import {connect} from 'react-redux';

function AddProductScreen({navigation, users, addUser, words, route}) {
  let register = false;

  if (route.params) register = route.params;

  const pageWords = words.addUserScreen;

  const [inputs, setInputs] = useState({
    userName: '',
    fullName: '',
    pass: '',
    confirmpass: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    userName: '',
    fullName: '',
    pass: '',
    confirmpass: '',
  });
  const [userType, setUserType] = new useState('user');
  const [selectedLabel, setSelectedLabel] = useState(pageWords.user);

  useEffect(() => {
    if (route.params && route.params.register) {
      setUserType('admin');
      setSelectedLabel(pageWords.admin);
    }
  }, [route.params]);

  // input Stuff
  const checkInputs = () => {
    // made this because if i set the state to many times in a row it will only take the last one
    let tempErrors = {
      userName: '',
      fullName: '',
      pass: '',
      confirmpass: '',
    };

    // userName
    if (inputs.userName.length < 1) {
      tempErrors = {
        ...tempErrors,
        userName: pageWords.errusername,
      };
    }

    //fullName
    if (inputs.fullName.length < 1) {
      tempErrors = {
        ...tempErrors,
        fullName: pageWords.errfullname,
      };
    }

    //password
    if (inputs.pass.length < 1) {
      tempErrors = {
        ...tempErrors,
        pass: pageWords.errpass,
      };
    }

    //confirm password
    if (inputs.confirmpass.length < 1) {
      tempErrors = {
        ...tempErrors,
        confirmpass: pageWords.errconfirmpass,
      };
    }

    if (inputs.pass !== inputs.confirmpass) {
      tempErrors = {
        ...tempErrors,
        confirmpass: pageWords.errpassconf,
      };
    }

    setErrorMessages(tempErrors);

    if (
      tempErrors.userName !== '' ||
      tempErrors.fullName !== '' ||
      tempErrors.pass !== '' ||
      tempErrors.confirmpass !== ''
    ) {
      return false;
    } else return true;
  };

  const handleAddUser = async () => {
    if (checkInputs()) {
      // if everything is good now we add the product
      addUser({
        users,
        UserName: inputs.userName,
        FullName: inputs.fullName,
        password: inputs.pass,
        UserType: userType,
        setInputs,
        setUserType,
      });
    }
  };

  const items = register
    ? [
        {
          id: 'admin',
          name: pageWords.admin,
        },
      ]
    : [
        {
          id: 'user',
          name: pageWords.user,
        },
        {
          id: 'admin',
          name: pageWords.admin,
        },
      ];

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 10, justifyContent: 'center'}}>
        <MyDropPicker
          items={items}
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          setValue={setUserType}
          navigation={navigation}
          placeholder={pageWords.selectcat}
        />
        <Input
          placeholder={words.username}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          value={inputs.userName}
          errorMessage={errorMessages.userName}
          errorStyle={{textAlign: 'center'}}
          onChangeText={e => {
            setErrorMessages({
              ...errorMessages,
              userName: '',
            });
            setInputs({
              ...inputs,
              userName: e,
            });
          }}
        />
        <Input
          placeholder={words.fullname}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          value={inputs.fullName}
          errorMessage={errorMessages.fullName}
          errorStyle={{textAlign: 'center'}}
          onChangeText={e => {
            setErrorMessages({
              ...errorMessages,
              fullName: '',
            });
            setInputs({
              ...inputs,
              fullName: e,
            });
          }}
        />
        <Input
          placeholder={words.password}
          autoCapitalize="none"
          secureTextEntry={true}
          inputStyle={styles.inputStyle}
          value={inputs.pass}
          errorMessage={errorMessages.pass}
          errorStyle={{textAlign: 'center'}}
          onChangeText={e => {
            setErrorMessages({
              ...errorMessages,
              pass: '',
            });
            setInputs({
              ...inputs,
              pass: e,
            });
          }}
        />
        <Input
          placeholder={pageWords.confirmpassword}
          secureTextEntry={true}
          autoCapitalize="none"
          inputStyle={styles.inputStyle}
          value={inputs.confirmpass}
          errorMessage={errorMessages.confirmpass}
          errorStyle={{textAlign: 'center'}}
          onChangeText={e => {
            setErrorMessages({
              ...errorMessages,
              confirmpass: '',
            });
            setInputs({
              ...inputs,
              confirmpass: e,
            });
          }}
        />
      </View>

      <View style={styles.addButtonContainer}>
        <Button title={pageWords.adduser} onPress={handleAddUser} />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    words: state.settings.words,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: payload =>
      dispatch({
        type: 'ADD_USER',
        payload,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProductScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barCodeContainer: {
    flexDirection: 'row',
    margin: 5,
    marginTop: 10,
  },
  inputContainer: {flex: 1},
  inputStyle: {
    textAlign: 'center',
  },
  addButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    paddingBottom: 25,
  },
});
