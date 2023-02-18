import { call, takeEvery, put, delay } from 'redux-saga/effects';
import { forgotPassword } from '../../../api/apiCalls';
import { FORGOT_PASSWORD } from './constants';

import * as act from './actions';

export function* forgotPasswordCall({ payload }) {
  const result = yield call(forgotPassword, payload);

  if (result.error) {
    const { data, status } = result.error.response;
    yield put(act.forgotPasswordTokenFailure({ data, status }));
    yield delay(4000);
    yield put(act.forgotPasswordTokenFailure(null));
  } else {
    yield put(act.forgotPasswordTokenSuccess(result.data));
    yield delay(4000);
    yield put(act.forgotPasswordTokenSuccess(null));
  }
}

export function* forgotPasswordSaga() {
  yield takeEvery(FORGOT_PASSWORD, forgotPasswordCall);
}
