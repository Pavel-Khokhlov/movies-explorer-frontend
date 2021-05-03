import React from "react";
import { NavLink } from "react-router-dom";

import "./Navigation.css";

const Navigation = ({ isLoggedIn }) => {
  return (
    <>
      <nav className="nav">
        <ul className="nav__menu">
          {isLoggedIn ? (
            <li>
              <NavLink
                to="/movies"
                className="nav__link paragraph"
                activeClassName="nav__link_active"
              >
                Фильмы
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {isLoggedIn ? (
            <li>
              <NavLink
                to="/saved-movies"
                className="button nav__link paragraph"
                activeClassName="nav__link_active"
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {isLoggedIn ? (
            <li>
              <NavLink
                to="/profile"
                className="button nav__link paragraph"
                activeClassName="nav__link_active"
              >
                Аккаунт
              </NavLink>
            </li>
          ) : (
            ""
          )}
          {isLoggedIn ? (
            ""
          ) : (
            <li>
              <NavLink
                to="/signup"
                className="button nav__link paragraph "
                activeClassName="nav__link_active"
              >
                Регистрация
              </NavLink>
            </li>
          )}
          {isLoggedIn ? (
            ""
          ) : (
            <li>
              <NavLink
                to="/signin"
                className="button nav__link paragraph paragraph__color_white nav__login"
              >
                Войти
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
