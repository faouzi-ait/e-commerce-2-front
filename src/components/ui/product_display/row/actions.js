import {
  ADD_ITEM,
  ADD_ONE,
  REMOVE_ONE,
  REMOVE_ITEM,
  EMPTY_BASKET,
} from './constants';

export const addOne = (payload) => {
  return { type: ADD_ONE, payload };
};

export const addItem = (payload) => {
  return { type: ADD_ITEM, payload };
};

export const removeOne = (payload) => {
  return { type: REMOVE_ONE, payload };
};

export const removeItem = (payload) => {
  return { type: REMOVE_ITEM, payload };
};

export const emptyBasket = (payload) => {
  return { type: EMPTY_BASKET, payload };
};
