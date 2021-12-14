import * as cons from './constants';

export const getProducts = (payload) => {
  return { type: cons.GET_PRODUCT_BY_CATEGORY, payload };
};

export const getProductSuccess = (payload) => {
  return { type: cons.GET_PRODUCT_BY_CATEGORY_SUCCESS, payload };
};

export const getProductFailure = (payload) => {
  return { type: cons.GET_PRODUCT_BY_CATEGORY_FAILURE, payload };
};

export const loadingProducts = (payload) => {
  return { type: cons.LOADING_PRODUCTS, payload };
};

export const getCategory = (payload) => {
  return { type: cons.GET_CATEGORY, payload };
};
export const switchLayout = () => {
  return { type: cons.SWITCH_LAYOUT };
};
