import React, { useEffect } from "react";
import LazyLoad from "react-lazyload";
import SearchForm from "../SearchForm/SearchForm";
import Line from "../Line/Line";
import Button from "../Button/Button";
import Card from "../Card/Card";

import "./Movies.css";

const Movies = ({
  count,
  filteredAllMovies,
  savedMovies,
  onSearchClick,
  onSaveMovieClick,
  onDeleteMovieClick,
  onGetMoreMoviesClick,
}) => {

  function handleMoreClick(e) {
    e.preventDefault();
    onGetMoreMoviesClick();
  }

  return (
    <section className="section">
      <SearchForm onSearchClick={onSearchClick} />
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      <ul className="movies__list">
        {filteredAllMovies
          .filter((v, i) => i < count)
          .map((movie) => {
            return (
              <LazyLoad key={movie.description}>
                <Card
                  movie={movie}
                  savedMovies={savedMovies}
                  onSaveMovieClick={onSaveMovieClick}
                  onDeleteMovieClick={onDeleteMovieClick}
                />
              </LazyLoad>
            );
          })}
      </ul>
      {filteredAllMovies.length > count && (
        <Button
          type="button"
          className="button button__more bg-color__gray paragraph paragraph__size_s"
          onClick={handleMoreClick}
        >
          Ещё
        </Button>
      )}
    </section>
  );
};

export default Movies;
