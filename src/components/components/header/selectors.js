import { createSelector } from 'reselect';

const states = (state) => state;

export const selectedLanguage = createSelector(
  [states],
  ({ language }) => language
);

export const basketSelector = createSelector(
  [states],
  ({ basket }) => basket?.cart
);
