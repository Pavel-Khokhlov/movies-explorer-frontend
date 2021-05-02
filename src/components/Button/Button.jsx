import React from 'react';

import './Button.css';

const Button = ({ type, btnTitle, className, onClick, children }) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick}>
        {btnTitle}
      </button>
    </>
  )
};

export default Button;
