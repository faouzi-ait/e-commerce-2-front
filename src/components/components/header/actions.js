import * as cons from './constants';

// LANGUAGE SELECTION
export const setLanguage = (lang) => {
  return {
    type: cons.SET_LANGUAGE,
    lang,
  };
};

// CATEGORY SELECTION
export const getCategories = (payload) => {
  return { type: cons.GET_CATEGORIES, payload };
};

export const getCategoriesSuccess = (payload) => {
  return { type: cons.GET_CATEGORIES_SUCCESS, payload };
};

export const getCategoriesFailure = (payload) => {
  return { type: cons.GET_CATEGORIES_FAILURE, payload };
};

export const gettingCategories = (payload) => {
  return { type: cons.GETTING_CATEGORIES, payload };
};

// SEARCH SELECTION
export const loadingSearch = (payload) => {
  return { type: cons.LOADING_SEARCH, payload };
};

export const getSearch = (payload) => {
  return { type: cons.GET_SEARCH_RESULTS, payload };
};

export const getSearchString = (payload) => {
  return { type: cons.GET_SEARCH_STRING, payload };
};

export const getSearchSuccess = (payload) => {
  return { type: cons.GET_SEARCH_RESULTS_SUCCESS, payload };
};

export const getSearchFailure = (payload) => {
  return { type: cons.GET_SEARCH_RESULTS_FAILURE, payload };
};
