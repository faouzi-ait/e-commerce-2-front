import * as cons from './constants';

export const resendActivationToken = (payload) => {
  return { type: cons.RESEND_TOKEN, payload };
};

export const resendActivationTokenSuccess = (payload) => {
  return { type: cons.RESEND_TOKEN_SUCCESS, payload };
};

export const resendActivationTokenFailure = (payload) => {
  return { type: cons.RESEND_TOKEN_FAILURE, payload };
};
