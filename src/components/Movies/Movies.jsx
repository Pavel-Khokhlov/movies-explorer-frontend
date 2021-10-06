import React, { useEffect } from "react";
import LazyLoad from "react-lazyload";
import SearchForm from "../SearchForm/SearchForm";
import Line from "../Line/Line";
import Button from "../Button/Button";
import Card from "../Card/Card";

import "./Movies.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMovies,
  getSavedMovies,
  incrementCount,
} from "../../store/movieSlice";

const Movies = ({ onSearchClick }) => {
  const dispatch = useDispatch();
  const { movies, count, countShowMovies } = useSelector(
    (state) => state.movies
  );
  const { token } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  useEffect(() => {
    dispatch(getSavedMovies(token));
  }, []);

  function handleMoreClick(e) {
    e.preventDefault();
    dispatch(incrementCount(count));
  }

  return (
    <section className="section">
      <SearchForm onSearchClick={onSearchClick} />
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      <ul className="movies__list">
        {movies
          .filter((v, i) => i < countShowMovies)
          .map((movie) => {
            return (
              <LazyLoad key={movie.description}>
                <Card key={movie.id} movie={movie} />
              </LazyLoad>
            );
          })}
      </ul>
      {movies.length > countShowMovies && (
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
