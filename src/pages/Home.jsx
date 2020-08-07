import React, { useCallback } from "react";
import { Categories, SortPopup, PizzaBlock } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import ContentLoader from "react-content-loader";

const pizzasCategoriesNames = [
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const sortItems = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавит", type: "alphabet" },
];

const Home = () => {
  const dispatch = useDispatch();
  const { items, category, sortBy, cartItems } = useSelector(
    ({ filters, pizzas, cart }) => ({
      items: pizzas.items,
      category: filters.category,
      sortBy: filters.sortBy,
      cartItems: cart.items,
    })
  );

  // request to server for getting pizzas array and setting it in Redux
  React.useEffect(() => {
    // dispatching thunk creator
    dispatch(fetchPizzas(category, sortBy));
  }, [dispatch, category, sortBy]);

  /*hook useSelector accept callback that accept state and return value from state(it can be multiple)
  const items = useSelector((state) => state.pizzas.items);
  const filters = useSelector((state) => state.filters);
  or like an object
  const { items, filters } = useSelector(({ pizzas, filters }) => ({
    items: pizzas.items,
    filters,
  }));*/

  /* useCallback*/
  const onClickCategory = useCallback(
    (name) => {
      dispatch(setCategories(name));
    },
    [dispatch]
  );
  const isLoading = useSelector((state) => state.pizzas.isLoaded);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickItem={onClickCategory}
          items={pizzasCategoriesNames}
          category={category}
        />
        <SortPopup activeSortType={sortBy} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? /*creating fake array and filling it with fake pizza while sending data */
            Array(6)
              .fill(0)
              .map((item, i) => {
                return (
                  <ContentLoader
                    className="pizza-block"
                    key={i}
                    speed={2}
                    width={280}
                    height={460}
                    viewBox="0 0 280 460"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <circle cx="132" cy="142" r="115" />
                    <rect x="0" y="273" rx="3" ry="3" width="280" height="26" />
                    <rect x="0" y="310" rx="6" ry="6" width="280" height="84" />
                    <rect x="0" y="418" rx="3" ry="3" width="91" height="31" />
                    <rect
                      x="137"
                      y="273"
                      rx="3"
                      ry="3"
                      width="280"
                      height="26"
                    />
                  </ContentLoader>
                );
              })
          : items.map((obj, i) => (
              <PizzaBlock
                addedToCart={cartItems}
                key={obj.id}
                dispatch={dispatch}
                {...obj}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
