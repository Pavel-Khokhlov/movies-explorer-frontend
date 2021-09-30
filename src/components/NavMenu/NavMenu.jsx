import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { TranslationContext } from "../../context/TranslationContext";

import "./NavMenu.css";

const NavMenu = ({ className, onClose }) => {
  const translation = useContext(TranslationContext);

  return (
    <ul className={className}>
      <li>
        <NavLink
          exact
          to="/"
          className="button button__word nav__link text-color__black"
          activeClassName="text-weight__medium button__word_border"
          onClick={onClose}
        >
          {translation.header_main}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className="button button__word nav__link text-color__black"
          activeClassName="text-weight__medium button__word_border"
          onClick={onClose}
        >
          {translation.header_movies}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/saved-movies"
          className="button button__word nav__link text-color__black"
          activeClassName="text-weight__medium button__word_border"
          onClick={onClose}
        >
          {translation.header_savedMovies}
        </NavLink>
      </li>
    </ul>
  );
};

export default NavMenu;
