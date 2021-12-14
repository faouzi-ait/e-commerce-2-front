import * as cons from './constants';

export const loadingHomePageProducts = (payload) => {
  return { type: cons.LOADING_PRODUCTS, payload };
};

export const getHomePageProducts = (payload) => {
  return { type: cons.GET_HOME_PAGE_PRODUCTS, payload };
};

export const getHomePageProductSuccess = (payload) => {
  return { type: cons.GET_HOME_PAGE_PRODUCTS_SUCCESS, payload };
};

export const getHomePageProductFailure = (payload) => {
  return { type: cons.GET_HOME_PAGE_PRODUCTS_FAILURE, payload };
};
