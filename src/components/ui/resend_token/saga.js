import { call, takeEvery, put, delay } from 'redux-saga/effects';
import { resendActivationTokenCall } from '../../../api/apiCalls';
import { RESEND_TOKEN } from './constants';

import {
  resendActivationTokenSuccess,
  resendActivationTokenFailure,
} from './actions';

export function* resendToken(payload) {
  const result = yield call(resendActivationTokenCall, payload);

  console.log(result);
  if (result.error) {
    const { data, status } = result.error.response;
    yield put(resendActivationTokenFailure({ data, status }));
    yield delay(4000);
    yield put(resendActivationTokenFailure(null));
  } else {
    console.log('SUCCESS');
    yield put(resendActivationTokenSuccess(result.data));
    yield delay(4000);
    yield put(resendActivationTokenSuccess(null));
  }
}

export function* resendTokenSaga() {
  yield takeEvery(RESEND_TOKEN, resendToken);
}
