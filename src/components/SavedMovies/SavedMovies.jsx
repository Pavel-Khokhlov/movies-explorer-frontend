import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { SavedMoviesContext } from "../../context/SavedMoviesContext";
import Line from "../Line/Line";
import SearchForm from "../SearchForm/SearchForm";
import Card from "../Card/Card";

import "./SavedMovies.css";

const SavedMovies = ({ onSearchClick, onDeleteMovieClick, location }) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const savedMovies = useContext(SavedMoviesContext);

  useEffect(() => {
    localStorage.setItem("local-path", JSON.stringify(currentPath));
  }, [location]);

  return (
    <section className="section">
      <SearchForm onSearchClick={onSearchClick}/>
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      {savedMovies && (<ul className="movies__list">
        {savedMovies.map((movie) => {
          return (
            <Card
              key={movie._id}
              movie={movie}
              onDeleteMovieClick={onDeleteMovieClick}
            />
          );
        })}
      </ul>)}
      {savedMovies.length === 0 && (<p className="paragraph paragraph__tech text-color__grey" >Вы еще не сохранили ни одного фильма</p>)}
    </section>
  );
};

export default withRouter(SavedMovies);
