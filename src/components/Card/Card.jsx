import React from "react";
import Button from "../../components/Button/Button";

import "./Card.css";

const Card = ({ card }) => {
  const buttonMovieClassName = `button button__movie ${card.like === true ? "button__movie_saved" : "button__movie_unsaved"}`;

  return (
    <li className="movie bg-color__gray">
      <div className="movie__info">
        <div className="movie__text">
          <h2 className="title title__movie">{card.title}</h2>
          <p className="paragraph paragraph__duration text-color__grey">
            {card.duration}
          </p>
        </div>
        <Button type="button" className={buttonMovieClassName}></Button>
      </div>
      <img src={card.link} alt={card.title} className="movie__image" />
    </li>
  );
};

export default Card;
