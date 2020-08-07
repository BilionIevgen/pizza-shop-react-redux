import {
  SET_ITEMS,
  CLEAR_CART,
  DELETE_PIZZA_BLOCK,
  MINUS_PIZZA,
  PLUS_PIZZA,
} from "../reducers/cart";

export const setItemsToCart = (obj) => {
  return { type: SET_ITEMS, payload: obj };
};

export const clearCart = (obj) => {
  return { type: CLEAR_CART };
};

export const deletePizzasBlock = (id) => {
  return { type: DELETE_PIZZA_BLOCK, payload: id };
};

export const plusCartItem = (id) => {
  return { type: PLUS_PIZZA, payload: id };
};

export const minusCartItem = (id) => {
  return { type: MINUS_PIZZA, payload: id };
};
