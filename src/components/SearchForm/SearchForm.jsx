import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import SearchSvg from "../../images/search.svg";
import Button from "../Button/Button";

import "./SearchForm.css";

const SearchForm = ({ onSearchClick, location }) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const [checked, setChecked] = useState(false);
  const [searchValue, setSearchValue] = useState(``);
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  function handleClickCheckbox(e) {
    if (e.target.classList.contains("checkbox_active")) {
      setChecked(false);
    } else {
      setChecked(true);
    }
    e.target.classList.toggle(`checkbox_active`);
  }

  function handleChangeSearch(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchValue.length === 0) {
      return alert("Введите текст для поиска");
    } else {
      onSearchClick(searchValue, checked, currentPath);
    }
  }

  function handleInputFocus() {
    setIsInputFocus(true);
  }

  function handleInputBlur() {
    setIsInputFocus(false);
  }

  const searchAreaClassName = `search__area ${isInputFocus ? "search__area_active" : "search__area_inactive"}`

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className={searchAreaClassName}>
        <img src={SearchSvg} alt="иконка поиск" className="search__icon" />
        <input
          type="text"
          name="search"
          placeholder="Фильмы"
          className="search__input"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={searchValue}
          onChange={handleChangeSearch}
          autoComplete="off"
        />
        <Button type="submit" className="button button__search text-color__white" >Найти</Button>
        <span className="search__line" />
        <div
          className="search__checkbox search__checkbox_in"
          onClick={handleClickCheckbox}
        >
          Короткометражка
          <input type="checkbox" name="checkbox" defaultChecked={checked} />
        </div>
      </div>
      <div
        className="search__checkbox search__checkbox_out"
        onClick={handleClickCheckbox}
      >
        Короткометражка
        <input type="checkbox" name="checkbox" defaultChecked={checked} />
      </div>
    </form>
  );
};

export default withRouter(SearchForm);
