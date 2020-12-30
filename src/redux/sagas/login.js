import { call, takeEvery, put, delay } from 'redux-saga/effects';
import jwt_decode from 'jwt-decode';
import { login } from '../../api/apiCalls';
import {
  updateUserInfoAction,
  setIsUserAuthenticated,
  setIsAuthenticating,
  setAuthenticationError,
} from '../actions/login';
import { LOGIN_USER, LOGOUT_USER } from '../types';

export function* authentication({ payload }) {
  yield put(setIsAuthenticating(true));
  yield put(setAuthenticationError(null));

  const result = yield call(login, payload);

  if (result.error) {
    const { data, status } = result.error.response;
    yield put(setAuthenticationError({ data, status }));
    yield put(setIsAuthenticating(false));
    yield delay(4000);
    yield put(setAuthenticationError(null));
  } else {
    localStorage.setItem('CURRENT_USER', JSON.stringify(result.data.token));
    yield call(decodeUserProfile);
    yield put(setIsUserAuthenticated(true));
    window.location.href = '/dashboard';
  }
  yield put(setIsAuthenticating(false));
}

export function* decodeUserProfile() {
  const user = localStorage.getItem('CURRENT_USER');

  if (user) {
    const token = JSON.parse(user);
    const profile = jwt_decode(token);
    yield put(
      updateUserInfoAction({
        profile,
        isLoaded: true,
      })
    );
  } else {
    yield put(
      updateUserInfoAction({
        isLoaded: true,
      })
    );
  }
}

export function* logout() {
  localStorage.removeItem('CURRENT_USER');
  yield put(
    updateUserInfoAction({
      isLoaded: false,
    })
  );
  yield put(setIsUserAuthenticated(false));
  window.location.href = '/login';
}

export function* authenticateSaga() {
  yield takeEvery(LOGIN_USER, authentication);
  yield takeEvery(LOGOUT_USER, logout);
  //   yield takeEvery(AUTH.FETCH_USER_INFO, fetchUserInfo);
}
