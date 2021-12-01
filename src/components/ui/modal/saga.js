import { call, takeLatest, put } from 'redux-saga/effects';
import { fetchRelatedProducts } from '../../../api/apiCalls';

import {
  loadingProducts,
  getRelatedProductSuccess,
  getRelatedProductFailure,
} from './actions';

import { GET_RELATED_PRODUCT } from './constants';

export function* getRelatedProduct({ payload }) {
  yield put(loadingProducts(true));
  yield put(getRelatedProductFailure(null));

  const result = yield call(fetchRelatedProducts, payload);
  if (result.error) {
    yield put(loadingProducts(false));
    const { data, status } = result.error.response;
    yield put(getRelatedProductFailure({ data, status }));
  } else {
    yield put(getRelatedProductSuccess(result.data));
    yield put(loadingProducts(false));
  }
  yield put(loadingProducts(false));
}

export function* getRelatedProductsSaga() {
  yield takeLatest(GET_RELATED_PRODUCT, getRelatedProduct);
}
