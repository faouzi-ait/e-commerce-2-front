import { createSelector } from 'reselect';

const theme = (state) => state.theme;

export const selectedTheme = createSelector([theme], (theme) => theme);
