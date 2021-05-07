import React from "react";
import Section from "../../Section/Section";
import NavTab from "../NavTab/NavTab";
import Title from "../../Title/Title";
import Paragraph from "../../Paragraph/Paragraph";
import PromoImg from "../../../images/PromoImg.svg";

import "./Promo.css";

const Promo = () => {
  return (
    <section className="section promo">
      <div className="promo__info">
        <div className="promo__text">
          <Title className="title title__promo">
          Учебный проект студента факультета Веб&#8209;разработки.</Title>
          <Paragraph className="paragraph paragraph__promo paragraph__size_s">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </Paragraph>
        </div>
        <img src={PromoImg} alt="изображение" className="promo__img" />
      </div>
      <NavTab />
    </section>
  );
};

export default Promo;
