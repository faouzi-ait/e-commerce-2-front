import * as cons from './constants';

const initialState = {
  result: null,
  error: null,
};

export const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case cons.FORGOT_PASSWORD_SUCCESS:
      return {
        result: { ...action.payload },
      };
    case cons.FORGOT_PASSWORD_FAILURE:
      return {
        error: { ...action.payload },
      };
    default:
      return state;
  }
};
