import { call, takeEvery, put, delay, select } from 'redux-saga/effects';
import { login } from '../../../api/apiCalls';

import * as actions from './actions';

import { LOGIN_USER, LOGOUT_USER } from './constants';

const fromPaymentLink = (state) => state?.login;

export function* authentication({ payload }) {
  yield put(actions.setIsAuthenticating(true));
  yield put(actions.setAuthenticationError(null));

  const result = yield call(login, payload);

  if (result.error) {
    const { data, status } = result.error.response;
    yield put(actions.setAuthenticationError({ data, status }));
    yield put(actions.setIsAuthenticating(false));
    yield delay(4000);
    yield put(actions.setAuthenticationError(null));
  } else {
    const { token, refreshToken } = result.data;
    const redirect = yield select(fromPaymentLink);

    yield put(actions.setTokens({ token, refreshToken }));
    yield put(actions.setIsUserAuthenticated(true));

    if (redirect.fromPaymentLink) {
      window.location.href = '/payment';
    } else {
      window.location.href = '/dashboard';
    }
  }
  yield put(actions.setIsAuthenticating(false));
}

export function* logout() {
  yield put(actions.setTokens({}));
  yield put(actions.updateUserInfoAction({ isLoaded: false }));
  yield put(actions.setIsUserAuthenticated(false));
  window.location.href = '/';
}

export function* authenticateSaga() {
  yield takeEvery(LOGIN_USER, authentication);
  yield takeEvery(LOGOUT_USER, logout);
}
