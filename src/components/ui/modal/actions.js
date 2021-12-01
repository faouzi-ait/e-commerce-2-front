import {
  LOADING_RELATED_PRODUCTS,
  GET_RELATED_PRODUCT,
  GET_RELATED_PRODUCT_SUCCESS,
  GET_RELATED_PRODUCT_FAILURE,
} from './constants';

export const loadingProducts = (payload) => {
  return { type: LOADING_RELATED_PRODUCTS, payload };
};

export const getRelatedProducts = (payload) => {
  return { type: GET_RELATED_PRODUCT, payload };
};

export const getRelatedProductSuccess = (payload) => {
  return { type: GET_RELATED_PRODUCT_SUCCESS, payload };
};

export const getRelatedProductFailure = (payload) => {
  return { type: GET_RELATED_PRODUCT_FAILURE, payload };
};
