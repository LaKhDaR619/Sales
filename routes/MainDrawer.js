import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './DrawerContent';

import HomeScreen from '../screens/HomeScreen';
import OrdersTabs from './OrdersTabs';
import ProductsTabs from './ProductsTabs';
import CustomersTabs from './CustomersTabs';
import UsersTabs from './UsersTabs';

import SettingsScreen from '../screens/SettingsScreen';
import EditProductScreen from '../screens/EditProductScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import PreviewScreen from '../screens/PreviewScreen';

const MainDrawer = createDrawerNavigator();

export default function() {
  return (
    <MainDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <MainDrawer.Screen name="Home" component={HomeScreen} />
      <MainDrawer.Screen name="Orders" component={OrdersTabs} />
      <MainDrawer.Screen name="Products" component={ProductsTabs} />
      <MainDrawer.Screen name="Customers" component={CustomersTabs} />
      <MainDrawer.Screen name="Users" component={UsersTabs} />
      <MainDrawer.Screen name="Settings" component={SettingsScreen} />
      {/* Hidden Routes (One Way Routes) */}
      <MainDrawer.Screen name="Edit Product" component={EditProductScreen} />
      <MainDrawer.Screen name="Order Details" component={OrderDetailsScreen} />
      <MainDrawer.Screen name="Preview Screen" component={PreviewScreen} />
    </MainDrawer.Navigator>
  );
}
