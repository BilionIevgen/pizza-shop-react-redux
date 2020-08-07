export const SET_ITEMS = "SET_ITEMS";
export const CLEAR_CART = "CLEAR_CART";
export const DELETE_PIZZA_BLOCK = "DELETE_PIZZA_BLOCK";
export const PLUS_PIZZA = "PLUS_PIZZA";
export const MINUS_PIZZA = "MINUS_PIZZA";

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      // создаем для каждого id массив элементов

      const currentItemArray =
        state.items[action.payload.id] !== undefined
          ? [...state.items[action.payload.id].items, action.payload]
          : [action.payload];

      const newItems = {
        ...state.items,

        [action.payload.id]: {
          items: currentItemArray,
          // getting array of keys[0,1,2]
          totalPrice: Object.keys(currentItemArray).reduce((prev, init) => {
            return currentItemArray.reduce(
              (prev, init) => prev + init.price,
              0
            );
          }, 0),
        },
      };

      return {
        ...state,
        items: newItems,

        totalPrice: Object.keys(newItems).reduce(
          (prev, init) =>
            prev +
            newItems[init].items.reduce((prev, init) => prev + init.price, 0),
          0
        ),

        totalCount: Object.keys(newItems).reduce(
          (prev, init) =>
            prev + newItems[init].items.reduce((prev, init) => prev + 1, 0),
          0
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };

    case MINUS_PIZZA:
      const old = state.items[action.payload].items;
      const newMinusArr = old.length > 1 ? old.slice(1) : old;

      const newPrice = state.totalPrice - old[action.payload].price;
      const newCount = state.totalCount - 1;
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: newMinusArr,

            totalPrice:
              state.items[action.payload].totalPrice -
              old[action.payload].price,
          },
        },

        totalPrice: newPrice,

        totalCount: newCount,
      };

    case PLUS_PIZZA:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload]: {
            items: [
              ...state.items[action.payload].items,
              state.items[action.payload].items[action.payload],
            ],
            totalPrice:
              state.items[action.payload].totalPrice +
              state.items[action.payload].items[action.payload].price,
          },
        },
        totalPrice:
          state.totalPrice +
          state.items[action.payload].items[action.payload].price,

        totalCount: state.totalCount + 1,
      };

    case DELETE_PIZZA_BLOCK:
      const newPizzas = Object.fromEntries(
        Object.entries(state.items).filter((i) => i[0] != action.payload)
      );
      const currentTotalPrice = state.items[action.payload].totalPrice;
      const currentTotalCount = state.items[action.payload].items.length;

      return {
        ...state,
        items: newPizzas,
        totalPrice: state.totalPrice - currentTotalPrice,

        totalCount: state.totalCount - currentTotalCount,
      };
    default:
      return state;
  }
};

export default cart;
