import {
  LOADING_RELATED_PRODUCTS,
  GET_RELATED_PRODUCT_SUCCESS,
  GET_RELATED_PRODUCT_FAILURE,
} from './constants';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export const relatedProducts = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_RELATED_PRODUCTS:
      return { ...state, loading: action.payload };
    case GET_RELATED_PRODUCT_SUCCESS:
      return { ...state, data: action.payload };
    case GET_RELATED_PRODUCT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
