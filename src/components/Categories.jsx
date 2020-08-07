import React from "react";
import PropTypes from "prop-types";

const Categories = React.memo(({ items, onClickItem, category }) => {
  // items - array of pizza

  const onSelectItem = (index) => {
    // calling in <Home/>
    onClickItem(index);
  };

  return (
    <div className="categories">
      <ul>
        <li
          className={category === null ? "active" : ""}
          onClick={() => onSelectItem(null)}
        >
          Все
        </li>

        {items &&
          items.map((name, index) => (
            <li
              /* при клике мы в стейт передаем индекс и в массиве сравниваем индекс со стейта с индексом в массиве и при совпадении true */
              className={category === index ? "active" : ""}
              onClick={() => onSelectItem(index)}
              key={`${name}_${index}`}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Categories;

Categories.defaultProps = { items: [], onClickItem: () => {}, category: null };

Categories.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func,
  category: PropTypes.number,
};
