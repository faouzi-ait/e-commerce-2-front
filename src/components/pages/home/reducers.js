import {
  LOADING_PRODUCTS,
  GET_HOME_PAGE_PRODUCTS_SUCCESS,
  GET_HOME_PAGE_PRODUCTS_FAILURE,
} from './constants';

const initialState = {
  products: null,
  errors: null,
  loading: false,
};

export const home_page_products = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOME_PAGE_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case GET_HOME_PAGE_PRODUCTS_FAILURE:
      return { ...state, errors: action.payload };
    case LOADING_PRODUCTS:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
