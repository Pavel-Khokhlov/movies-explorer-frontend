import React, { useContext } from "react";
import PortfolioLink from "../../PortfolioLink/PortfolioLink";
import SubTitle from "../../SubTitle/SubTitle";
import Line from "../../Line/Line";
import { TranslationContext } from "../../../context/TranslationContext";
import useLinks from "../../Hooks/useConfig";

import "./Portfolio.css";

const Portfolio = () => {
  const translation = useContext(TranslationContext);
  const { portfolioLinks } = useLinks();

  return (
    <section className="section portfolio">
      <SubTitle className="subtitle subtitle__layout_portfolio subtitle__size_m subtitle__color_grey">
        {translation.title_portfolio}
      </SubTitle>
      <ul className="portfolio__links animation_item stop_animation">
        {portfolioLinks.map((link, index) => {
          return <PortfolioLink key={index} link={link}></PortfolioLink>;
        })}
      </ul>
    </section>
  );
};

export default Portfolio;
