import React from "react";
import { NavLink } from "react-router-dom";
import Section from "../Section/Section";
import Paragraph from "../Paragraph/Paragraph";
import Line from "../Line/Line";

import "./Footer.css";

const Footer = () => {
  return (
    <Section className="footer">
      <Paragraph
        className={`paragraph paragraph__footer paragraph__color_grey`}
      >
        Учебный проект Яндекс.Практикум х BeatFilm.
      </Paragraph>
      <Line className={`line line__color_grey`} />
      <div className="footer__block">
        <div className="paragraph footer__copyright">@ 2021</div>
        <ul className="footer__links">
          <li>
            <NavLink
              target="_blank"
              to="/yandex"
              className="button paragraph footer__link"
            >
              Яндекс.Практикум
            </NavLink>
          </li>
          <li>
            <NavLink
              target="_blank"
              to="/github"
              className="button paragraph footer__link"
            >
              GitHub
            </NavLink>
          </li>
          <li>
            <NavLink
              target="_blank"
              to="/facebook"
              className="button paragraph footer__link"
            >
              FaceBook
            </NavLink>
          </li>
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
