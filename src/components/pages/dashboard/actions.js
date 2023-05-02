import * as cons from './constants';

export const getUserDetails = (payload) => {
  return { type: cons.GET_USER_DETAILS, payload };
};

export const getUserDetailsSuccess = (payload) => {
  return { type: cons.GET_USER_DETAILS_SUCCESS, payload };
};

export const getUserDetailsFailure = (payload) => {
  return { type: cons.GET_USER_DETAILS_FAILURE, payload };
};

export const loadingDetails = (payload) => {
  return { type: cons.LOADING_DETAILS, payload };
};
