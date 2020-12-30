import {
  RESEND_TOKEN_FAILURE,
  RESEND_TOKEN,
  RESEND_TOKEN_SUCCESS,
} from '../types';

export const resendActivationToken = (payload) => {
  return { type: RESEND_TOKEN, payload };
};

export const resendActivationTokenSuccess = (payload) => {
  return { type: RESEND_TOKEN_SUCCESS, payload };
};

export const resendActivationTokenFailure = (payload) => {
  return { type: RESEND_TOKEN_FAILURE, payload };
};
