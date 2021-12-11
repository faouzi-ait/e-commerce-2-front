import { ADD_ITEM, REMOVE_ITEM, ADD_ONE, REMOVE_ONE } from './constants';

const basketState = {
  cart: [],
};

export const basket = (state = basketState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const newBasket = [...state.cart];
      newBasket.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      return { ...state, cart: newBasket };
    case REMOVE_ITEM:
      const currentBasket = [...state.cart];
      const updatedBasket = currentBasket.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: updatedBasket,
      };
    case ADD_ONE:
      let basket = [...state.cart];
      let item = basket.find((item) => item._id === action.payload);
      let indexOfItem = basket.indexOf(item);

      item.quantity = item.quantity + 1;
      item.total = item.quantity * item.price;
      basket.splice(indexOfItem, 1, item);

      return { ...state, cart: basket };
    case REMOVE_ONE:
      let cart = [...state.cart];
      const itemToUpdate = cart.find((item) => item._id === action.payload);
      let indexToRemove = cart.indexOf(itemToUpdate);

      if (itemToUpdate.quantity >= 1) {
        itemToUpdate.quantity = itemToUpdate.quantity - 1;
        cart.splice(indexToRemove, 1, itemToUpdate);
      }

      if (itemToUpdate.quantity === 0) {
        cart = cart.filter((item) => item._id !== action.payload);
      }

      return { ...state, cart };
    default:
      return state;
  }
};
