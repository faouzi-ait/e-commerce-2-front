import { all } from 'redux-saga/effects';
import { authenticateSaga } from './components/pages/login/saga';
import { getProductsSaga } from './components/pages/product/saga';
import { registerSaga } from './components/pages/register/saga';
import { resendTokenSaga } from './components/components/resend_token/saga';
import {
  getCategoriesSaga,
  searchProductsSaga,
} from './components/components/header/saga';
import { getRelatedProductsSaga } from './components/ui/modal/saga';
import { getHomePageProductSaga } from './components/pages/home/saga';
import { getUserDetailsSaga } from './components/pages/dashboard/saga';
import { forgotPasswordSaga } from './components/components/password-reset/saga';

export function* sagas() {
  yield all([
    registerSaga(),
    getUserDetailsSaga(),
    getProductsSaga(),
    resendTokenSaga(),
    authenticateSaga(),
    getCategoriesSaga(),
    searchProductsSaga(),
    forgotPasswordSaga(),
    getRelatedProductsSaga(),
    getHomePageProductSaga(),
  ]);
}
