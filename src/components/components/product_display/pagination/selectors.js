import { createSelector } from 'reselect';

const searchData = (state) => state?.search;

export const searchSelector = createSelector([searchData], (data) => data);
