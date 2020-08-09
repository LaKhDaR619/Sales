// TODO IMPORTANT make when adding a product or anything
// you add it to the places related to it
// (like adding a product we should add it's order details)

import {put, call} from 'redux-saga/effects';
import {
  getOrderDetailsById,
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
} from '../../BL/dbRequests';
import {Alert, Animated} from 'react-native';

const animation = (val, toval, dur, cb) => {
  return Animated.timing(val, {
    toValue: toval,
    duration: dur,
    useNativeDriver: true,
  }).start(cb);
};

// orders
export function* getAllOrderssSaga() {
  yield put({type: 'SET_ORDERS_LOADING'});

  const newAction = yield call(async () => {
    try {
      const data = await getAllOrders();

      const newData = data.map(e => {
        return {
          ...e,
          xAnimVal: new Animated.Value(0),
        };
      });

      return {
        type: 'GET_ORDERS_SUCCESS',
        payload: {orders: newData},
      };
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Getting Orders Details');
      return {type: 'GET_ORDERS_FAILED'};
    }
  });

  yield put(newAction);
}

export function* addOrderSaga(action) {
  yield put({type: 'SET_ORDERS_LOADING'});
  const {orders} = action.payload;
  const newAction = yield call(async () => {
    try {
      const insertId = await addOrder(action.payload);
      const newOrder = await getOrderById(insertId);

      newOrder.xAnimVal = new Animated.Value(0);

      const newData = [newOrder, ...orders];

      Alert.alert(`Order Number ${newOrder.ID_ORDER} Added Successfully`);
      return {type: 'ADD_ORDER_SUCCESS', payload: {orders: newData}};
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Adding This Order');

      return {type: 'ADD_ORDER_FAILED'};
    }
  });

  if (newAction.type == 'ADD_ORDER_SUCCESS')
    yield put({type: 'GET_ALL_PRODUCTS'});

  yield put(newAction);
}

export function* deleteOrderSaga(action) {
  const {orders, id, index} = action.payload;

  const newAction = yield call(async () => {
    try {
      const rowsAffected = await deleteOrder(id);

      if (rowsAffected) {
        // awaiting the animation with a promise
        return await new Promise((resolve, reject) => {
          animation(orders[index].xAnimVal, -450, 500, () => {
            // deleting from the list after the animation is over
            const newData = [...orders];
            newData.splice(index, 1);
            resolve({
              type: 'DELETE_ORDER_SUCCESS',
              payload: {orders: newData},
            });
          });
        });
      } else {
        Alert.alert('There was a Problem Deleting This Order');
        return {type: 'DELETE_ORDER_FAILED'};
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Deleting This Order');
      return {type: 'DELETE_ORDER_FAILED'};
    }
  });

  yield put(newAction);
}

// order Details
/*export function* getAllOrdersDetailsSaga() {
  yield put({type: 'SET_ORDERS_LOADING'});

  const newAction = yield call(async () => {
    try {
      const data = await getAllProducts();

      const newData = data.map(e => {
        return {
          errorMessage: '',
          ...e,
          QTE: 1,
          DISCOUNT: 0,
          // Price before discount
          AMOUNT: e.PRICE,
          // Price after discount
          TOTAL_AMOUNT: e.PRICE,
          xAnimVal: new Animated.Value(0),
        };
      });

      return {
        type: 'GET_ORDER_DETAILS_SUCCESS',
        payload: {orderDetails: newData},
      };
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Getting Orders Details');
      return {type: 'GET_ORDER_DETAILS_FAILED'};
    }
  });

  yield put(newAction);
}*/

//GET_ORDER_DETAILS_BY_ID
export function* getOrderDetailsByIdSaga(action) {
  const {orderId} = action.payload;

  yield put({type: 'SET_ORDER_DETAILS_LOADING'});

  const newAction = yield call(async () => {
    try {
      const data = await getOrderDetailsById(orderId);

      const newData = data.map(e => {
        return {
          ...e,
          xAnimVal: new Animated.Value(0),
        };
      });

      return {
        type: 'GET_ORDER_DETAILS_SUCCESS',
        payload: {orderDetails: newData},
      };
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Getting Orders Details');
      return {type: 'GET_ORDER_DETAILS_FAILED'};
    }
  });

  yield put(newAction);
}
