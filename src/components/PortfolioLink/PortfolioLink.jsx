import React from "react";
import Paragraph from "../Paragraph/Paragraph";
import { NavLink } from "react-router-dom";

import Icon from "../../images/btn_portfolio.svg";

import "./PortfolioLink.css";

const PortfolioLink = ({ url, titleName }) => {
  return (
    <div className="portfoliolink">
      <Paragraph className={`paragraph paragraph__portfolio`}>
        {titleName}
      </Paragraph>
      <NavLink target="_blank" to={url}>
        <img src={Icon} alt="иконка переход" className="portfoliolink__image" />
      </NavLink>
    </div>
  );
};

export default PortfolioLink;
