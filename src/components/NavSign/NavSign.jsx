import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { TranslationContext } from "../../context/TranslationContext";

import "./NavSign.css";

const NavSign = () => {
  const translation = useContext(TranslationContext);

  return (
    <ul className="nav__sign">
      <li>
        <NavLink
          to="/signup"
          className="button button__word nav__link text-color__black"
        >
          {translation.header_reg}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signin"
          className="button nav__link text-color__white nav__login"
        >
          {translation.header_login}
        </NavLink>
      </li>
    </ul>
  );
};

export default NavSign;
