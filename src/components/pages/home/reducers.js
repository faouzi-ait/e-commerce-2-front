import * as cons from './constants';

const initialState = {
  products: null,
  errors: null,
  loading: false,
};

export const home_page_products = (state = initialState, action) => {
  switch (action.type) {
    case cons.GET_HOME_PAGE_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case cons.GET_HOME_PAGE_PRODUCTS_FAILURE:
      return { ...state, errors: action.payload };
    case cons.LOADING_PRODUCTS:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
