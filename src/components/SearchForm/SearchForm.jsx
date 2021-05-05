import React, { useState } from "react";

import "./SearchForm.css";

import SearchSvg from "../../images/search.svg";
import Button from "../Button/Button";

const SearchForm = () => {
  const [checked, setChecked] = useState(false);

  const handleClickCheckbox = (e) => {
    if (e.target.classList.contains("checkbox_active")) {
      setChecked(false);
    } else {
      setChecked(true);
    }
    e.target.classList.toggle(`checkbox_active`);
  };

  return (
    <form className="search">
      <div className="search__area">
        <img src={SearchSvg} alt="иконка поиск" className="search__icon" />
        <input type="text" placeholder="Фильмы" className="search__input" />
        <Button type="submit" className="button button__search" />
        <span className="search__line" />
        <div className="search__checkbox search__checkbox_in" onClick={handleClickCheckbox}>
          Короткометражка
          <input type="checkbox" name="checkbox" defaultChecked={checked} />
        </div>
      </div>
      <div className="search__checkbox search__checkbox_out" onClick={handleClickCheckbox}>
          Короткометражка
          <input type="checkbox" name="checkbox" defaultChecked={checked} />
        </div>
    </form>
  );
};

export default SearchForm;
