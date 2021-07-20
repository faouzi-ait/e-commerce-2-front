import {
  LOADING_PRODUCTS,
  GET_PRODUCT_BY_CATEGORY_SUCCESS,
  GET_PRODUCT_BY_CATEGORY_FAILURE,
  // GET_CATEGORY,
  SWITCH_LAYOUT,
} from './constants';

const initialState = {
  products: null,
  // categoryId: null,
  errors: null,
  loading: false,
  isRow: false,
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_CATEGORY_SUCCESS:
      return { ...state, products: action.payload };
    case GET_PRODUCT_BY_CATEGORY_FAILURE:
      return { ...state, errors: action.payload };
    case LOADING_PRODUCTS:
      return { ...state, loading: action.payload };
    // case GET_CATEGORY:
    //   return { ...state, categoryId: action.payload };
    case SWITCH_LAYOUT:
      const layout = state.isRow;
      return { ...state, isRow: !layout };
    default:
      return state;
  }
};
