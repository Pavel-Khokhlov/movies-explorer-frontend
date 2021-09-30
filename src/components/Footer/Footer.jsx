import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Paragraph from "../Paragraph/Paragraph";
import Line from "../Line/Line";
import { TranslationContext } from "../../context/TranslationContext";

import "./Footer.css";

const Footer = ({ location }) => {
  const translation = useContext(TranslationContext);

  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  if (
    currentPath === "/" ||
    currentPath === "/movies" ||
    currentPath === "/saved-movies"
  ) {
    return (
      <section className="section footer">
        <Paragraph className={`paragraph paragraph__footer text-color__grey`}>
          {translation.footer_text}
        </Paragraph>
        <Line className={`line line__color_grey`} />
        <div className="footer__block">
          <div className="paragraph footer__copyright">@ 2021</div>
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
                href="https://facebook.com"
                className="button paragraph footer__link"
                target="_blank"
                rel="noreferrer"
              >
                FaceBook
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
  return "";
};

export default withRouter(Footer);
