import React from "react";
import Button from "../../Button/Button";

import "./NavTab.css";

const NavTab = () => {
  return (
    <div className="navtab">
      <Button type="button" className={`button button__promo`} to="#one">
        Узнать больше
      </Button>
    </div>
  );
};

export default NavTab;
