import React, { useContext } from "react";
import Title from "../../Title/Title";
import SubTitle from "../../SubTitle/SubTitle";
import Paragraph from "../../Paragraph/Paragraph";
import Portrait from "../../../images/portrait.jpg";

import { TranslationContext } from "../../../context/TranslationContext";

import "./AboutMe.css";

const AboutMe = () => {
  const translation = useContext(TranslationContext);

  return (
    <section className="section aboutme" id="aboutme">
      <SubTitle className="subtitle subtitle__layout_main subtitle__size_xl animation_item stop_animation">
        {translation.title_dev}
      </SubTitle>
      <article className="aboutme__block">
        <div className="aboutme__text">
          <Title className="title title__aboutme">Павел Хохлов</Title>
          <Title className="subtitle title__main subtitle__size_m">
            Фронтенд-разработчик, 43 года
          </Title>
          <Paragraph className="paragraph paragraph__aboutme">
            С февраля 2021 вовлечен в Pet проект, на начальном этапе это был простой сайт визитка. По ходу обучения применялиль и практиковались технологии на этом проекте. После пересмотра концепции было принято решение делать полноценный сайт интернет магазина. FrontEnd собирается на ReactJS и Redux. BackEnd на NodeJS и MongoDB.
          </Paragraph>
          <Paragraph className="paragraph paragraph__aboutme">
            Я родился в Приморском крае. Получил высшее образование и долгое
            время работал инженером по телекоммуникациям и предоставлял
            IT поддержку пользователям на нефтегазовом проекте. Впервые
            познакомился с HTML, CSS в 2012 году. Написал свой первый сайт и
            загрузил его на хостинг. В 2020 году решил упорядочить свои знания и
            прошел курс по Фронтенд разработке в Яндекс-Практикум. Полученные
            знания готов применять на практике и в проектах. Изученные
            технологии: HTML, CSS, JavaScripts, ES6, WebPack, ReactJS, Redux, SPA, NodeJS, Express, MongoDB.
          </Paragraph>
          <Title className="subtitle title__main subtitle__size_m">
            Образование
          </Title>
          <Paragraph className="paragraph paragraph__aboutme">
            06.2020 - 06.2021 Яндекс.Практикум (АНО ДПО «ШАД») Программа
            профессиональной переподготовки. «Веб-разработчик» в объёме 560
            часов.
          </Paragraph>
          <Paragraph className="paragraph paragraph__aboutme">
            03.2016 - 11.2016 г. Москва, Академия Фотографии, Дизайна и Мультимедиа, Фотошкола - Фотограф по программе профессионального доолнительного образования "Фотограф".
          </Paragraph>
          <Paragraph className="paragraph paragraph__aboutme">
            02.2008 - 05.2008 Новгородский Государственный Университет им.
            Ярослава Мудрого, Свидетельство о повышении квалификации по
            программе «Сетевая Академия Cisco» CCNA.
          </Paragraph>
          <Paragraph className="paragraph paragraph__aboutme">
            07.1994 - 02.2000 г. Владивосток Дальневосточная Государственная
            Морская Академия им. адмирала Г.И. Невельского. Квалификация радиоинженер по
            специальности Техническая Эксплуатация Транспортного
            Радиооборудования
          </Paragraph>
          <Paragraph className="paragraph paragraph__aboutme">
            Веду активный образ жизни: бег, плавание и велоспорт.
          </Paragraph>
          <ul className="aboutme__links">
            <li>
              <a
                href="https://www.linkedin.com/in/pavel-khokhlov/"
                className="button aboutme__link"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Pavel-Khokhlov/"
                className="button aboutme__link"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <img src={Portrait} alt="портрет резюме" className="aboutme__image animation_item stop_animation" />
      </article>
    </section>
  );
};

export default AboutMe;
