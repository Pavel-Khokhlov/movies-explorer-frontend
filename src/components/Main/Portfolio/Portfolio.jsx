import React, { useContext } from "react";
import PortfolioLink from "../../PortfolioLink/PortfolioLink";
import SubTitle from "../../SubTitle/SubTitle";
import Line from "../../Line/Line";
import { TranslationContext } from "../../../context/TranslationContext";

import "./Portfolio.css";

const Portfolio = () => {
  const translation = useContext(TranslationContext);

  return (
    <section className="section portfolio">
      <SubTitle className="subtitle subtitle__layout_portfolio subtitle__size_m subtitle__color_grey">
        {translation.title_portfolio}
      </SubTitle>
      <div className="portfolio__block">
        <PortfolioLink
          url="https://pavel-khokhlov.github.io/how-to-learn/"
          titleName={translation.portfolio_static}
        ></PortfolioLink>
        <Line className="line line__color_grey" />
        <PortfolioLink
          url="https://pavel-khokhlov.github.io/russian-travel/index.html"
          titleName={translation.portfolio_adaptive}
        ></PortfolioLink>
        <Line className="line line__color_grey" />
        <PortfolioLink
          url="https://pavel-khokhlov.github.io/mesto-react/"
          titleName={translation.portfolio_onePage}
        ></PortfolioLink>
        <Line className="line line__color_grey" />
        <PortfolioLink
          url="https://pavel-khokhlov.github.io/irinayuzifovich/"
          titleName={translation.portfolio_mypet}
        ></PortfolioLink>
      </div>
    </section>
  );
};

export default Portfolio;
