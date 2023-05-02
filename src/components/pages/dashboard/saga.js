import { call, takeLatest, put } from 'redux-saga/effects';
import { fetchUserDetails, fetchUserOrders } from '../../../api/apiCalls';

import * as actions from './actions';

import { GET_USER_DETAILS } from './constants';

export function* getUserDetails(payload) {
  yield put(actions.loadingDetails(true));
  yield put(actions.getUserDetailsFailure(null));

  const userDetails = yield call(fetchUserDetails, payload);
  const orderDetails = yield call(fetchUserOrders, payload);

  if (userDetails.error) {
    yield put(actions.loadingDetails(false));

    const { data, status } = userDetails.error.response;
    yield put(actions.getUserDetailsFailure({ data, status }));
  } else {
    const userData = {
      details: userDetails.data,
      orders: orderDetails.data,
    };

    yield put(actions.getUserDetailsSuccess(userData));
    yield put(actions.loadingDetails(false));
  }
  yield put(actions.loadingDetails(false));
}

export function* getUserDetailsSaga() {
  yield takeLatest(GET_USER_DETAILS, getUserDetails);
}
