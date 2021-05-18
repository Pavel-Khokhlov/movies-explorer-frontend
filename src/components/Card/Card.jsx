import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import api from "../../utils/MovieApi.js";
import Button from "../../components/Button/Button";

import "./Card.css";

const Card = ({ movie, location, onSaveMovieClick, onDeleteMovieClick }) => {
  const savedMovies = JSON.parse(localStorage.getItem("saved-movies"));
  const currentUser = useContext(CurrentUserContext);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isSaved, setIsSaved] = useState(false);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  useEffect(() => {
    checkIsSaved();
  }, []);

  // DURATION
  const Hours = Math.floor(movie.duration / 60);
  const Minuts = movie.duration % 60;
  const Duration = `${Hours}ч ${Minuts}мин`;

  // IS MOVIE SAVED ?
  function checkIsSaved() {
    if (savedMovies === null) {
      return setIsSaved(false);
    }
    if (
      savedMovies.some(
        (element) =>
          element.owner._id === currentUser._id &&
          element.description === movie.description
      )
    ) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }

  const URL = `${
    movie?.image?.url
      ? `https://api.nomoreparties.co${movie.image.url}`
      : `https://pbs.twimg.com/media/D5go_L8W4AAI2O_.jpg`
  }`;

  const buttonMovieClassName = `button button__movie ${
    isSaved ? "button__movie_saved" : "button__movie_unsaved"
  }`;

  function handleSaveMovie() {
    alert("Сохранить фильм?");
    api
      .saveMovie({ movie }, token)
      .then((newMovie) => {
        onSaveMovieClick(newMovie);
      })
      .then(() => setIsSaved(true))
      .catch((err) => {
        onSaveMovieClick(err);
      });
  }

  function handleDeleteMovie() {
    const savedMovie = currentPath === "/movies" ? savedMovies.find(
        (i) => Number(i.movieId) === Number(movie.id)) : movie;
    alert("Удалить фильм?");
    api
      .deleteMovie({ savedMovie }, token)
      .then((res) => {
        setIsSaved(false);
        return res;
      })
      .then((delMovie) => {
        onDeleteMovieClick(delMovie);
      })
      .catch((err) => {
        onDeleteMovieClick(err);
      });
  }

  return (
    <li className="movie bg-color__gray">
      <div className="movie__info">
        <div className="movie__text">
          <h2 className="title title__movie">{movie.nameRU}</h2>
          <p className="paragraph paragraph__duration text-color__grey">
            {Duration}
          </p>
        </div>
        {currentPath === "/movies" && !isSaved && (
          <Button
            type="button"
            className={buttonMovieClassName}
            onClick={handleSaveMovie}
          />
        )}
        {currentPath === "/movies" && isSaved && (
          <Button
            type="button"
            className={buttonMovieClassName}
            onClick={handleDeleteMovie}
          />
        )}
        {currentPath === "/saved-movies" && (
          <Button
            type="button"
            className="button button__movie button__movie_delete"
            onClick={handleDeleteMovie}
          />
        )}
      </div>
      {currentPath === "/movies" && (
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img src={URL} alt={movie.nameRU} className="movie__image" />
        </a>
      )}
      {currentPath === "/saved-movies" && (
        <a href={movie.trailer} target="_blank" rel="noreferrer">
          <img src={movie.image} alt={movie.nameRU} className="movie__image" />
        </a>
      )}
    </li>
  );
};

export default withRouter(Card);
