import React, { useEffect } from "react";
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

const Movies = () => {
  const dispatch = useDispatch();
  const { count, countShowMovies, filteredMovies } = useSelector(
    (state) => state.movies
  );
  const { token } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  useEffect(() => {
    dispatch(getSavedMovies(token));
  }, []);

  function handleMoreClick() {
    dispatch(incrementCount(count));
  }

  return (
    <section className="section">
      <SearchForm />
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      <ul className="movies__list">
        {filteredMovies
          .filter((v, i) => i < countShowMovies)
          .map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
      </ul>
      {filteredMovies.length > countShowMovies && (
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
