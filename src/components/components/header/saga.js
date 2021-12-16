import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchCategories, searchByTerms } from '../../../api/apiCalls';

import * as act from './actions';

import { GET_CATEGORIES, GET_SEARCH_RESULTS } from './constants';

export function* getCategories({ payload }) {
  yield put(act.gettingCategories(true));
  yield put(act.getCategoriesFailure(null));

  const result = yield call(fetchCategories, payload);
  if (result.error) {
    yield put(act.gettingCategories(false));
    const { data, status } = result.error.response;
    yield put(act.getCategoriesFailure({ data, status }));
  } else {
    yield put(act.getCategoriesSuccess(result.data));
    yield put(act.gettingCategories(false));
  }
  yield put(act.gettingCategories(false));
}

export function* searchProducts({ payload }) {
  yield put(act.loadingSearch(true));
  yield put(act.getSearchFailure(null));

  const result = yield call(searchByTerms, payload);
  if (result.error) {
    yield put(act.loadingSearch(false));
    const { data, status } = result.error.response;
    yield put(act.getSearchFailure({ data, status }));
  } else {
    yield put(act.getSearchSuccess(result.data));
    yield put(act.loadingSearch(false));
  }
  yield put(act.loadingSearch(false));
}

export function* getCategoriesSaga() {
  yield takeEvery(GET_CATEGORIES, getCategories);
}

export function* searchProductsSaga() {
  yield takeEvery(GET_SEARCH_RESULTS, searchProducts);
}
