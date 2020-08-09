import React from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import CustomersScreen from '../screens/CustomersScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import Header from '../Components/Header';
import {connect} from 'react-redux';

const Tabs = createMaterialBottomTabNavigator();

function CustomersTabs({navigation, words}) {
  const iconSize = 24;

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} title={words.customers} />
      <Tabs.Navigator
        initialRouteName="Customers"
        barStyle={{
          height: 53,
        }}
        activeColor="#fff"
        shifting={true}>
        <Tabs.Screen
          name="Customers"
          component={CustomersScreen}
          options={{
            tabBarLabel: words.customers,
            tabBarIcon: ({color}) => (
              <Fontisto name="persons" color={color} size={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="Add Customer"
          component={AddCustomerScreen}
          options={{
            tabBarLabel: words.addcustomer,
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
)(CustomersTabs);
