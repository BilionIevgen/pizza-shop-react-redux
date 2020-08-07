const SET_SORT_BY = "SET_SORT_BY";
const SET_CATEGORIES = "SET_CATEGORIES";

const initialState = {
  category: null,
  sortBy: "popular",
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};
export default filters;
