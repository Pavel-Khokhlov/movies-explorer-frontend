import React from "react";

import "./Button.css";

const Button = ({ type, className, onClick, disabled, children }) => {
  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
