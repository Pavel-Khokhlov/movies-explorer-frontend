import React from "react";
import { NavLink } from "react-router-dom";

import "./NavSign.css";

const NavSign = () => {
  return (
    <ul className="nav__sign">
      <li>
        <NavLink
          to="/signup"
          className="button button__word nav__link text-color__black"
        >
          Регистрация
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signin"
          className="button nav__link text-color__white nav__login"
        >
          Войти
        </NavLink>
      </li>
    </ul>
  );
};

export default NavSign;
