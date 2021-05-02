import React from "react";

import "./TechItem.css";

const TechItem = ({ children }) => {
  return (
    <>
      <p className="techitem">{children}</p>
    </>
  );
};

export default TechItem;
