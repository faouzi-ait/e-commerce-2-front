import { createSelector } from 'reselect';

const registrationStates = (state) => state.register;

export const registration = createSelector([registrationStates], (data) => data);
