import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';

import {Text} from 'react-native-elements';

import CustomSwipeListView from '../Components/CustomSwipeListView';

import {connect} from 'react-redux';

import styles from '../assets/style';

function CustomersScreen({
  customers,
  customersLoading,
  getAllCustomers,
  deleteCustomer,
  words,
  lang,
}) {
  const pageWords = words.CustomersScreen;

  useEffect(() => {
    getAllCustomers();
  }, []);

  // props to CustomList
  const keyExtractor = item => item.ID_CUSTOMER.toString();

  const handleDeleteCustomer = (id, index) => {
    if (id == 1) Alert.alert(pageWords.defaultcustomer);
    else deleteCustomer(customers, id, index);
  };

  const renderItem = ({item, index}) => {
    return (
      <Animated.View
        style={[
          styles.row,
          {
            transform: [{translateX: customers[index].xAnimVal}],
            flexDirection: lang == 'en' ? 'row' : 'row-reverse',
          },
        ]}>
        <Text style={styles.text}>{`${item.FIRST_NAME} ${
          item.LAST_NAME
        }`}</Text>
        <Text style={styles.text}>{item.TEL}</Text>
        <Text style={styles.text}>{item.email}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {customersLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <CustomSwipeListView
          data={customers}
          reverseHeader={lang == 'en' ? false : true}
          listHeader={[words.fullname, words.tel, words.email]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          delFunc={handleDeleteCustomer}
        />
      )}
    </View>
  );
}

const mapStateToProps = state => {
  return {
    customers: state.customers.customers,
    customersLoading: state.customers.customersLoading,
    words: state.settings.words,
    lang: state.settings.lang,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllCustomers: () => dispatch({type: 'GET_ALL_CUSTOMERS'}),
    deleteCustomer: (customers, id, index) =>
      dispatch({type: 'DELETE_CUSTOMER', payload: {customers, id, index}}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomersScreen);
