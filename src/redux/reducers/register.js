import {
  REGISTERING,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../types';

const initialState = {
  user: null,
  errors: null,
  registering: false,
};

export const register = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload };
    case REGISTER_USER_FAILURE:
      return { ...state, errors: action.payload };
    case REGISTERING:
      return { ...state, registering: action.payload };
    default:
      return state;
  }
};
