import { call, takeEvery, put } from 'redux-saga/effects';
import { fetchCategories } from '../../../api/apiCalls';

import * as act from './actions';

import { GET_CATEGORIES } from './constants';

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

export function* getCategoriesSaga() {
  yield takeEvery(GET_CATEGORIES, getCategories);
}
