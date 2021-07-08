import { all } from 'redux-saga/effects';
import { authenticateSaga } from './components/pages/login/saga';
import { getProductsSaga } from './components/pages/submenu/saga';
import { registerSaga } from './components/pages/register/saga';
import { resendTokenSaga } from './components/ui/resend_token/saga';
import { getCategoriesSaga } from './components/ui/header/saga';
import { getHomePageProductSaga } from './components/pages/home/saga';

export function* sagas() {
  yield all([
    authenticateSaga(),
    registerSaga(),
    resendTokenSaga(),
    getCategoriesSaga(),
    getProductsSaga(),
    getHomePageProductSaga(),
  ]);
}
