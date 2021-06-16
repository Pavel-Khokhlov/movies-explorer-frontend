import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Button from "../../components/Button/Button";

import { BEATFILM_URL, NO_IMAGE } from "../../utils/config";

import "./Card.css";

const Card = ({
  movie,
  savedMovies,
  location,
  onSaveMovieClick,
  onDeleteMovieClick,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  useEffect(() => {
    if (currentPath === "/movies"){
      checkIsSaved();
    }   
  }, [currentPath]);

  // DURATION
  const Hours = Math.floor(movie.duration / 60);
  const Minuts = movie.duration % 60;
  const Duration = `${Hours}ч ${Minuts}мин`;

  function checkSavedMovie() {
    debugger;
    return savedMovies.some(
      (item) =>
        item.owner._id === currentUser._id && item.movieId === movie.id
    );
  }

  // IS MOVIE SAVED ?
  function checkIsSaved() {
    if (savedMovies.length === 0) {
      return setIsSaved(false);
    }
    if (checkSavedMovie()) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }

  const URL = `${
    movie?.image?.url ? `${BEATFILM_URL}${movie.image.url}` : NO_IMAGE
  }`;

  function handleSaveMovie(e) {
    e.preventDefault();
    const movieForSave = movie;
    onSaveMovieClick(movieForSave, setIsSaved);
  }

  function handleDeleteMovie(e) {
    e.preventDefault();
    const movieForDelete =
      currentPath === "/movies"
        ? savedMovies.find((i) => Number(i.movieId) === Number(movie.id))
        : movie;
    alert("Удалить фильм?");
    onDeleteMovieClick({ movieForDelete }, setIsSaved);
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
            className="button button__movie button__movie_unsaved"
            onClick={handleSaveMovie}
          />
        )}
        {currentPath === "/movies" && isSaved && (
          <Button
            type="button"
            className="button button__movie button__movie_saved"
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
