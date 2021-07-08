import { createSelector } from 'reselect';

const baseState = (state) => state;

export const homeProductItems = createSelector(
  [baseState],
  (state) => state?.home_page_products?.products
);
