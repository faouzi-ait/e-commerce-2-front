import { call, takeEvery, put, delay } from 'redux-saga/effects';
import { resendActivationTokenCall } from '../../../api/apiCalls';
import { RESEND_TOKEN } from './constants';

import * as act from './actions';

export function* resendToken(payload) {
  const result = yield call(resendActivationTokenCall, payload);

  if (result.error) {
    const { data, status } = result.error.response;
    yield put(act.resendActivationTokenFailure({ data, status }));
    yield delay(4000);
    yield put(act.resendActivationTokenFailure(null));
  } else {
    yield put(act.resendActivationTokenSuccess(result.data));
    yield delay(4000);
    yield put(act.resendActivationTokenSuccess(null));
  }
}

export function* resendTokenSaga() {
  yield takeEvery(RESEND_TOKEN, resendToken);
}
