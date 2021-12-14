import * as cons from './constants';

const initialState = {
  products: null,
  category: null,
  errors: null,
  loading: false,
  isRow: true,
};

export const products = (state = initialState, action) => {
  switch (action.type) {
    case cons.GET_PRODUCT_BY_CATEGORY_SUCCESS:
      return { ...state, products: action.payload };
    case cons.GET_PRODUCT_BY_CATEGORY_FAILURE:
      return { ...state, errors: action.payload };
    case cons.LOADING_PRODUCTS:
      return { ...state, loading: action.payload };
    case cons.GET_CATEGORY:
      return { ...state, category: action.payload };
    case cons.SWITCH_LAYOUT:
      const layout = state.isRow;
      return { ...state, isRow: !layout };
    default:
      return state;
  }
};
