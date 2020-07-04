import React from 'react';
import classNames from 'classnames';

let Button = ({ onClick, newclass, children }) => {
  return (
    <button onClick={onClick} className={classNames('button', newclass)}>
      {children}
    </button>
  );
};
export default Button;
