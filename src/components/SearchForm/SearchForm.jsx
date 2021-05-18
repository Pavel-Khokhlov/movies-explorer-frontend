import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import SearchSvg from "../../images/search.svg";
import Button from "../Button/Button";

import "./SearchForm.css";

const SearchForm = ({onSearchClick, location}) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const [checked, setChecked] = useState(false);
  const [searchValue, setSearchValue] = useState(``);

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
  };

  function handleChangeSearch(e) {
    setSearchValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchValue.length === 0){
      return alert('Введите текст для поиска');
    } else {
      onSearchClick(searchValue, checked, currentPath);
    }
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search__area">
        <img src={SearchSvg} alt="иконка поиск" className="search__icon" />
        <input type="text" name="search" placeholder="Фильмы" className="search__input" value={searchValue} onChange={handleChangeSearch} />
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

export default withRouter(SearchForm);
