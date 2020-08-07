const SET_SORT_BY = "SET_SORT_BY";
const SET_CATEGORIES = "SET_CATEGORIES";

export const setActiveSortType = (sort) => ({
  type: SET_SORT_BY,
  payload: sort,
});

export const setCategories = (sort) => ({
  type: SET_CATEGORIES,
  payload: sort,
});
