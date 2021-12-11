import { createSelector } from 'reselect';

const loginState = (state) => state.login;

export const loginStatus = createSelector(
  [loginState],
  ({ loggedIn }) => loggedIn
);
