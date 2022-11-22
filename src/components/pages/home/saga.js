import { fetchHomePageProducts } from '../../../api/apiCalls';
import { call, takeEvery, put } from 'redux-saga/effects';

import { GET_HOME_PAGE_PRODUCTS } from './constants';
import * as action from './actions';

export function* getHomePageProducts() {
  yield put(action.loadingHomePageProducts(true));
  yield put(action.getHomePageProductFailure(null));

  const result = yield call(fetchHomePageProducts);
  if (result.error) {
    yield put(action.loadingHomePageProducts(false));
    const { data, status } = result.error.response;
    yield put(action.getHomePageProductFailure({ data, status }));
  } else {
    yield put(action.getHomePageProductSuccess(result.data));
    yield put(action.loadingHomePageProducts(false));
  }
  yield put(action.loadingHomePageProducts(false));
}

export function* getHomePageProductSaga() {
  yield takeEvery(GET_HOME_PAGE_PRODUCTS, getHomePageProducts);
}
