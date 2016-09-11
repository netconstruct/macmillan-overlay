import { delay } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { NOTIFICATIONS, showNotification } from 'actions';

/** Notification frequency (seconds). */
const NOTIFICATION_FREQUENCY = 10;

/** Show notification after delay. */
function* showNotifications() {
  try {
    yield delay(NOTIFICATION_FREQUENCY * 1000);
    yield put(showNotification());
  } catch (error) {
    return;
  }
}

/** Trigger new action after a notification completes. */
export default function* watchShowNotifications() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take([NOTIFICATIONS.SHOW.SUCCESS, NOTIFICATIONS.SHOW.ERROR]);
    yield call(showNotifications);
  }
}
