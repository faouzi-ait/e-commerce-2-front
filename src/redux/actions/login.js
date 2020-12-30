import {
  LOGIN_USER,
  LOGOUT_USER,
  LOGIN_USER_FAILURE,
  UPDATE_USER_INFO,
  IS_AUTHENTICATED,
  SET_IS_AUTHENTICATING,
} from '../types';

export const login_user_action = (payload) => {
  return { type: LOGIN_USER, payload };
};

export const setAuthenticationError = (payload) => {
  return { type: LOGIN_USER_FAILURE, payload };
};

export const logout = () => {
  return { type: LOGOUT_USER };
};

export const updateUserInfoAction = (payload) => {
  return {
    type: UPDATE_USER_INFO,
    payload,
  };
};

export const setIsAuthenticating = (payload) => {
  return { type: SET_IS_AUTHENTICATING, payload };
};

export const setIsUserAuthenticated = (payload) => {
  return { type: IS_AUTHENTICATED, payload };
};
