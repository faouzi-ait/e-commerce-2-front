import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTERING,
} from '../types';

export const register_user = (payload) => {
  return { type: REGISTER_USER, payload };
};

export const register_user_success = (payload) => {
  return { type: REGISTER_USER_SUCCESS, payload };
};

export const register_user_failure = (payload) => {
  return { type: REGISTER_USER_FAILURE, payload };
};

export const registering = (payload) => {
  return { type: REGISTERING, payload };
};
