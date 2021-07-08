import { call, takeLatest,put } from 'redux-saga/effects';
import { fetchProducts } from '../../../api/apiCalls';

import {
  loadingProducts,
  getProductSuccess,
  getProductFailure,
} from './actions';

import { GET_PRODUCT_BY_CATEGORY } from './constants';

export function* getProductsByCategory({ payload }) {
  yield put(loadingProducts(true));
  yield put(getProductFailure(null));

  const result = yield call(fetchProducts, payload);
  if (result.error) {
    yield put(loadingProducts(false));
    const { data, status } = result.error.response;
    yield put(getProductFailure({ data, status }));
  } else {
    yield put(getProductSuccess(result.data));
    yield put(loadingProducts(false));
  }
  yield put(loadingProducts(false));
}

export function* getProductsSaga() {
  yield takeLatest(GET_PRODUCT_BY_CATEGORY, getProductsByCategory);
}
