import {
  LOADING_PRODUCTS,
  GET_PRODUCT_BY_CATEGORY,
  GET_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_PRODUCT_BY_CATEGORY_FAILURE,
} from './constants';

export const getProducts = (payload) => {
  return { type: GET_PRODUCT_BY_CATEGORY, payload };
};

export const getProductSuccess = (payload) => {
  return { type: GET_PRODUCT_BY_CATEGORY_SUCCESS, payload };
};

export const getProductFailure = (payload) => {
  return { type: GET_PRODUCT_BY_CATEGORY_FAILURE, payload };
};

export const loadingProducts = (payload) => {
  return { type: LOADING_PRODUCTS, payload };
};
