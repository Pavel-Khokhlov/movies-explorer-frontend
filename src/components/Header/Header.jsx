import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Section from "../Section/Section";

import "./Header.css";

const Header = ({ isLoggedIn, onClick, location }) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  const headerBgClassName = `header ${currentPath === "/" ? "header__bg_grey" : ""}`;

  if (
    currentPath === "/" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies" ||
    currentPath === "/profile"
  ) {
    return (
      <Section className={headerBgClassName}>
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} onClick={onClick} />
      </Section>
    );
  }
  return "";
};

export default withRouter(Header);
