import { delay } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import { DONATIONS, fetchDonations } from 'actions';

/** Poll frequency (seconds). */
const POLL_FREQUENCY = 30;

/** Fetch donations after polling delay. */
function* pollDonations() {
  try {
    yield delay(POLL_FREQUENCY * 1000);
    yield put(fetchDonations());
  } catch (error) {
    return;
  }
}

/** Trigger new action after a fetch completes. */
export default function* watchPollDonations() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take([DONATIONS.FETCH.SUCCESS, DONATIONS.FETCH.ERROR]);
    yield call(pollDonations);
  }
}
