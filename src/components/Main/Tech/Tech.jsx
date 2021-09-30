import React, { useContext } from "react";
import Title from "../../Title/Title";
import SubTitle from "../../SubTitle/SubTitle";
import Paragraph from "../../Paragraph/Paragraph";
import TechItem from "../../TechItem/TechItem";
import { TranslationContext } from "../../../context/TranslationContext";

import "./Tech.css";

const Tech = () => {
  const translation = useContext(TranslationContext);

  return (
    <section className="section tech" id="tech">
      <SubTitle className="subtitle subtitle__layout_main subtitle__size_xl">
        {translation.title_tech}
      </SubTitle>
      <div className="tech__block">
        <Title className="title title__tech">7 технологий</Title>
        <Paragraph className="paragraph paragraph__tech">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </Paragraph>
      </div>
      <div className="tech__items">
        <TechItem>HTML</TechItem>
        <TechItem>CSS</TechItem>
        <TechItem>JS</TechItem>
        <TechItem>React</TechItem>
        <TechItem>Git</TechItem>
        <TechItem>Express.js</TechItem>
        <TechItem>mongoDB</TechItem>
      </div>
    </section>
  );
};

export default Tech;
