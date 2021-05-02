import React from "react";
import PortfolioLink from "../../PortfolioLink/PortfolioLink";
import Section from "../../Section/Section";
import SubTitle from "../../SubTitle/SubTitle";
import Line from "../../Line/Line";

import "./Portfolio.css";

const Portfolio = () => {
  return (
    <Section className="portfolio">
      <SubTitle
        className={`subtitle subtitle__layout_portfolio subtitle__size_m subtitle__color_grey`}
      >
        Портфолио
      </SubTitle>
      <div className="portfolio__block">
        <PortfolioLink url={`/facebook`} titleName={`Статичный сайт`}></PortfolioLink>
        <Line className={`line line__color_grey`} />
        <PortfolioLink url={`/github`} titleName={`Адаптивный сайт`}></PortfolioLink>
        <Line className={`line line__color_grey`} />
        <PortfolioLink url={`/google`} titleName={`Одностраничное приложение`}></PortfolioLink>
      </div>
    </Section>
  );
};

export default Portfolio;
