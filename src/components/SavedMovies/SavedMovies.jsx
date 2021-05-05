import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Button from "../Button/Button";
import Card from "../Card/Card";
import movies from "../../utils/movies";

import "./SavedMovies.css";

const SavedMovies = () => {
  const myMovies = movies.filter(i => i.like === true);
  console.log(myMovies);

  return (
    <section className="section">
      <SearchForm />
      <line className="line line__color_grey" />
      {/* MOVIES */}
      <ul className="movies__list">
        {myMovies.map((i) => {
          return (
            <Card
              card={i}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default SavedMovies;
