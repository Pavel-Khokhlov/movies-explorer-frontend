import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import PopupMenu from "../PopupMenu/PopupMenu";
import PageLoad from "../PageLoad/PageLoad";

import {
  TranslationContext,
  translations,
} from "../../context/TranslationContext";

import "./App.css";

import { ESC_CODE, DURATION, MOBILE } from "../../utils/config";

import { useDispatch, useSelector } from "react-redux";
import { closeAllPopups, setCurrentPath } from "../../store/appSlice";
import { checkContent, logoutUser } from "../../store/userSlice";
import { initCountShowMovies, resetStore } from "../../store/movieSlice";

const App = ({ location }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPopupOpen } = useSelector((state) => state.app);
  const { loggedIn, token } = useSelector((state) => state.users);
  const { allMovies, savedMovies } = useSelector((state) => state.users);
  const [lang, setLang] = useState("ru"); // present lang

  const localToken = localStorage.getItem("jwt");

  const [filteredAllMovies, setFilteredAllMovies] = useState([]);
  // const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  useEffect(() => {
    handleDefineScreen();
  }, []);

  useEffect(() => {
    const { pathname } = location;
    dispatch(setCurrentPath(pathname));
  }, [location]);

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    loggedIn === true ? history.push("/movies") : history.push("/");
  }, [loggedIn]);

  // DEFINE SCREEN WIDTH
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const delayHandleWidth = delay(function defineWidth() {
      setWidth(window.innerWidth);
    }, 1000);
    window.addEventListener("resize", delayHandleWidth);
    return (_) => {
      window.removeEventListener("resize", delayHandleWidth);
    };
  });

  function delay(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  function handleDefineScreen() {
    if (width <= MOBILE) {
      return dispatch(initCountShowMovies(5));
    }
    if (width > MOBILE) {
      return dispatch(initCountShowMovies(7));
    }
  }

  // CLOSE POPUP BY ESC
  const handleEsc = (e) => {
    if (e.keyCode === ESC_CODE) {
      dispatch(closeAllPopups());
    }
  };

  isPopupOpen
    ? window.addEventListener("keydown", handleEsc)
    : window.removeEventListener("keydown", handleEsc);

  // AUTH TOKEN ++++++
  function handleCheckToken() {
    if (!localToken) {
      dispatch(logoutUser());
      dispatch(resetStore());
    } else {
      dispatch(checkContent(localToken));
    }
  }

  // Fn SEARCH REQUEST
  function handleSearch(searchValue, checkboxValue, currentPath) {
    setFilteredAllMovies([]);
    setFilteredSavedMovies([]);
    handleDefineScreen();
    if (currentPath === `/movies`) {
      seachInAllMovies(searchValue, checkboxValue);
    } else if (currentPath === `/saved-movies`) {
      seachInSavedMovies(searchValue, checkboxValue);
    }
  }

  // DURATION CHECK
  function handleDurationCheck(array) {
    const res = array.filter((m) => m.duration < DURATION);
    return res;
  }

  function handleSearchCheck(array, searchValue) {
    const res = array.filter((m) =>
      m.description
        .toLowerCase()
        .replace(/[.,%]/g, "")
        .includes(searchValue.toLowerCase())
    );
    return res;
  }

  function seachInSavedMovies(searchValue, checkboxValue) {
    const moviesForSearch = savedMovies;
    if (moviesForSearch.length === 0) {
      return alert("У вас нет сохраненных фильмов");
    }
    if (checkboxValue) {
      const filteredMovies = handleSearchCheck(
        handleDurationCheck(moviesForSearch),
        searchValue
      );
      setFilteredSavedMovies(handleCheckMoviesArray(filteredMovies));
    } else {
      const filteredMovies = handleSearchCheck(moviesForSearch, searchValue);
      setFilteredSavedMovies(handleCheckMoviesArray(filteredMovies));
    }
  }

  // SEARCH IN ALL MOVIES
  function seachInAllMovies(searchValue, checkboxValue) {
    const moviesForSearch = allMovies;
    if (checkboxValue) {
      const filteredMovies = handleSearchCheck(
        handleDurationCheck(moviesForSearch),
        searchValue
      );
      setFilteredAllMovies(handleCheckMoviesArray(filteredMovies));
    } else {
      const filteredMovies = handleSearchCheck(moviesForSearch, searchValue);
      setFilteredAllMovies(handleCheckMoviesArray(filteredMovies));
    }
  }

  function handleCheckMoviesArray(array) {
    if (array.length === 0) {
      alert("Фильмы не найдены");
      return [];
    } else {
      return array;
    }
  }

  if (loggedIn === null) {
    return <PageLoad />;
  }
  return (
    <TranslationContext.Provider value={translations[lang]}>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <ProtectedRoute
          path="/movies"
          onSearchClick={handleSearch}
          component={Movies}
        />
        <ProtectedRoute
          path="/saved-movies"
          onSearchClick={handleSearch}
          component={SavedMovies}
        />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="*" component={PageNotFound} />
      </Switch>
      <Route
        path="/google"
        component={() => {
          window.location.href = "https://www.google.com/";
        }}
      />
      <Footer />
      <PopupMenu />
    </TranslationContext.Provider>
  );
};

export default withRouter(App);
