import { all } from 'redux-saga/effects';
import { authenticateSaga } from './components/pages/login/saga';
import { registerSaga } from './components/pages/register/saga';
import { resendTokenSaga } from './components/ui/resend_token/saga';

export function* sagas() {
  yield all([authenticateSaga(), registerSaga(), resendTokenSaga()]);
}
