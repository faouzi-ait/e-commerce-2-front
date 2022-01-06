import { createSelector } from 'reselect';

const baseState = (state) => state;

export const selectedTheme = createSelector(
  [baseState],
  (state) => state.theme
);

export const catgoriesList = createSelector(
  [baseState],
  (state) => state?.categories?.categories
);
