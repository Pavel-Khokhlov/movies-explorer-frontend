import React from "react";

import GitIcon from "../../images/git.png";
import InternetIcon from "../../images/internet.png";

const PortfolioLink = ({ link }) => {
  return (
    <li className="portfolio__link hover">
      <article className="portfolio__about">
        <h2 className="paragraph paragraph__portfolio">{link.name}</h2>
        <p className="paragraph">{link.tech}</p>
      </article>
      <div className="portfolio__link-block">
        <a href={link.pathGit} target="_blank" rel="noreferrer">
          <img
            src={GitIcon}
            alt="иконка переход github"
            className="portfoliolink__image"
          />
        </a>
        <a href={link.pathGhPages} target="_blank" rel="noreferrer">
          <img
            src={InternetIcon}
            alt="иконка переход интернет"
            className="portfoliolink__image"
          />
        </a>
      </div>
    </li>
  );
};

export default PortfolioLink;
