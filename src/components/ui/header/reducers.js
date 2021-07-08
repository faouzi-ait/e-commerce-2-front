import {
  SET_LANGUAGE,
  GETTING_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from './constants';

const initialState = {
  categories: null,
  errors: null,
  loading: false,
};

export const language = (state = 'en-us', action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.lang;
    default:
      return state;
  }
};

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case GET_CATEGORIES_FAILURE:
      return { ...state, errors: action.payload };
    case GETTING_CATEGORIES:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
