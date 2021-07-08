import {
  LOADING_PRODUCTS,
  GET_HOME_PAGE_PRODUCTS,
  GET_HOME_PAGE_PRODUCTS_SUCCESS,
  GET_HOME_PAGE_PRODUCTS_FAILURE,
} from './constants';

export const getHomePageProducts = (payload) => {
  return { type: GET_HOME_PAGE_PRODUCTS, payload };
};

export const getHomePageProductSuccess = (payload) => {
  return { type: GET_HOME_PAGE_PRODUCTS_SUCCESS, payload };
};

export const getHomePageProductFailure = (payload) => {
  return { type: GET_HOME_PAGE_PRODUCTS_FAILURE, payload };
};

export const loadingHomePageProducts = (payload) => {
  return { type: LOADING_PRODUCTS, payload };
};
