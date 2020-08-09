import {takeLatest} from 'redux-saga/effects';

import {userLogin, getUserDataAndLogin, userLogout} from './authSaga';
import {
  getAllProductsSaga,
  addProductSaga,
  deleteProductSaga,
  editProductSaga,
} from './productsSaga';
import {
  getAllCategoriesSaga,
  addCategorySaga,
  deleteCategorySaga,
} from './categoriesSaga';
import {getAllUsersSaga, addUserSaga, deleteUserSaga} from './usersSaga';
import {
  getAllCustomersSaga,
  addCustomerSaga,
  deleteCustomerSaga,
} from './customersSaga';
import {
  getAllOrderssSaga,
  addOrderSaga,
  deleteOrderSaga,
  getOrderDetailsByIdSaga,
} from './ordersSaga';

import {setSettings, getSettings} from './settingsSaga';

function* mySaga() {
  // Auth
  yield takeLatest('USER_LOGIN', userLogin);
  yield takeLatest('GET_USER_DATA', getUserDataAndLogin);
  yield takeLatest('USER_LOGOUT', userLogout);
  // Products
  yield takeLatest('GET_ALL_PRODUCTS', getAllProductsSaga);
  yield takeLatest('ADD_PRODUCT', addProductSaga);
  yield takeLatest('DELETE_PRODUCT', deleteProductSaga);
  yield takeLatest('EDIT_PRODUCT', editProductSaga);
  // Categories
  yield takeLatest('GET_ALL_CATEGORIES', getAllCategoriesSaga);
  yield takeLatest('ADD_CATEGORY', addCategorySaga);
  yield takeLatest('DELETE_CATEGORY', deleteCategorySaga);
  // Users
  yield takeLatest('GET_ALL_USERS', getAllUsersSaga);
  yield takeLatest('ADD_USER', addUserSaga);
  yield takeLatest('DELETE_USER', deleteUserSaga);
  // Customers
  yield takeLatest('GET_ALL_CUSTOMERS', getAllCustomersSaga);
  yield takeLatest('ADD_CUSTOMER', addCustomerSaga);
  yield takeLatest('DELETE_CUSTOMER', deleteCustomerSaga);
  // Orders
  yield takeLatest('GET_ALL_ORDERS', getAllOrderssSaga);
  yield takeLatest('ADD_ORDER', addOrderSaga);
  yield takeLatest('DELETE_ORDER', deleteOrderSaga);
  // Order Details
  yield takeLatest('GET_ORDER_DETAILS_BY_ID', getOrderDetailsByIdSaga);
  // Settings
  yield takeLatest('SET_SETTINGS', setSettings);
  yield takeLatest('GET_SETTINGS', getSettings);
}

export default mySaga;
