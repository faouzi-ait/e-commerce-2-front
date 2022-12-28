import * as cons from './constants';

const initialState = {
  step: 1,
  billing: {},
  delivery: {},
  copyBillingInfo: false,
  existingBillingDetails: false,
};

export const billing = (state = initialState, action) => {
  switch (action.type) {
    case cons.CURRENT_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case cons.SAVE_BILLING_DETAILS:
      return {
        ...state,
        billing: action.payload,
      };
    case cons.SAVE_DELIVERY_DETAILS:
      return {
        ...state,
        delivery: action.payload,
      };
    case cons.COPY_BILLING_DETAILS:
      return {
        ...state,
        copyBillingInfo: action.payload,
      };
    case cons.EXISTING_BILLING_DETAILS:
      return {
        ...state,
        existingBillingDetails: action.payload,
      };
    case cons.CLEAR_STEP_1_FORM:
      return {
        ...state,
        billing: action.payload,
      };
    default:
      return state;
  }
};
