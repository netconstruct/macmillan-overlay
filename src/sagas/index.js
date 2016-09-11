import { fork } from 'redux-saga/effects';
import donations from './donations';
import notifications from './notifications';

export default function* rootSaga() {
  yield [
    fork(donations),
    fork(notifications),
  ];
}
