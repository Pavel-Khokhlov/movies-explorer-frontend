import React from "react";
import LoadSVG from "../../images/load.gif";

import "./PageLoad.css";

const PageLoad = () => {
  return (
    <section className="load">
      <img src={LoadSVG} alt="гифка загрузка" className="load__image" />
    </section>
  );
};

export default PageLoad;
