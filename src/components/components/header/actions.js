import * as cons from './constants';

export const setLanguage = (lang) => {
  return {
    type: cons.SET_LANGUAGE,
    lang,
  };
};

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
