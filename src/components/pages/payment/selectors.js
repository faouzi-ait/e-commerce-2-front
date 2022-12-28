import { createSelector } from 'reselect';

const basketStates = (state) => state.billing;
const basket = (state) => state.basket;

export const basketData = createSelector([basketStates], (data) => data);
export const cartData = createSelector([basket], (data) => data);
