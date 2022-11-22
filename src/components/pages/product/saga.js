import { call, takeLatest, put } from 'redux-saga/effects';
import { fetchProducts } from '../../../api/apiCalls';

import * as actions from './actions';

import { GET_PRODUCT_BY_CATEGORY } from './constants';

export function* getProductsByCategory({ payload }) {
  yield put(actions.loadingProducts(true));
  yield put(actions.getProductFailure(null));

  const result = yield call(fetchProducts, payload);
  if (result.error) {
    yield put(actions.loadingProducts(false));
    const { data, status } = result.error.response;
    yield put(actions.getProductFailure({ data, status }));
  } else {
    yield put(actions.getProductSuccess(result.data));
    yield put(actions.loadingProducts(false));
  }
  yield put(actions.loadingProducts(false));
}

export function* getProductsSaga() {
  yield takeLatest(GET_PRODUCT_BY_CATEGORY, getProductsByCategory);
}
