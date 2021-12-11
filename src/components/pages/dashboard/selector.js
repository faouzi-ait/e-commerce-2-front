import { createSelector } from 'reselect';

const user = (state) => state?.login;

export const userProfile = createSelector([user], ({ user }) => user);
