import { createSelector } from 'reselect';

const basketStates = (state) => state.billing;

export const basketData = createSelector([basketStates], (data) => data);
