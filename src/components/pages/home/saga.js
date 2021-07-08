import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchHomePageProducts } from '../../../api/apiCalls';

import {
  loadingHomePageProducts,
  getHomePageProductSuccess,
  getHomePageProductFailure,
} from './actions';

import { GET_HOME_PAGE_PRODUCTS } from './constants';

export function* getHomePageProducts({ payload }) {
  yield put(loadingHomePageProducts(true));
  yield put(getHomePageProductFailure(null));

  const result = yield call(fetchHomePageProducts);
  if (result.error) {
    yield put(loadingHomePageProducts(false));
    const { data, status } = result.error.response;
    yield put(getHomePageProductFailure({ data, status }));
  } else {
    yield put(getHomePageProductSuccess(result.data));
    yield put(loadingHomePageProducts(false));
  }
  yield put(loadingHomePageProducts(false));
}

export function* getHomePageProductSaga() {
  yield takeEvery(GET_HOME_PAGE_PRODUCTS, getHomePageProducts);
}
