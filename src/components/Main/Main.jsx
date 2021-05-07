import React from 'react';
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Tech from "./Tech/Tech";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

import './Main.css';

const Main = () => {
  return (
    <section className="main">
      <Promo />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Portfolio />
    </section>
  )
};

export default Main;
