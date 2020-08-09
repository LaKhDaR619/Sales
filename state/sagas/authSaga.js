import {put, call} from 'redux-saga/effects';

import {storeString} from '../../BL/localStorage';
import {getString, remove} from '../../BL/localStorage';
import {getUserById} from '../../BL/dbRequests';

import {encrypt, compare, decrypt} from '../../BL/myCrypt';

export function* userLogin(action) {
  yield put({type: 'SET_AUTH_LOADING'});
  const {userName, password} = action.payload;

  let errorMessage = '';

  const newAction = yield call(async () => {
    try {
      if (!userName || !password)
        return {
          type: 'LOGIN_FAILED',
          payload: {
            errorMessage: 'User Name and Password Fields Must not be Empty',
          },
        };

      const user = await getUserById(userName);
      const hashedPass = user.PWD;
      const result = await compare(password, hashedPass);

      if (result) {
        const payload = {
          userName: user.ID,
          fullName: user.FullName,
          userType: user.UserType,
        };

        const hashedUserName = await encrypt(user.ID);

        // storing the hashed user in asyncStorage
        await storeString('auth', hashedUserName);

        return {type: 'LOGIN_SUCCESS', payload};
      } else {
        return {
          type: 'LOGIN_FAILED',
          payload: {
            errorMessage: 'Invalid User Name or Password!',
          },
        };
      }
    } catch (error) {
      errorMessage = 'Invalid User Name or Password!';
      console.log(error.message);
      return {
        type: 'LOGIN_FAILED',
        payload: {
          errorMessage,
        },
      };
    }
  });

  yield put(newAction);
}

export function* getUserDataAndLogin() {
  yield put({type: 'SET_AUTH_LOADING'});
  let errorMessage = '';

  const newAction = yield call(async () => {
    try {
      const hashedUserName = await getString('auth');

      const userName = await decrypt(hashedUserName);

      const user = await getUserById(userName);

      const payload = {
        userName: user.ID,
        fullName: user.FullName,
        userType: user.UserType,
      };

      return {type: 'LOGIN_SUCCESS', payload};
    } catch (error) {
      console.log(error.message);
      return {type: 'LOGIN_FAILED', payload: {errorMessage}};
    }
  });

  yield put(newAction);
}

export function* userLogout() {
  yield put({type: 'SET_AUTH_LOADING'});
  const removed = yield call(async () => {
    const data = await remove('auth');

    return data;
  });

  if (removed) return yield put({type: 'USER_LOGOUT_SUCCESS'});
  else return yield put({type: 'USER_LOGOUT_FAILED'});
}
