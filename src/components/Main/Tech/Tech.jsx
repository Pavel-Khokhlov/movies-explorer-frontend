import React, { useContext } from "react";
import Title from "../../Title/Title";
import SubTitle from "../../SubTitle/SubTitle";
import Paragraph from "../../Paragraph/Paragraph";
import TechItem from "../../TechItem/TechItem";
import { TranslationContext } from "../../../context/TranslationContext";

import useLinks from "../../Hooks/useConfig";

import "./Tech.css";

const Tech = () => {
  const translation = useContext(TranslationContext);
  const { technologyLinks } = useLinks();

  const countTech = technologyLinks.length;

  return (
    <section className="section tech" id="tech">
      <SubTitle className="subtitle subtitle__layout_main subtitle__size_xl">
        {translation.title_tech}
      </SubTitle>
      <div className="tech__block">
        <Title className="title title__tech">{countTech} технологий</Title>
        <Paragraph className="paragraph paragraph__tech">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </Paragraph>
      </div>
      <div className="tech__items">
        {technologyLinks.map((item) => {
          return <TechItem key={item}>{item}</TechItem>;
        })}
      </div>
    </section>
  );
};

export default Tech;
