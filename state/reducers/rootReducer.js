import {combineReducers} from 'redux';

import authReducer from './authReducer';
import productsReducer from './productsReducer';
import categoriesReducer from './categoriesReducer';
import usersReducer from './usersReducer';
import customersReducer from './customersReducer';
import ordersReducer from './ordersReducer';
import settingsReducer from './settingsReducer';
import ExtraReducer from './ExtraReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  categories: categoriesReducer,
  users: usersReducer,
  customers: customersReducer,
  orders: ordersReducer,
  settings: settingsReducer,
  extra: ExtraReducer,
});

export default rootReducer;
