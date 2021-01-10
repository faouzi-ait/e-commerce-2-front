import { createSelector } from 'reselect';

const language = (state) => state;

export const selectedLanguage = createSelector(
  [language],
  ({ language }) => language
);
