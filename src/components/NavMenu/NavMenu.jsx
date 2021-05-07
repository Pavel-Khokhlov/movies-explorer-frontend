import React from "react";
import { NavLink } from "react-router-dom";

import "./NavMenu.css";

const NavMenu = ({className, onClose}) => {
  return (
    <ul className={className}>
      <li>
        <NavLink
          to="/"
          className="button button__word nav__link nav__main text-color__black"
          activeClassName="text-weight__medium button__word_border"
          onClick={onClose}
        >
          Главная
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className="button button__word nav__link text-color__black"
          activeClassName="text-weight__medium button__word_border" onClick={onClose}
        >
          Фильмы
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/saved-movies"
          className="button button__word nav__link text-color__black"
          activeClassName="text-weight__medium button__word_border"
          onClick={onClose}
        >
          Сохраненные фильмы
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
