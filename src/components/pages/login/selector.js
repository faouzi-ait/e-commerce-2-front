import { createSelector } from 'reselect';

const loginData = (state) => state.login;

export const loginStatus = createSelector([loginData], (data) => data);
