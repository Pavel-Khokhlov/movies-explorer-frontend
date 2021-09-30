import React, { useContext } from "react";
import NavTab from "../NavTab/NavTab";
import Title from "../../Title/Title";
import Paragraph from "../../Paragraph/Paragraph";
import PromoImg from "../../../images/PromoImg.svg";
import { TranslationContext } from "../../../context/TranslationContext";

import "./Promo.css";

const Promo = () => {
  const translation = useContext(TranslationContext);

  return (
    <section className="section promo">
      <div className="promo__info">
        <div className="promo__text">
          <Title className="title title__promo">
            {translation.title_promo}
          </Title>
          <Paragraph className="paragraph paragraph__promo paragraph__size_s">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </Paragraph>
        </div>
        <img src={PromoImg} alt="изображение" className="promo__img rotation" />
      </div>
      <NavTab />
    </section>
  );
};

export default Promo;
