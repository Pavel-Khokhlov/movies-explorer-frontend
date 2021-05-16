import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Tech from "./Tech/Tech";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";

import './Main.css';

const Main = ({ location }) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    localStorage.setItem("local-path", JSON.stringify(currentPath))
  }, [location]);

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

export default withRouter(Main);
