import {put, call} from 'redux-saga/effects';
import {
  getAllCustomers,
  addCustomer,
  deleteCustomer,
} from '../../BL/dbRequests';
import {Alert, Animated} from 'react-native';

const animation = (val, toval, dur, cb) => {
  return Animated.timing(val, {
    toValue: toval,
    duration: dur,
    useNativeDriver: true,
  }).start(cb);
};

export function* getAllCustomersSaga(action) {
  yield put({type: 'SET_CUSTOMERS_LOADING'});

  const newAction = yield call(async () => {
    try {
      const data = await getAllCustomers();

      const finalCustomers = data.map(element => {
        // duplicationg some values for item picker and adding the animation value
        element = {
          ...element,
          xAnimVal: new Animated.Value(0),
          id: element.ID_CUSTOMER,
          name: `${element.FIRST_NAME} ${element.LAST_NAME}`,
        };
        return element;
      });

      return {
        type: 'GET_CUSTOMERS_SUCCESS',
        payload: {customers: finalCustomers},
      };
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Getting Customers');
      return {type: 'GET_CUSTOMERS_FAILED'};
    }
  });

  yield put(newAction);
}

export function* addCustomerSaga(action) {
  const {customers, firstName, lastName, tel, email} = action.payload;
  const newAction = yield call(async () => {
    try {
      const insertId = await addCustomer(action.payload);

      const newData = [
        {
          ID_CUSTOMER: insertId,
          FIRST_NAME: firstName,
          LAST_NAME: lastName,
          TEL: tel,
          email: email,
          IMAGE_CUSTOMER: null,
          xAnimVal: new Animated.Value(0),
        },
        ...customers,
      ];

      Alert.alert(`${firstName} Added Successfully`);
      return {type: 'ADD_CUSTOMER_SUCCESS', payload: {customers: newData}};
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Adding This Customer');
      return {type: 'ADD_CUSTOMER_FAILED'};
    }
  });

  yield put(newAction);
}

export function* deleteCustomerSaga(action) {
  const {customers, id, index} = action.payload;

  const newAction = yield call(async () => {
    try {
      const rowsAffected = await deleteCustomer(id);

      if (rowsAffected) {
        // awaiting the animation with a promise
        return await new Promise((resolve, reject) => {
          animation(customers[index].xAnimVal, -450, 500, () => {
            // deleting from the list after the animation is over
            const newData = [...customers];
            newData.splice(index, 1);
            resolve({
              type: 'DELETE_CUSTOMER_SUCCESS',
              payload: {customers: newData},
            });
          });
        });
      } else {
        Alert.alert('There was a Problem Deleting This Customer');
        return {type: 'DELETE_CUSTOMER_FAILED'};
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Deleting This Customer');
      return {type: 'DELETE_CUSTOMER_FAILED'};
    }
  });

  yield put(newAction);
}
