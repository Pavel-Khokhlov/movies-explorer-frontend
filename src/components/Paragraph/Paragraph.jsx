import React from "react";

import "./Paragraph.css";

const Paragraph = ({ className, children }) => {
  return (
    <>
      <p className={className}>{children}</p>
    </>
  );
};

export default Paragraph;
