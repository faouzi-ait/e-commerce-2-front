import { createSelector } from 'reselect';

const searchStates = (state) => state;

export const searchSelector = createSelector(
  [searchStates],
  (state) => state?.productsBySearch
);
