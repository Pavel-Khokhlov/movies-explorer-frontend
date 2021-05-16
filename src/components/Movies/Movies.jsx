import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from "react-router-dom";
import { SavedMoviesContext } from "../../context/SavedMoviesContext";
import SearchForm from "../SearchForm/SearchForm";
import Line from "../Line/Line";
import Button from "../Button/Button";
import Card from "../Card/Card";

import './Movies.css';

const Movies = ({ movies, onSearchClick, onSaveMovieClick, location }) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const screenWidth = window.innerWidth;
  const [isWidth, setIsWidth] = useState(screenWidth);

  useEffect(() => {
    localStorage.setItem("local-path", JSON.stringify(currentPath))
  }, [location]);

  //choose the screen size
  function handleResize() {
    if (window.innerWidth < 500) {
      return setIsWidth(`mobile`);
    }
    if (window.innerWidth < 1000) {
      return setIsWidth(`pad`);
    }
    if (window.innerWidth > 1000) {
      return setIsWidth(`desktop`);
    }
  };

  // create an event listener
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", handleResize);
      console.log(isWidth);
    }, 1000);
  });

  return (
    <section className="section">
      <SearchForm onSearchClick={onSearchClick} />
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      <ul className="movies__list">
        {movies.map((movie) => {
          return (
            <Card
              key={movie.nameRU}
              movie={movie}
              onSaveMovieClick={onSaveMovieClick}
            />
          );
        })}
      </ul>
      {!movies && <Button type="button" className="button button__more bg-color__gray paragraph paragraph__size_s">Ещё</Button>}
    </section>
  )
};

export default withRouter(Movies);
