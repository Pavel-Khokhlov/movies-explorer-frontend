import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth.js";
import movieApi from "../../utils/MovieApi.js";
import userApi from "../../utils/UserApi.js";
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

import "./App.css";

import { ESC_CODE } from '../../utils/config';

import {
  ErrorEmailPassword,
  ErrorExistedEmail,
  RequiredAuthError,
} from "../../utils/errors/Errors";

const App = () => {
  const history = useHistory();

  const token = localStorage.getItem("jwt");

  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  localStorage.setItem("movies", JSON.stringify(movies));
  localStorage.setItem("filtered-saved-movies", JSON.stringify(filteredSavedMovies));
  localStorage.setItem("all-movies", JSON.stringify(allMovies));

  useEffect(() => {
    checkToken();
    if (loggedIn === true) {
      history.push("/movies");
    } else {
      history.push("/");
    }
  }, [loggedIn]);

  // CLOSE POPUP BY ESC
  function handleEsc(e) {
    if (e.keyCode === ESC_CODE) {
      closeAllPopups();
    }
  }

  function handleMenuClick() {
    setIsPopupMenuOpen(true);
    window.addEventListener("keydown", handleEsc);
  }

  function closeAllPopups() {
    setIsPopupMenuOpen(false);
    window.removeEventListener("keydown", handleEsc);
  }

  // AUTH TOKEN ++++++
  function checkToken() {
    if (!token) {
      return handleLogout();
    }
    return auth
      .checkContent(token)
      .then((res) => {
        if (res.message) {
          throw new Error(res.message);
        }
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
          handleGetSavedMovies(res);
          handleGetAllMovies();
        }
      })
      .catch((err) => {
        showError(err);
        handleLogout();
      });
  }

  // API PATCH USER INFO ++++
  function handleEditProfile(name, email) {
    if (!token) {
      throw RequiredAuthError;
    }
    userApi
      .patchUserInfo(name, email, token)
      .then((res) => {
        if (res.error) {
          throw new Error(400, res.error);
        }
        setCurrentUser(res);
        history.push("/movies");
      })
      .catch((err) => {
        showError(err);
      });
  }

  // API GET SAVED MOVIES
  function handleGetSavedMovies(user) {
    movieApi
      .getSavedMovies(token)
      .then((res) => {
        if (res.message) {
          return alert(res.message);
        }
        const mySavedMovies = res.filter((m) => m.owner._id === user._id);
        setSavedMovies(mySavedMovies);
        setFilteredSavedMovies(mySavedMovies);
      })
      .catch((err) => {
        showError(err);
      });
  }

  // AUTH LOGIN
  const handleLogin = (email, password) => {
    auth
      .signin(email, password)
      .then((res) => {
        if (res.message) {
          throw ErrorEmailPassword(res.message);
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        showError(err);
      });
  };

  // AUTH REGISTRATION
  const handleRegister = (name, email, password) => {
    auth
      .signup(name, email, password)
      .then((res) => {
        if (res.message) {
          throw ErrorExistedEmail(res.message);
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        showError(err);
      });
  };

  // LOGOUT
  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser("");
    setAllMovies([]);
    setSavedMovies([]);
    setMovies([]);
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("filtered-saved-movies");
    localStorage.removeItem("all-movies");
  }

  function showError(err) {
    alert(err);
  }

  function handleGetAllMovies() {
    moviesData
      .getMovies()
      .then((res) => {
        setAllMovies(res);
      })
      .catch((err) => {
        showError(err);
      });
  }

  function handleSearch(searchValue, checkboxValue, currentPath) {
    if (currentPath === `/movies`) {
      seachInAllMovies(searchValue, checkboxValue);
    } else if (currentPath === `/saved-movies`) {
      seachInSavedMovies(searchValue, checkboxValue);
    }
  }

  function handleDurationCheck(array) {
    const res = array.filter((m) => m.duration < 40);
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
      setFilteredSavedMovies(handleCheckMoviesArr(filteredMovies));
    } else {
      const filteredMovies = handleSearchCheck(moviesForSearch, searchValue);
      setFilteredSavedMovies(handleCheckMoviesArr(filteredMovies));
    }
  }

  function seachInAllMovies(searchValue, checkboxValue) {
      const moviesForSearch = JSON.parse(localStorage.getItem("all-movies"));;
      if (checkboxValue) {
        const filteredMovies = handleSearchCheck(
          handleDurationCheck(moviesForSearch),
          searchValue
        );
        setMovies(handleCheckMoviesArr(filteredMovies));
      } else {
        const filteredMovies = handleSearchCheck(moviesForSearch, searchValue);
        setMovies(handleCheckMoviesArr(filteredMovies));
      }
  }

  function handleCheckMoviesArr(array) {
    if (array.length === 0) {
      alert("Фильмы не найдены");
      return [];
    } else {
      return array;
    }
  }

  function handleSaveMovie(object) {
    setSavedMovies([object, ...savedMovies]);
    setFilteredSavedMovies([object, ...savedMovies]);
  }

  function handleDeleteMovie(object) {
    const newMovies = savedMovies.filter((m) => m._id !== object._id);
    setSavedMovies(newMovies);
    setFilteredSavedMovies(newMovies);
  }

  if (loggedIn === null) {
    return <PageLoad />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isLoggedIn={loggedIn} onClick={handleMenuClick} />
      <Switch>
        <Route exact path="/" component={Main} />
        <ProtectedRoute
          path="/movies"
          movies={movies}
          isLoggedIn={loggedIn}
          onSearchClick={handleSearch}
          onSaveMovieClick={handleSaveMovie}
          onDeleteMovieClick={handleDeleteMovie}
          component={Movies}
        />
        <ProtectedRoute
          path="/saved-movies"
          isLoggedIn={loggedIn}
          onSearchClick={handleSearch}
          onDeleteMovieClick={handleDeleteMovie}
          component={SavedMovies}
        />
        <ProtectedRoute
          path="/profile"
          isLoggedIn={loggedIn}
          onLogoutClick={handleLogout}
          onEditProfile={handleEditProfile}
          component={Profile}
        />
        <Route path="/signin">
          <Login buttonTitle="Войти" onSignIn={handleLogin} />
        </Route>
        <Route path="/signup">
          <Register
            buttonTitle="Зарегистрироваться"
            onSignUp={handleRegister}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Route
        path="/facebook"
        component={() => {
          window.location.href = "https://www.facebook.com/";
        }}
      />
      <Route
        path="/github"
        component={() => {
          window.location.href = "https://github.com/Pavel-Khokhlov/";
        }}
      />
      <Route
        path="/google"
        component={() => {
          window.location.href = "https://www.google.com/";
        }}
      />
      <Route
        path="/yandex"
        component={() => {
          window.location.href = "https://praktikum.yandex.ru/";
        }}
      />
      <Route
        path="/mesto"
        component={() => {
          window.location.href =
            "https://pavel-khokhlov.github.io/mesto-react/";
        }}
      />
      <Route
        path="/travel"
        component={() => {
          window.location.href =
            "https://pavel-khokhlov.github.io/russian-travel/index.html";
        }}
      />
      <Route
        path="/how-to-learn"
        component={() => {
          window.location.href =
            "https://github.com/Pavel-Khokhlov/how-to-learn";
        }}
      />
      <Footer />
      <PopupMenu isOpen={isPopupMenuOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
};

export default App;
