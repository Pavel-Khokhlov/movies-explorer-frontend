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

import { ESC_CODE, DURATION } from "../../utils/config";

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
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState({
    count: 4,
  });

  const [allMovies, setAllMovies] = useState([]);
  const [filteredAllMovies, setFilteredAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  localStorage.setItem("allMovies", JSON.stringify(allMovies));
  localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

  useEffect(() => {
    checkToken();
    setCount({ count: 4 });
    if (loggedIn === true) {
      history.push("/movies");
    } else {
      history.push("/");
    }
  }, [loggedIn]);

  // useEffect(() => {
  //   setMovies([]);
  // }, []);

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
  function handleEditProfile(name, email, setIsFormValid) {
    if (!token) {
      throw RequiredAuthError;
    }
    setDisabled(true);
    userApi
      .patchUserInfo(name, email, token)
      .then((res) => {
        if (res.error) {
          throw new Error(400, res.error);
        }
        setCurrentUser(res);
        history.push("/profile");
        setDisabled(false);
        setIsFormValid(false);
        alert("Профиль успешно изменен!");
      })
      .catch((err) => {
        showError(err);
        setDisabled(false);
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
    setDisabled(true);
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
          setDisabled(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        showError(err);
        setDisabled(false);
      });
  };

  // AUTH REGISTRATION
  const handleRegister = (name, email, password) => {
    setDisabled(true);
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
          setDisabled(false);
        }
      })
      .catch((err) => {
        showError(err);
        setDisabled(false);
      });
  };

  // LOGOUT
  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser("");
    setAllMovies([]);
    setSavedMovies([]);
    localStorage.removeItem("jwt");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("savedMovies");
  }

  // Fn GET ALL MOVIES
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

  // Fn SEARCH REQUEST
  function handleSearch(searchValue, checkboxValue, currentPath) {
    setCount({ count: 4 });
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
    setCount((prevState, prevProps) => {
      return { count: prevState.count + 4 };
    });
  }

  // Fn SAVE MOVIE
  function handleSaveMovie(movieForSave, setIsSaved) {
    alert("Сохранить фильм?");
    movieApi
      .saveMovie({ movieForSave }, token)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        setIsSaved(true);
        alert("Фильм сохранен в вашей коллекции!");
      })
      .catch((err) => {
        showError(err);
      });
  }

  // Fn DELETE MOVIE
  function handleDeleteMovie({ movieForDelete }, setIsSaved) {
    movieApi
      .deleteMovie({ movieForDelete }, token)
      .then((deletedMovie) => {
        setIsSaved(false);
        const newSavedMovies = savedMovies.filter(
          (m) => m._id !== deletedMovie._id
        );
        setSavedMovies(newSavedMovies);
        alert("Фильм успешно удален!");
      })
      .catch((err) => {
        showError(err);
      });
  }

  function showError(err) {
    alert(err);
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
          count={count.count}
          filteredAllMovies={filteredAllMovies}
          savedMovies={savedMovies}
          isLoggedIn={loggedIn}
          onSearchClick={handleSearch}
          onSaveMovieClick={handleSaveMovie}
          onDeleteMovieClick={handleDeleteMovie}
          onGetMoreMoviesClick={handleGetMoreMoviesClick}
          component={Movies}
        />
        <ProtectedRoute
          path="/saved-movies"
          isLoggedIn={loggedIn}
          savedMovies={savedMovies}
          filteredSavedMovies={filteredSavedMovies}
          resetFilteredAllMovies={setFilteredAllMovies}
          setFilteredSavedMovies={setFilteredSavedMovies}
          onSearchClick={handleSearch}
          onDeleteMovieClick={handleDeleteMovie}
          formDisabled={disabled}
          component={SavedMovies}
        />
        <ProtectedRoute
          path="/profile"
          isLoggedIn={loggedIn}
          onLogoutClick={handleLogout}
          onEditProfile={handleEditProfile}
          formDisabled={disabled}
          component={Profile}
        />
        <Route path="/signin">
          <Login
            buttonTitle="Войти"
            onSignIn={handleLogin}
            formDisabled={disabled}
          />
        </Route>
        <Route path="/signup">
          <Register
            buttonTitle="Зарегистрироваться"
            onSignUp={handleRegister}
            formDisabled={disabled}
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
