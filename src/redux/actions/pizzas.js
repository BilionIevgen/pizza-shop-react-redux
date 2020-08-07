import axios from "axios";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_PIZZAS = "SET_PIZZAS";

export const setPizzas = (pizzas) => ({
  type: SET_PIZZAS,
  payload: pizzas,
});

export const setIsLoading = (state) => ({
  type: SET_IS_LOADING,
  payload: state,
});

// thunk-creators

// getting pizzas
export const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .get(
      `/pizzas?${
        category == null ? "" : `category=${category}`
      }&_sort=${sortBy}&_order=desc`
    )
    .then(({ data }) => {
      // sending action in Redux dispatch
      dispatch(setPizzas(data));
      dispatch(setIsLoading(false));
    });
};
