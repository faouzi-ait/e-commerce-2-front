import * as cons from './constants';

export const addOne = (payload) => {
  return { type: cons.ADD_ONE, payload };
};

export const addItem = (payload) => {
  return { type: cons.ADD_ITEM, payload };
};

export const removeOne = (payload) => {
  return { type: cons.REMOVE_ONE, payload };
};

export const removeItem = (payload) => {
  return { type: cons.REMOVE_ITEM, payload };
};

export const emptyBasket = (payload) => {
  return { type: cons.EMPTY_BASKET, payload };
};
