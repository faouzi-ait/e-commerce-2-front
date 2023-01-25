import * as cons from './constants';

const basketState = {
  cart: [],
};

export const basket = (state = basketState, action) => {
  switch (action.type) {
    case cons.ADD_ITEM: {
      const basket = [...state.cart];
      basket.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      return { ...state, cart: basket };
    }
    case cons.REMOVE_ITEM: {
      const basket = [...state.cart];
      const filteredBasket = basket.filter(
        (item) => item._id !== action.payload
      );

      return {
        ...state,
        cart: filteredBasket,
      };
    }
    case cons.ADD_ONE: {
      const basket = [...state.cart];
      let item = basket.find((item) => item._id === action.payload);
      let indexOfItem = basket.indexOf(item);

      item.quantity = item.quantity + 1;
      item.total = item.quantity * item.price;
      basket.splice(indexOfItem, 1, item);

      return { ...state, cart: basket };
    }
    case cons.REMOVE_ONE: {
      let basket = [...state.cart];
      const itemToUpdate = basket.find((item) => item._id === action.payload);
      let indexToRemove = basket.indexOf(itemToUpdate);

      if (itemToUpdate.quantity >= 1) {
        itemToUpdate.quantity = itemToUpdate.quantity - 1;
        itemToUpdate.total = itemToUpdate.quantity * itemToUpdate.price;
        basket.splice(indexToRemove, 1, itemToUpdate);
      }

      if (itemToUpdate.quantity === 0) {
        basket = basket.filter((item) => item._id !== action.payload);
      }

      return { ...state, cart: basket };
    }
    case cons.EMPTY_BASKET: {
      return {...state, cart: []}
    }
    default:
      return state;
  }
};
