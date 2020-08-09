import {put, call} from 'redux-saga/effects';
import {getAllUsers, addUser, deleteUser} from '../../BL/dbRequests';
import {Alert, Animated} from 'react-native';

import {encrypt} from '../../BL/myCrypt';

const animation = (val, toval, dur, cb) => {
  return Animated.timing(val, {
    toValue: toval,
    duration: dur,
    useNativeDriver: true,
  }).start(cb);
};

export function* getAllUsersSaga(action) {
  yield put({type: 'SET_USERS_LOADING'});

  const newAction = yield call(async () => {
    try {
      const data = await getAllUsers();

      data.map(element => {
        element.xAnimVal = new Animated.Value(0);
        return element;
      });

      return {
        type: 'GET_USERS_SUCCESS',
        payload: {users: data},
      };
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Getting Users');
      return {type: 'GET_USERS_FAILED'};
    }
  });

  yield put(newAction);
}

export function* addUserSaga(action) {
  const {
    users,
    UserName,
    FullName,
    password,
    UserType,
    setInputs,
    setUserType,
  } = action.payload;
  const newAction = yield call(async () => {
    try {
      const hashedPass = await encrypt(password);
      action.payload.hashedPass = hashedPass;

      await addUser(action.payload);

      const newData = [
        {
          ID: UserName,
          FullName,
          PWD: hashedPass,
          UserType,
          xAnimVal: new Animated.Value(0),
        },
        ...users,
      ];

      Alert.alert(`${UserName} Added Successfully`);

      // reseting the inputs
      setInputs({
        userName: '',
        fullName: '',
        pass: '',
        confirmpasss: '',
      });
      setUserType('user');

      return {type: 'ADD_USER_SUCCESS', payload: {users: newData}};
    } catch (error) {
      console.log(error.message);
      if (error.message.startsWith('UNIQUE constraint failed: users.ID'))
        Alert.alert(`The User Name ${UserName} Already Used`);
      else Alert.alert('There was a Problem Adding This User');
      return {type: 'ADD_USER_FAILED'};
    }
  });

  yield put(newAction);
}

export function* deleteUserSaga(action) {
  const {users, id, index} = action.payload;

  const newAction = yield call(async () => {
    try {
      const rowsAffected = await deleteUser(id);

      if (rowsAffected) {
        // awaiting the animation with a promise
        return await new Promise((resolve, reject) => {
          animation(users[index].xAnimVal, -450, 500, () => {
            // deleting from the list after the animation is over
            const newData = [...users];
            newData.splice(index, 1);
            resolve({
              type: 'DELETE_USER_SUCCESS',
              payload: {users: newData},
            });
          });
        });
      } else {
        Alert.alert('There was a Problem Deleting This User');
        return {type: 'DELETE_USER_FAILED'};
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('There was a Problem Deleting This User');
      return {type: 'DELETE_USER_FAILED'};
    }
  });

  yield put(newAction);
}
