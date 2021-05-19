import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";

import "./NavTab.css";

const NavTab = () => {
  return (
    <div className="navtab">
      <Link
        className="button button__promo"
        to="more"
        spy={true}
        smooth={true}
        offset={70}
        duration={1000}
      >
        Узнать больше
      </Link>
    </div>
  );
};

export default NavTab;
