import {
  LOADING_PRODUCTS,
  GET_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_PRODUCT_BY_CATEGORY_FAILURE,
} from './constants';

const initialState = {
  products: null,
  errors: null,
  loading: false,
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_CATEGORY_SUCCESS:
      return { ...state, products: action.payload };
    case GET_PRODUCT_BY_CATEGORY_FAILURE:
      return { ...state, errors: action.payload };
    case LOADING_PRODUCTS:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
