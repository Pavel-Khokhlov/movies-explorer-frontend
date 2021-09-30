import React, { useContext } from "react";
import SubTitle from "../../SubTitle/SubTitle";
import Paragraph from "../../Paragraph/Paragraph";
import { TranslationContext } from "../../../context/TranslationContext";

import "./AboutProject.css";

const AboutProject = () => {
  const translation = useContext(TranslationContext);

  return (
    <section className="section aboutproject" id="more">
      <SubTitle className="subtitle subtitle__layout_main subtitle__size_xl">
      {translation.title_project}
      </SubTitle>
      <div className="aboutproject__block">
        <article className="aboutproject__text">
          <SubTitle
            className="subtitle subtitle__layout_aboutproject subtitle__size_l"
          >
            Дипломный проект включал 5 этапов
          </SubTitle>
          <Paragraph className="paragraph paragraph__aboutproject">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </Paragraph>
        </article>
        <article className="aboutproject__text">
          <SubTitle
            className="subtitle subtitle__layout_aboutproject subtitle__size_l"
          >
            На выполнение диплома ушло 5 недель
          </SubTitle>
          <Paragraph className="paragraph paragraph__aboutproject">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </Paragraph>
        </article>
      </div>
      <div className="aboutproject__table">
        <Paragraph className="paragraph paragraph__table paragraph__color_white aboutproject__table_blue">
          1 неделя
        </Paragraph>
        <Paragraph className="paragraph paragraph__table aboutproject__table_grey">
          5 недель
        </Paragraph>
        <Paragraph className="paragraph paragraph__table paragraph__color_grey">
          Back-end
        </Paragraph>
        <Paragraph className="paragraph paragraph__table paragraph__color_grey">
          Front-end
        </Paragraph>
      </div>
    </section>
  );
};

export default AboutProject;
