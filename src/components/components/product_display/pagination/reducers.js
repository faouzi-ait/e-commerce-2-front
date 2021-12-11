import {
  DEFAULT_URL,
  FILTER_URL,
  RATING,
  BRAND,
  LIMIT,
  PAGE,
  PRICING,
} from './constants';

const initialState = {
  defaultUrl: null,
  filteredUrl: null,
  rating: "",
  brand: "",
  limit: 8,
  page: 1,
  pricing: '&price[gt]=1',
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_URL:
      return { ...state, defaultUrl: action.payload };
    case FILTER_URL:
      return { ...state, filteredUrl: action.payload };
    case RATING:
      return { ...state, rating: action.payload };
    case BRAND:
      return { ...state, brand: action.payload };
    case LIMIT:
      return { ...state, limit: action.payload };
    case PAGE:
      return { ...state, page: action.payload };
    case PRICING:
      return { ...state, pricing: action.payload };
    default:
      return state;
  }
};