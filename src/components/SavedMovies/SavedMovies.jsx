import React, { useEffect } from "react";
import Line from "../Line/Line";
import SearchForm from "../SearchForm/SearchForm";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getSavedMovies, setSavedMovies } from "../../store/movieSlice";

const SavedMovies = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const { savedMovies } = useSelector((state) => state.movies);

  const localSavedMovies = JSON.parse(localStorage.getItem("localSavedMovies"));

  useEffect(() => {
    localSavedMovies
      ? dispatch(setSavedMovies(localSavedMovies))
      : dispatch(getSavedMovies(token));
  }, []);

  return (
    <section className="section">
      <SearchForm />
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      {savedMovies.length > 0 && (
        <ul className="movies__list">
          {savedMovies.map((movie) => {
            return (
              <Card
                key={movie._id}
                movie={movie}
              />
            );
          })}
        </ul>
      )}
      {savedMovies.length === 0 && (
        <p className="paragraph paragraph__saved-movies text-color__grey">
          Фильмы отсутствуют
        </p>
      )}
    </section>
  );
};

export default SavedMovies;
