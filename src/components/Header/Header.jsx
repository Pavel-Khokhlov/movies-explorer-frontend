import React from "react";
import { useSelector } from "react-redux";
import useScroll from "../Hooks/useScroll";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

import "./Header.css";

const Header = () => {
  const { currentPath } = useSelector((state) => state.app);
  const { scrolled } = useScroll();

  const headerBgClassName = `section header ${currentPath === "/" ? "header__bg_grey" : ""}`;

  if (
    currentPath === "/" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies" ||
    currentPath === "/profile"
  ) {
    return (
      <header className={headerBgClassName}>
        <Logo />
        <Navigation />
      </header>
    );
  }
  return "";
};

export default Header;
