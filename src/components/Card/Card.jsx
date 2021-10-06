import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../components/Button/Button";

import { BEATFILM_URL, NO_IMAGE } from "../../utils/config";

import "./Card.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, saveMovie } from "../../store/movieSlice";

const Card = ({ movie }) => {
  const dispatch = useDispatch();
  const { savedMovies } = useSelector((state) => state.movies);
  const { token } = useSelector((state) => state.users);
  const { currentPath } = useSelector((state) => state.app);

  const isSavedMovie = () => {
    if (savedMovies.length > 0) {
      return currentPath === "/movies"
        ? savedMovies.some((item) => Number(item.movieId) === Number(movie.id))
        : "";
    }
  };

  // function findMovieId() {
  //   if (currentPath === "/movies") {
  //     const foundMovie = savedMovies.filter(
  //       (item) =>
  //         item.description === movie.description && item.owner._id // === currentUser._id
  //     );
  //     return foundMovie._id;
  //   }
  //   if (currentPath === "/saved-movies"){
  //     return movie._id;
  //   }
  // }
  // DURATION
  const Hours = Math.floor(movie.duration / 60);
  const Minuts = movie.duration % 60;
  const Duration = `${Hours}ч ${Minuts}мин`;

  const URL = movie?.image?.url ? BEATFILM_URL + movie.image.url : NO_IMAGE;

  function handleSaveMovie(e) {
    e.preventDefault();
    dispatch(saveMovie({ movie, token }));
  }

  const movieForDelete = currentPath === "/movies" ? Number(movie.id) : Number(movie.movieId);
  console.log(movieForDelete);

  function handleDeleteMovie(e) {
    e.preventDefault();
    dispatch(deleteMovie({ movieForDelete, token }));
  }

  let hrefLink = "";
  let srcLink = "";
  if (currentPath === "/movies") {
    hrefLink = movie.trailerLink;
    srcLink = URL;
  } else {
    hrefLink = movie.trailer;
    srcLink = movie.image;
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
        {currentPath === "/movies" && !isSavedMovie() && (
          <Button
            type="button"
            className="button button__movie button__movie_unsaved"
            onClick={handleSaveMovie}
          />
        )}
        {currentPath === "/movies" && isSavedMovie() && (
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
      <a href={hrefLink} target="_blank" rel="noreferrer">
        <img src={srcLink} alt={movie.nameRU} className="movie__image" />
      </a>
    </li>
  );
};

export default withRouter(Card);
