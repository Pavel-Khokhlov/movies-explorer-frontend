import React from "react";
import Button from "../Button/Button";
import Line from "../Line/Line";
import SearchForm from "../SearchForm/SearchForm";
import Card from "../Card/Card";

import "./SavedMovies.css";

const SavedMovies = ({ onSearchClick, onDeleteMovieClick }) => {
  const filteredSavedMovies = JSON.parse(localStorage.getItem("filtered-saved-movies"));

  return (
    <section className="section">
      <SearchForm onSearchClick={onSearchClick}/>
      <Line className="line line__color_grey" />
      {/* MOVIES */}
      {filteredSavedMovies.length > 0 && (<ul className="movies__list">
        {filteredSavedMovies.map(movie => {
          return (
            <Card
              key={movie._id}
              movie={movie}
              onDeleteMovieClick={onDeleteMovieClick}
            />
          );
        })}
      </ul>)}
      {filteredSavedMovies.length === 0 && (<p className="paragraph paragraph__saved-movies text-color__grey" >Фильмы отсутствуют</p>)}
    </section>
  );
};

export default SavedMovies;
