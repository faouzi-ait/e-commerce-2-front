import { createSelector } from 'reselect';

const basketData = (state) => state?.basket;
const productData = (state) => state?.products;
const relatedProduct = (state) => state?.relatedProducts;

export const basketSelector = createSelector([basketData], (data) => data);
export const productSelector = createSelector([productData], (data) => data);
export const relatedProductSelector = createSelector(
  [relatedProduct],
  (data) => data
);
