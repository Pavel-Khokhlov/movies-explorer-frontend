import React from "react";

import "./TechItem.css";

const TechItem = ({ children }) => {
  return <p className="tech__item">{children}</p>;
};

export default TechItem;
