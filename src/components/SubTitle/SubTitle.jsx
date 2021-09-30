import React, { Fragment } from "react";

import "./SubTitle.css";

const SubTitle = ({ className, children }) => {
  return (
    <Fragment>
      <h3 className={className}>{children}</h3>
    </Fragment>
  );
};

export default SubTitle;
