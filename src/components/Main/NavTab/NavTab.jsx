import React, { useContext } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { TranslationContext } from "../../../context/TranslationContext";

import "./NavTab.css";

const NavTab = () => {
  const translation = useContext(TranslationContext);

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
        {translation.promo_nav_learn_more}
      </Link>
      <Link
        className="button button__promo"
        to="tech"
        spy={true}
        smooth={true}
        offset={0}
        duration={1000}
      >
        {translation.promo_nav_tech}
      </Link>
      <Link
        className="button button__promo"
        to="aboutme"
        spy={true}
        smooth={true}
        offset={0}
        duration={1000}
      >
        {translation.promo_nav_about}
      </Link>
    </div>
  );
};

export default NavTab;
