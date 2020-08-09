import React from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../Components/Header';
import OrdersScreen from '../screens/OrdersHistoryScreen';
import AddOrderScreen from '../screens/AddOrderScreen';
import {connect} from 'react-redux';

const Tabs = createMaterialBottomTabNavigator();

function OrdersTabs({navigation, words}) {
  const iconSize = 24;

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} title={words.orders} />
      <Tabs.Navigator
        initialRouteName="Add Order"
        barStyle={{
          height: 53,
        }}
        activeColor="#fff"
        shifting={true}>
        <Tabs.Screen
          name="Add Order"
          component={AddOrderScreen}
          options={{
            tabBarLabel: words.addorder,
            tabBarIcon: ({color}) => (
              <Ionicons name="add-circle" color={color} size={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarLabel: words.orders,
            tabBarIcon: ({color}) => (
              <MIcon name="border-color" color={color} size={iconSize} />
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
)(OrdersTabs);
