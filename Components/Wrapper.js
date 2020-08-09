import React from 'react';
import {StyleSheet} from 'react-native';
import App from '../App';

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';

import rootReducer from '../state/reducers/rootReducer';
import mySaga from '../state/sagas/saga';

import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(mySaga);

const Wrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
