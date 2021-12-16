import * as cons from './constants';

const categoryInitialState = {
  categories: null,
  errors: null,
  loading: false,
};

const searchInitialState = {
  searchResults: null,
  errors: null,
  loading: false,
};

export const language = (state = 'en-us', action) => {
  switch (action.type) {
    case cons.SET_LANGUAGE:
      return action.lang;
    default:
      return state;
  }
};

export const categories = (state = categoryInitialState, action) => {
  switch (action.type) {
    case cons.GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case cons.GET_CATEGORIES_FAILURE:
      return { ...state, errors: action.payload };
    case cons.GETTING_CATEGORIES:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export const productsBySearch = (state = searchInitialState, action) => {
  switch (action.type) {
    case cons.GET_SEARCH_RESULTS_SUCCESS:
      return { ...state, searchResults: action.payload };
    case cons.GET_SEARCH_RESULTS_FAILURE:
      return { ...state, errors: action.payload };
    case cons.LOADING_SEARCH:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
