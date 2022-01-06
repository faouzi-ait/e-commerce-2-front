import * as cons from './constants';

const initialState = {
  user: null,
  authenticating: false,
  loggedIn: false,
  fromPaymentLink: false,
  errors: null,
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case cons.UPDATE_USER_INFO:
      return {
        user: { ...state.user, ...action.payload },
      };
    case cons.SET_IS_AUTHENTICATING:
      return {
        ...state,
        authenticating: action.payload,
      };
    case cons.IS_AUTHENTICATED:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case cons.LOGIN_USER_FAILURE:
      return {
        ...state,
        errors: action.payload,
      };
    case cons.LOGOUT_USER:
      return {
        ...state,
        user: null,
        authenticating: false,
        loggedIn: false,
        errors: null,
      };
    case cons.FROM_PAYMENT_LINK:
      return {
        ...state,
        fromPaymentLink: action.payload,
      };
    default:
      return state;
  }
};
