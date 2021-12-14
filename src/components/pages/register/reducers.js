import * as cons from './constants';

const initialState = {
  user: null,
  errors: null,
  registering: false,
};

export const register = (state = initialState, action) => {
  switch (action.type) {
    case cons.REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload };
    case cons.REGISTER_USER_FAILURE:
      return { ...state, errors: action.payload };
    case cons.REGISTERING:
      return { ...state, registering: action.payload };
    default:
      return state;
  }
};
