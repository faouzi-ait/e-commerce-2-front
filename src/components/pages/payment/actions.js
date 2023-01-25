import * as cons from './constants';

export const setStep = (payload) => {
  return { type: cons.CURRENT_STEP, payload };
};

export const setBillingDetails = (payload) => {
  return { type: cons.SAVE_BILLING_DETAILS, payload };
};

export const setDeliveryDetails = (payload) => {
  return { type: cons.SAVE_DELIVERY_DETAILS, payload };
};

export const copyBillingDetails = (payload) => {
  return { type: cons.COPY_BILLING_DETAILS, payload };
};

export const getExistingBillingDetails = (payload) => {
  return { type: cons.EXISTING_BILLING_DETAILS, payload };
};

export const resetStep1Form = (payload) => {
  return { type: cons.CLEAR_STEP_1_FORM, payload };
};

export const saveTransactionId = (payload) => {
  return { type: cons.SAVE_TRANSACTION_ID, payload };
};

