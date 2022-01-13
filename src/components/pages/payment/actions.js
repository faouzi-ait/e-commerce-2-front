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
