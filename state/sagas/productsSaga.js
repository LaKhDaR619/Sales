import {put, call} from 'redux-saga/effects';
import {
  getAllProducts,
  deleteProduct,
  addProduct,
  getProductById,
  editProduct,
} from '../../BL/dbRequests';
import {Alert, Animated} from 'react-native';

const animation = (val, toval, dur, cb) => {
  return Animated.timing(val, {
    toValue: toval,
    duration: dur,
    useNativeDriver: true,
  }).start(cb);
};

export function* getAllProductsSaga() {
  yield put({type: 'SET_PRODUCTS_LOADING'});

  const newAction = yield call(async () => {
    try {
      const data = await getAllProducts();

      data.map(element => {
        element.xAnimVal = new Animated.Value(0);
        return element;
      });

      return {
        type: 'GET_PRODUCTS_SUCCESS',
        payload: {products: data},
      };
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Getting Products');
      return {type: 'GET_PRODUCTS_FAILED'};
    }
  });

  yield put(newAction);
}

export function* addProductSaga(action) {
  const {products} = action.payload;
  const newAction = yield call(async () => {
    try {
      const insertId = await addProduct(action.payload);
      const newProduct = await getProductById(insertId);

      newProduct.xAnimVal = new Animated.Value(0);

      const newData = [newProduct, ...products];

      Alert.alert(`${newProduct.LABEL_PRODUCT} Added Successfully`);

      return {type: 'ADD_PRODUCT_SUCCESS', payload: {products: newData}};
    } catch (error) {
      console.log(error.message);
      if (
        error.message.startsWith('UNIQUE constraint failed: PRODUCTS.BARCODE')
      )
        Alert.alert('This Barcode already exists on another Product');
      else Alert.alert('There was a Problem Adding This Product');

      return {type: 'ADD_PRODUCT_FAILED'};
    }
  });

  yield put(newAction);
  yield put({type: 'SET_RESET_ADD_ORDER', payload: {reset: true}});
}

export function* deleteProductSaga(action) {
  const {products, id, index} = action.payload;

  const newAction = yield call(async () => {
    try {
      console.log(`deleteProductSaga: ${id}`);
      const rowsAffected = await deleteProduct(id);

      if (rowsAffected) {
        // awaiting the animation with a promise
        return await new Promise((resolve, reject) => {
          animation(products[index].xAnimVal, -450, 500, () => {
            // deleting from the list after the animation is over
            const newData = [...products];
            newData.splice(index, 1);
            resolve({
              type: 'DELETE_PRODUCT_SUCCESS',
              payload: {products: newData},
            });
          });
        });
      } else {
        Alert.alert('There was a Problem Deleting This Product');
        return {type: 'DELETE_PRODUCT_FAILED'};
      }
    } catch (error) {
      console.log(error.message);
      if (error.message.startsWith('FOREIGN KEY')) {
        // TODO translate all the Alerts and Error Messages Here
        Alert.alert(
          `You Can't Delete This Product Because it's in the Orders History`,
        );
      } else Alert.alert('There was a Problem Deleting This Product');
      return {type: 'DELETE_PRODUCT_FAILED'};
    }
  });

  yield put(newAction);
  yield put({type: 'SET_RESET_ADD_ORDER', payload: {reset: true}});
}

export function* editProductSaga(action) {
  const {products, id, index} = action.payload;
  const newAction = yield call(async () => {
    try {
      await editProduct(action.payload);
      const newProduct = await getProductById(id);

      newProduct.xAnimVal = new Animated.Value(0);

      products.splice(index, 1);
      products.splice(index, 0, newProduct);
      const newData = [...products];

      Alert.alert(`${newProduct.LABEL_PRODUCT} Edited Successfully`);
      return {type: 'EDIT_PRODUCT_SUCCESS', payload: {products: newData}};
    } catch (error) {
      console.log(error.message);
      if (
        error.message.startsWith('UNIQUE constraint failed: PRODUCTS.BARCODE')
      )
        Alert.alert('This Barcode already exists on another Product');
      else Alert.alert('There was a Problem Adding This Product');

      return {type: 'EDIT_PRODUCT_FAILED'};
    }
  });

  yield put(newAction);
  yield put({type: 'SET_RESET_ADD_ORDER', payload: {reset: true}});
}
