import * as cons from './constants';

export const forgotPasswordToken = (payload) => {
  return { type: cons.FORGOT_PASSWORD, payload };
};

export const forgotPasswordTokenSuccess = (payload) => {
  return { type: cons.FORGOT_PASSWORD_SUCCESS, payload };
};

export const forgotPasswordTokenFailure = (payload) => {
  return { type: cons.FORGOT_PASSWORD_FAILURE, payload };
};
