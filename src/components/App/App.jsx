import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import movieApi from "../../utils/MovieApi.js";
import moviesData from "../../utils/MoviesData.js";
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

import { ESC_CODE, DURATION, MOBILE, PAD } from "../../utils/config";

import {
  ErrorEmailPassword,
  ErrorExistedEmail,
  RequiredAuthError,
} from "../../utils/errors/Errors";
import { useDispatch, useSelector } from "react-redux";
import { closeAllPopups } from "../../store/appSlice";
import { checkContent, logout } from "../../store/userSlice";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isPopupOpen } = useSelector((state) => state.app);
  const { loggedIn } = useSelector((state) => state.users);
  const [lang, setLang] = useState("ru"); // present lang

  const localToken = localStorage.getItem("jwt");

  const [state, setState] = useState({
    count: 0,
  });

  const [allMovies, setAllMovies] = useState([]);
  const [filteredAllMovies, setFilteredAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  useEffect(() => {
    checkToken();
    if (loggedIn === true) {
      history.push("/movies");
    } else {
      history.push("/");
    }
  }, []);

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
    if (width < MOBILE) {
      return setState({
        count: 5,
      });
    }
    if (width < PAD) {
      return setState({
        count: 6,
      });
    }
    if (width > PAD) {
      return setState({
        count: 8,
      });
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
  function checkToken() {
    if (!localToken) {
      dispatch(logout());
    } else {
      dispatch(checkContent(localToken));
    }
  }

  // API GET SAVED MOVIES
  function handleGetSavedMovies(user) {
    movieApi
      .getSavedMovies(localToken)
      .then((res) => {
        if (res.message) {
          return alert(res.message);
        }
        const mySavedMovies = res.filter((m) => m.owner._id === user._id);
        setSavedMovies(mySavedMovies);
        setFilteredSavedMovies(mySavedMovies);
      })
      .catch((err) => {
        //showError(err);
      });
  }

  // Fn GET ALL MOVIES
  function handleGetAllMovies() {
    moviesData
      .getMovies()
      .then((res) => {
        setAllMovies(res);
      })
      .catch((err) => {
        //showError(err);
      });
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

  function handleGetMoreMoviesClick() {
    setState((prevState, prevProps) => {
      return { count: prevState.count + 4 };
    });
  }

  // Fn SAVE MOVIE
  function handleSaveMovie(movieForSave, setIsSaved) {
    alert("Сохранить фильм?");
    movieApi
      .saveMovie({ movieForSave }, localToken)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        setIsSaved(true);
        alert("Фильм сохранен в вашей коллекции!");
      })
      .catch((err) => {
        //showError(err);
      });
  }

  // Fn DELETE MOVIE
  function handleDeleteMovie({ movieForDelete }, setIsSaved) {
    movieApi
      .deleteMovie({ movieForDelete }, localToken)
      .then((deletedMovie) => {
        setIsSaved(false);
        const newSavedMovies = savedMovies.filter(
          (m) => m._id !== deletedMovie._id
        );
        setSavedMovies(newSavedMovies);
        alert("Фильм успешно удален!");
      })
      .catch((err) => {
        //showError(err);
      });
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
          count={state.count}
          filteredAllMovies={filteredAllMovies}
          savedMovies={savedMovies}
          onSearchClick={handleSearch}
          onSaveMovieClick={handleSaveMovie}
          onDeleteMovieClick={handleDeleteMovie}
          onGetMoreMoviesClick={handleGetMoreMoviesClick}
          component={Movies}
        />
        <ProtectedRoute
          path="/saved-movies"
          savedMovies={savedMovies}
          filteredSavedMovies={filteredSavedMovies}
          resetFilteredAllMovies={setFilteredAllMovies}
          setFilteredSavedMovies={setFilteredSavedMovies}
          onSearchClick={handleSearch}
          onDeleteMovieClick={handleDeleteMovie}
          component={SavedMovies}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
        />
        <Route path="/signin">
          <Login buttonTitle="Войти" />
        </Route>
        <Route path="/signup">
          <Register buttonTitle="Зарегистрироваться" />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
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

export default App;
