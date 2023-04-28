import { createSelector } from 'reselect';

const billing = (state) => state?.billing;

export const trxBilling = createSelector([billing], (data) => data);
