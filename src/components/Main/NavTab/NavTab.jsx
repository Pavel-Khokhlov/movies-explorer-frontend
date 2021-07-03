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
        offset={0}
        duration={1000}
      >
        Узнать больше
      </Link>
      <Link
        className="button button__promo"
        to="tech"
        spy={true}
        smooth={true}
        offset={0}
        duration={1000}
      >
        Технологии
      </Link>
      <Link
        className="button button__promo"
        to="aboutme"
        spy={true}
        smooth={true}
        offset={0}
        duration={1000}
      >
        Обо мне
      </Link>
    </div>
  );
};

export default NavTab;
