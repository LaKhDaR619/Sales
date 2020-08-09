import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Input, Button} from 'react-native-elements';

import {connect} from 'react-redux';

function AddCustomersScreen({customers, addCustomer, words}) {
  const pageWords = words.addCustomerScreen;

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    tel: '',
    email: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
  });

  // input Stuff
  const checkInputs = () => {
    // made this because if i set the state to many times in a row it will only take the last one
    let tempErrors = {
      firstName: '',
    };

    // userName
    if (inputs.firstName.length < 1) {
      tempErrors = {
        ...tempErrors,
        firstName: pageWords.error1,
      };
    }

    setErrorMessages(tempErrors);

    if (tempErrors.firstName !== '') {
      return false;
    } else return true;
  };

  const handleAddCustomer = async () => {
    if (checkInputs()) {
      // if everything is good now we add the product
      addCustomer({
        customers,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        tel: inputs.tel,
        email: inputs.email,
      });
    }
  };

  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <View style={{flex: 5, justifyContent: 'center'}}>
        <Input
          placeholder={pageWords.firstname}
          inputStyle={styles.inputStyle}
          value={inputs.firstName}
          errorMessage={errorMessages.firstName}
          errorStyle={{textAlign: 'center'}}
          onChangeText={e => {
            setErrorMessages({
              ...errorMessages,
              firstName: '',
            });
            setInputs({
              ...inputs,
              firstName: e,
            });
          }}
        />
        <Input
          placeholder={pageWords.lastname}
          inputStyle={styles.inputStyle}
          value={inputs.length}
          errorStyle={{textAlign: 'center'}}
          onChangeText={e => {
            setInputs({
              ...inputs,
              lastName: e,
            });
          }}
        />
        <Input
          placeholder={pageWords.tel}
          inputStyle={styles.inputStyle}
          value={inputs.tel}
          errorStyle={{textAlign: 'center'}}
          keyboardType="phone-pad"
          onChangeText={e => {
            setInputs({
              ...inputs,
              tel: e,
            });
          }}
        />
        <Input
          placeholder={pageWords.email}
          inputStyle={styles.inputStyle}
          value={inputs.email}
          errorStyle={{textAlign: 'center'}}
          keyboardType="email-address"
          onChangeText={e => {
            setInputs({
              ...inputs,
              email: e,
            });
          }}
        />
      </View>
      <View style={styles.addButtonContainer}>
        <Button title={pageWords.addcustomer} onPress={handleAddCustomer} />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    customers: state.customers.customers,
    words: state.settings.words,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCustomer: ({customers, firstName, lastName, tel, email}) =>
      dispatch({
        type: 'ADD_CUSTOMER',
        payload: {customers, firstName, lastName, tel, email},
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddCustomersScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
