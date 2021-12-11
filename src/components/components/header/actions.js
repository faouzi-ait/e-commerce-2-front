import {
  SET_LANGUAGE,
  GET_CATEGORIES,
  GETTING_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from './constants';

export const setLanguage = (lang) => {
  return {
    type: SET_LANGUAGE,
    lang,
  };
};

export const getCategories = (payload) => {
  return { type: GET_CATEGORIES, payload };
};

export const getCategoriesSuccess = (payload) => {
  return { type: GET_CATEGORIES_SUCCESS, payload };
};

export const getCategoriesFailure = (payload) => {
  return { type: GET_CATEGORIES_FAILURE, payload };
};

export const gettingCategories = (payload) => {
  return { type: GETTING_CATEGORIES, payload };
};
