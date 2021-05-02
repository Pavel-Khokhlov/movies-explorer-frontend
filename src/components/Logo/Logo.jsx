import React from "react";
import { NavLink } from "react-router-dom";
import LogoSvg from "../../images/logo.svg";

import "./Logo.css";

const Logo = () => {
  return (
    <NavLink to="/" className="button">
      <img src={LogoSvg} alt="логотип" className="logo" />
    </NavLink>
  );
};

export default Logo;
