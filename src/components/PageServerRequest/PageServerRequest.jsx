import React from "react";
import LoadSVG from "../../images/load_cat.gif";

import "./PageServerRequest.css";

const PageServerRequest = ({ className }) => {
  return (
    <div className={className}>
      <img src={LoadSVG} alt="гифка загрузка" className="load__image" />
    </div>
  );
};

export default PageServerRequest;
