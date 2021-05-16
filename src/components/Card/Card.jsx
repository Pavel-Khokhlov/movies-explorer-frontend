import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { SavedMoviesContext } from "../../context/SavedMoviesContext";
import api from "../../utils/MainApi.js";
import Button from "../../components/Button/Button";

import "./Card.css";

const Card = ({ movie, location, onSaveMovieClick, onDeleteClick}) => {
  const savedMovies = useContext(SavedMoviesContext);
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
  }, [])

  // DURATION
  const Hours = Math.floor(movie.duration / 60);
  const Minuts = movie.duration % 60;
  const Duration = `${Hours}ч ${Minuts}мин`;

  // IS MOVIE SAVED ?
  function checkIsSaved() {
    if(savedMovies.some(
      (element) =>
        element.owner._id === currentUser._id &&
        element.description === movie.description)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
  };

  // const isSaved = savedMovies.some(
  //   (element) =>
  //     element.owner._id === currentUser._id &&
  //     element.description === movie.description
  // );

  const URL = `${
    movie?.image?.url
      ? `https://api.nomoreparties.co${movie.image.url}`
      : `https://pbs.twimg.com/media/D5go_L8W4AAI2O_.jpg`
  }`;

  const buttonMovieClassName = `button button__movie ${
    isSaved ? "button__movie_saved" : "button__movie_unsaved"
  }`;

  function handleToggleSave(e) {
    e.preventDefault();
    if(isSaved) {
      handleDeleteMovie();
    } else {
      handleSaveMovie();
    }
  }

  function handleSaveMovie() {
    alert("Сщхранить фильм?");
    api
      .saveMovie({ movie }, token)
      .then((newMovie) => {
        onSaveMovieClick(newMovie);
      })
      .then(() =>
        setIsSaved(true)
      )
      .catch((err) => {
        onSaveMovieClick(err);
      });
  }

  function handleDeleteMovie() {
    alert("Удалить фильм?");
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
        {currentPath === "/movies" && (
          <Button
            type="button"
            className={buttonMovieClassName}
            onClick={handleToggleSave}
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
