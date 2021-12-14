import * as cons from './constants';

export const register_user = (payload) => {
  return { type: cons.REGISTER_USER, payload };
};

export const register_user_success = (payload) => {
  return { type: cons.REGISTER_USER_SUCCESS, payload };
};

export const register_user_failure = (payload) => {
  return { type: cons.REGISTER_USER_FAILURE, payload };
};

export const registering = (payload) => {
  return { type: cons.REGISTERING, payload };
};
