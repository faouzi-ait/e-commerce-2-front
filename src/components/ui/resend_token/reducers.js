import { RESEND_TOKEN_SUCCESS, RESEND_TOKEN_FAILURE } from './constants';

const initialState = {
  result: null,
  error: null,
};

export const tokenRequest = (state = initialState, action) => {
  switch (action.type) {
    case RESEND_TOKEN_SUCCESS:
      return {
        result: { ...action.payload },
      };
    case RESEND_TOKEN_FAILURE:
      return {
        error: { ...action.payload },
      };
    default:
      return state;
  }
};
