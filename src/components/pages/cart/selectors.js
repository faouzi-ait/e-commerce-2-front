import { createSelector } from 'reselect';

const cartState = (state) => state;

export const cartItems = createSelector(
  [cartState],
  (state) => state?.basket
);
