import React from "react";
import { NavLink } from "react-router-dom";
import Section from "../../Section/Section";
import Title from "../../Title/Title";
import SubTitle from "../../SubTitle/SubTitle";
import Paragraph from "../../Paragraph/Paragraph";
import Line from "../../Line/Line";
import Portrait from "../../../images/portrait.jpg";

import "./AboutMe.css";

const AboutMe = () => {
  return (
    <Section className="aboutme">
      <SubTitle className={`subtitle subtitle__layout_main subtitle__size_xl`}>
        Студент
      </SubTitle>
      <Line className={`line line__color_black`} />
      <article className="aboutme__block">
        <div className="aboutme__text">
          <Title className="title title__aboutme">Павел Хохлов</Title>
          <Title className={`subtitle title__main subtitle__size_m`}>
            Фронтенд-разработчик, 43 года
          </Title>
          <Paragraph className="paregraph paragraph__aboutme">
            Я родился в Приморском крае. Получил высшее образование по
            специальности радиоинженер. Некоророе время работал на нефте-газовых
            проектах как радиоинженер и IT support на острове Сахалин. После
            переезда в подмосковье увлекся фотографией и массажем. Первое
            знакомство с HTML и CSS произошло в 2012 году, даже написал
            небольшой статичный сайт для себя. Сейчас решил вернуться к
            программированию, это меня увлекает. Вижу, что технологии очень
            сильно изменились с 2012 года. С Яндекс-Практикум разобрался со
            взаимодействием разных сервисов и основами серверной части. В
            поисках работы в IT сфере. Занимаюсь плаванием, бегом и ездой на
            велосипеде.
          </Paragraph>
          <ul className="aboutme__links">
            <li>
              <NavLink
                target="_blank"
                to="/facebook"
                className="button aboutme__link"
              >
                Facebook
              </NavLink>
            </li>
            <li>
              <NavLink
                target="_blank"
                to="/github"
                className="button aboutme__link"
              >
                GitHub
              </NavLink>
            </li>
          </ul>
        </div>
        <img src={Portrait} alt="портрет резюме" className="aboutme__image" />
      </article>
    </Section>
  );
};

export default AboutMe;
