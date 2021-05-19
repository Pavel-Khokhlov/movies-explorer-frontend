import React from "react";

import "./Title.css";

const Title = ({ className, children }) => {
  return <h2 className={className}>{children}</h2>;
};

export default Title;
