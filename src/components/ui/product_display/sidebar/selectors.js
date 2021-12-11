import { createSelector } from 'reselect';

const productsFilter = (state) => state?.products;

export const searchSelector = createSelector([productsFilter], (data) => data);
