import React from 'react';
import Section from "../../Section/Section";
import Title from "../../Title/Title";
import SubTitle from "../../SubTitle/SubTitle";
import Paragraph from '../../Paragraph/Paragraph';
import Line from "../../Line/Line";
import TechItem from '../../TechItem/TechItem';

import './Tech.css';

const Tech = () => {
  return (
    <Section className="tech">
      <SubTitle className={`subtitle subtitle__layout_main subtitle__size_xl`}>Технологии</SubTitle>
      <Line className={`line line__color_black`} />
      <Title className={`title title__tech`} >7 технологий</Title>
      <Paragraph className={`paragraph paragraph__tech`}>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</Paragraph>
      <div className="tech__items">
        <TechItem>HTML</TechItem>
        <TechItem>CSS</TechItem>
        <TechItem>JS</TechItem>
        <TechItem>React</TechItem>
        <TechItem>Git</TechItem>
        <TechItem>Express.js</TechItem>
        <TechItem>mongoDB</TechItem>
      </div>
    </Section>
  )
};

export default Tech;
