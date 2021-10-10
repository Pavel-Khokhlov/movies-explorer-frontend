import React, { useContext } from "react";
import Paragraph from "../Paragraph/Paragraph";
import Line from "../Line/Line";
import { TranslationContext } from "../../context/TranslationContext";

import "./Footer.css";
import { useSelector } from "react-redux";

const Footer = () => {
  const translation = useContext(TranslationContext);
  const { currentPath } = useSelector((state) => state.app);

  if (
    currentPath === "/" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies"
  ) {
    return (
      <footer className="section footer">
        <Paragraph className={`paragraph paragraph__footer text-color__grey`}>
          {translation.footer_text}
        </Paragraph>
        <Line className={`line line__color_grey`} />
        <div className="footer__block">
          <div className="paragraph footer__copyright">@ 2020 - 2021 Created by Pavel Khokhlov</div>
          <ul className="footer__links">
            <li>
              <a
                href="https://praktikum.yandex.ru/"
                className="button paragraph footer__link"
                target="_blank"
                rel="noreferrer"
              >
                {translation.footer_link_yandex}
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Pavel-Khokhlov/"
                className="button paragraph footer__link"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/pavel-khokhlov/"
                className="button paragraph footer__link"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
  return "";
};

export default Footer;
