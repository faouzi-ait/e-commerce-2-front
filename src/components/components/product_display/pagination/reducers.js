import * as cons from './constants';

const initialState = {
  defaultUrl: null,
  filteredUrl: null,
  rating: '',
  brand: '',
  limit: 8,
  page: 1,
  pricing: '',
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case cons.DEFAULT_URL:
      return { ...state, defaultUrl: action.payload };
    case cons.FILTER_URL:
      return { ...state, filteredUrl: action.payload };
    case cons.RATING:
      return { ...state, rating: action.payload };
    case cons.BRAND:
      return { ...state, brand: action.payload };
    case cons.LIMIT:
      return { ...state, limit: action.payload };
    case cons.PAGE:
      return { ...state, page: action.payload };
    case cons.PRICING:
      return { ...state, pricing: action.payload };
    default:
      return state;
  }
};
