import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchCategories } from '../../../api/apiCalls';

import {
  gettingCategories,
  getCategoriesSuccess,
  getCategoriesFailure,
} from './actions';

import { GET_CATEGORIES } from './constants';

export function* getCategories({ payload }) {
  yield put(gettingCategories(true));
  yield put(getCategoriesFailure(null));

  const result = yield call(fetchCategories, payload);
  if (result.error) {
    yield put(gettingCategories(false));
    const { data, status } = result.error.response;
    yield put(getCategoriesFailure({ data, status }));
  } else {
    yield put(getCategoriesSuccess(result.data));
    yield put(gettingCategories(false));
  }
  yield put(gettingCategories(false));
}

export function* getCategoriesSaga() {
  yield takeEvery(GET_CATEGORIES, getCategories);
}
