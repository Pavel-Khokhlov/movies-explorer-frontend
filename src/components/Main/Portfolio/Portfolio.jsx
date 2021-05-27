import React from "react";
import { Link } from "react-router-dom";
import PortfolioLink from "../../PortfolioLink/PortfolioLink";
import SubTitle from "../../SubTitle/SubTitle";
import Line from "../../Line/Line";

import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="section portfolio">
      <SubTitle
        className="subtitle subtitle__layout_portfolio subtitle__size_m subtitle__color_grey"
      >
        Портфолио
      </SubTitle>
      <div className="portfolio__block">
      <Link to="https://github.com/Pavel-Khokhlov/how-to-learn" target="_blank">HOW TO LEARN</Link>
        <PortfolioLink url="/how-to-learn" titleName="Статичный сайт"></PortfolioLink>
        <Line className="line line__color_grey" />
        <PortfolioLink url="/travel" titleName="Адаптивный сайт"></PortfolioLink>
        <Line className="line line__color_grey" />
        <PortfolioLink url="/mesto" titleName="Одностраничное приложение"></PortfolioLink>
      </div>
    </section>
  );
};

export default Portfolio;
