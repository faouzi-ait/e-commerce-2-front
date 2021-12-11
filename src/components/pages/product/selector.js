import { createSelector } from 'reselect';

const productStates = (state) => state;

export const productData = createSelector([productStates], (state) => state?.products);
