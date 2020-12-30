import { call, takeEvery, put, delay } from 'redux-saga/effects';
import { register } from '../../api/apiCalls';

import {
  register_user_success,
  register_user_failure,
  registering,
} from '../actions/register';

import { REGISTER_USER } from '../types';

export function* user_registration({ payload }) {
  yield put(registering(true));
  yield put(register_user_failure(null));

  const result = yield call(register, payload);

  if (result.error) {
    yield put(registering(false));
    const { data, status } = result.error.response;
    yield put(register_user_failure({ data, status }));
    yield delay(4000);
    yield put(register_user_failure(null));
  } else {
    yield put(register_user_success(result.data));
    yield delay(4000);
    yield put(register_user_success(null));
    // localStorage.setItem('CURRENT_USER', JSON.stringify(result.data.token));
    // window.location.href = '/dashboard';
  }
  yield put(registering(false));
}

export function* registerSaga() {
  yield takeEvery(REGISTER_USER, user_registration);
}
