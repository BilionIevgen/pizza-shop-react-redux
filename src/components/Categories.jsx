import React, { useState } from 'react';

export default function Categories({ items }) {
  const [activeItem, setActiveItem] = useState('');
  let itemsLi = items.map((el, i) => {
    return (
      <li
        className={activeItem === i && 'active'}
        onClick={() => {
          setActiveItem(i);
        }}
        key={`${el}_${i}`}>
        {el}
      </li>
    );
  });
  return (
    <div className="categories">
      <ul>{itemsLi}</ul>
    </div>
  );
}
