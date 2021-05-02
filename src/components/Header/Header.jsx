import React from 'react';
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Section from "../Section/Section";

import './Header.css';

const Header = ({ isLoggedIn }) => {
  const headerBgClassName = `header ${
    isLoggedIn ? "" : "header__bg_grey"}`

  return (
    <Section className={headerBgClassName}>
      <Logo />
      <Navigation isLoggedIn={isLoggedIn} />
    </Section>
  )
};

export default Header;
