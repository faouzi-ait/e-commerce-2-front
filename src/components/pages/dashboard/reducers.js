import * as cons from './constants';

const initialState = {
  user: null,
  errors: null,
  loading: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case cons.LOADING_DETAILS:
      return { ...state, loading: action.payload };
    case cons.GET_USER_DETAILS_SUCCESS:
      return { ...state, user: action.payload };
    case cons.GET_USER_DETAILS_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};
