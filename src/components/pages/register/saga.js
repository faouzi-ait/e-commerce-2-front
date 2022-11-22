import { call, takeEvery, put, delay } from 'redux-saga/effects';
import { register } from '../../../api/apiCalls';

import * as actions from './actions';

import { REGISTER_USER } from './constants';

export function* user_registration({ payload }) {
  yield put(actions.registering(true));
  yield put(actions.register_user_failure(null));

  const result = yield call(register, payload);

  if (result.error) {
    yield put(actions.registering(false));
    const { data, status } = result.error.response;
    yield put(actions.register_user_failure({ data, status }));
    yield delay(2750);
    yield put(actions.register_user_failure(null));
  } else {
    yield put(actions.registering(false));
    yield put(actions.register_user_success(result.data));
    yield delay(2500);
    yield put(actions.register_user_success(null));
    // localStorage.setItem('CURRENT_USER', JSON.stringify(result.data.token));
    // window.location.href = '/dashboard';
  }
  yield put(actions.registering(false));
}

export function* registerSaga() {
  yield takeEvery(REGISTER_USER, user_registration);
}
