import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchSvg from "../../images/search.svg";
import { handleValuesChange } from "../../store/formSlice";
import { setFilteredMovies } from "../../store/movieSlice";
import Button from "../Button/Button";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

import "./SearchForm.css";

const SearchForm = () => {
  const dispatch = useDispatch();
  const { values, checkboxSearch } = useSelector((state) => state.forms);
  const { currentPath } = useSelector((state) => state.app);

  const [isInputFocus, setIsInputFocus] = useState(false);

  const handleChange = (e) => {
    dispatch(
      handleValuesChange({ name: e.target.name, value: e.target.value })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      setFilteredMovies({ search: values.search, checkboxSearch, currentPath })
    );
  }

  function handleInputFocus() {
    setIsInputFocus(true);
  }

  function handleInputBlur() {
    setIsInputFocus(false);
  }

  const customCheckboxClassName = `search__checkbox ${
    checkboxSearch ? "search__checkbox_active" : "search__checkbox_inactive"
  }`;

  const searchAreaClassName = `search__area ${
    isInputFocus ? "search__area_active" : "search__area_inactive"
  }`;

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
          value={values.search || ""}
          onChange={handleChange}
          autoComplete="off"
        />
        <Button
          type="submit"
          className="button button__search text-color__white"
        >
          Найти
        </Button>
        <span className="search__line" />
        <CustomCheckbox buttonClassName="button__checkbox button__checkbox_in">
          <span className={customCheckboxClassName}></span>
          <p className="paragraph">Короткометражка</p>
        </CustomCheckbox>
      </div>
      <CustomCheckbox buttonClassName="button__checkbox button__checkbox_out">
        <span className={customCheckboxClassName}></span>
        <p className="paragraph">Короткометражка</p>
      </CustomCheckbox>
    </form>
  );
};

export default SearchForm;
