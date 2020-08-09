import {put, call} from 'redux-saga/effects';
import {storeObject, getObject} from '../../BL/localStorage';

export function* setSettings(action) {
  yield put({type: 'SET_SETTINGS_LOADING'});

  const newAction = yield call(async () => {
    try {
      await storeObject('settings', action.payload);

      return {
        type: 'SET_SETTINGS_SUCCESS',
        payload: action.payload,
      };
    } catch (error) {
      console.log(error.message);
      return {type: 'SET_SETTINGS_FAILED'};
    }
  });

  yield put(newAction);
}

export function* getSettings(action) {
  yield put({type: 'SET_SETTINGS_LOADING'});

  const newAction = yield call(async () => {
    try {
      let data = await getObject('settings');

      // if there is no stored data
      // it means we didn't store before
      if (!data) {
        data = {lang: 'ar', useAnimation: false};
        await storeObject('settings', data);
      }

      return {
        type: 'GET_SETTINGS_SUCCESS',
        payload: data,
      };
    } catch (error) {
      console.log(error.message);
      return {type: 'GET_SETTINGS_FAILED'};
    }
  });

  yield put(newAction);
}
