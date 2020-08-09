import React, {useState} from 'react';
import {View} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProductScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import Header from '../Components/Header';

import {connect} from 'react-redux';

const Tabs = createMaterialBottomTabNavigator();

function ProductsTabs({navigation, words}) {
  const iconSize = 24;

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} title={words.products} />
      <Tabs.Navigator
        initialRouteName="Products"
        barStyle={{
          height: 53,
        }}
        activeColor="#fff"
        shifting={true}>
        <Tabs.Screen
          name="Products"
          component={ProductScreen}
          options={{
            tabBarLabel: words.products,
            tabBarIcon: ({color}) => (
              <FAIcon name="product-hunt" color={color} size={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="Add Product"
          component={AddProductScreen}
          options={{
            tabBarLabel: words.addproduct,
            tabBarIcon: ({color}) => (
              <Ionicons name="add-circle" color={color} size={iconSize} />
            ),
          }}
        />
        <Tabs.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            tabBarLabel: words.categories,
            tabBarIcon: ({color}) => (
              <FAIcon name="list-alt" color={color} size={iconSize} />
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
)(ProductsTabs);
