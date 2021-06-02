import React from "react";
import PortfolioLink from "../../PortfolioLink/PortfolioLink";
import SubTitle from "../../SubTitle/SubTitle";
import Line from "../../Line/Line";

import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="section portfolio">
      <SubTitle className="subtitle subtitle__layout_portfolio subtitle__size_m subtitle__color_grey">
        Портфолио
      </SubTitle>
      <div className="portfolio__block">
        <PortfolioLink
          url="https://github.com/Pavel-Khokhlov/how-to-learn"
          titleName="Статичный сайт"
        ></PortfolioLink>
        <Line className="line line__color_grey" />
        <PortfolioLink
          url="https://pavel-khokhlov.github.io/russian-travel/index.html"
          titleName="Адаптивный сайт"
        ></PortfolioLink>
        <Line className="line line__color_grey" />
        <PortfolioLink
          url="https://pavel-khokhlov.github.io/mesto-react/"
          titleName="Одностраничное приложение"
        ></PortfolioLink>
      </div>
    </section>
  );
};

export default Portfolio;
