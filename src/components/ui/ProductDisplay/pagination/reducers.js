import { DEFAULT_URL, FILTER_URL, QUERY } from './constants';

const initialState = {
  defaultUrl: '',
  filteredUrl: '',
  query: '',
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case DEFAULT_URL:
      return { ...state, defaultUrl: action.payload };
    case FILTER_URL:
      return { ...state, filteredUrl: action.payload };
    case QUERY:
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
