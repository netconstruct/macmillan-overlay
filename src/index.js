import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootReducer from 'reducers';
import { justgivingMiddleware, notificationsMiddleware } from 'middleware';
import rootSaga from 'sagas';

import { App } from 'components';
import './index.css';

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware,
  justgivingMiddleware,
  notificationsMiddleware,
  loggerMiddleware,
  sagaMiddleware,
);

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
