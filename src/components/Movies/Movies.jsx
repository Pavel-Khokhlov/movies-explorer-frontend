import React from 'react';
import SearchForm from "../SearchForm/SearchForm";
import Line from "../Line/Line";
import Button from "../Button/Button";
import Card from "../Card/Card";
import movies from "../../utils/movies";

import './Movies.css';

const Movies = () => {
  return (
    <section className="section">
      <SearchForm />
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      <ul className="movies__list">
        {movies.map((i) => {
          return (
            <Card
              key={i.link}
              card={i}
            />
          );
        })}
      </ul>
      <Button type="button" className="button button__more bg-color__gray paragraph paragraph__size_s">Ещё</Button>
    </section>
  )
};

export default Movies;
