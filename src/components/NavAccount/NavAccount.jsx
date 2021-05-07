import React from "react";
import { NavLink } from "react-router-dom";

import Avatar from "../../images/avatar.svg"

import "./NavAccount.css";

const NavAccount = ({ className, onClose }) => {
  return (
    <ul className={className}>
      <li>
        <NavLink
          to="/profile"
          className="button button__word nav__link text-color__black"
          activeClassName="text-weight__medium"
          onClick={onClose}
        >
          Аккаунт
        </NavLink>
      </li>
      <img src={Avatar} alt="иконка аватар" className="nav__image" />
    </ul>
  );
};

export default NavAccount;
