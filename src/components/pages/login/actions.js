import * as cons from './constants';

export const login = (payload) => {
  return { type: cons.LOGIN_USER, payload };
};

export const logout = () => {
  return { type: cons.LOGOUT_USER };
};

export const setAuthenticationError = (payload) => {
  return { type: cons.LOGIN_USER_FAILURE, payload };
};

export const updateUserInfoAction = (payload) => {
  return {
    type: cons.UPDATE_USER_INFO,
    payload,
  };
};

export const setIsAuthenticating = (payload) => {
  return { type: cons.SET_IS_AUTHENTICATING, payload };
};

export const setIsUserAuthenticated = (payload) => {
  return { type: cons.IS_AUTHENTICATED, payload };
};

export const fromPaymentLink = (payload) => {
  return { type: cons.FROM_PAYMENT_LINK, payload };
};

export const setTokens = (payload) => {
  return { type: cons.SET_TOKENS, payload };
};