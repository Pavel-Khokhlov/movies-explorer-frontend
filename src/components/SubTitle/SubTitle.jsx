import React from "react";

import "./SubTitle.css";

const SubTitle = ({ className, children }) => {
  return (
    <>
      <h3 className={className}>{children}</h3>
    </>
  );
};

export default SubTitle;
