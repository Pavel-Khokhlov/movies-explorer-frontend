import React from "react";

import "./Section.css";

const Section = ({ className, children }) => {
  return <section className={`section ${className}`}>{children}</section>;
};

export default Section;
