import {
  LOGIN_USER_FAILURE,
  UPDATE_USER_INFO,
  IS_AUTHENTICATED,
  SET_IS_AUTHENTICATING,
  LOGOUT_USER,
} from '../types';

const initialState = {
  user: null,
  authenticating: false,
  loggedIn: false,
  errors: null,
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        user: { ...state.user, ...action.payload },
      };
    case SET_IS_AUTHENTICATING:
      return {
        ...state,
        authenticating: action.payload,
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        authenticating: false,
        loggedIn: false,
        errors: null,
      };
    default:
      return state;
  }
};
