import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { SavedMoviesContext } from "../../context/SavedMoviesContext";
import * as auth from "../../utils/auth.js";
import api from "../../utils/MainApi.js";
import userApi from "../../utils/UserApi.js";
import movieApi from "../../utils/MoviesApi.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import PageLoad from "../PageLoad/PageLoad";

import "./App.css";
import PopupMenu from "../PopupMenu/PopupMenu";

import {
  ErrorEmailPassword,
  ErrorExistedEmail,
  RequiredAuthError,
  FileNotFoundError,
} from "../../utils/errors/Errors";

const App = () => {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  const [movies, setMovies] = useState([]);
  console.log(movies);
  const [savedMovies, setSavedMovies] = useState([]);
  console.log(savedMovies);

  const localPath = `${
    localStorage.getItem("local-path")
      ? localStorage.getItem("local-path").replace(/"|\//g, "")
      : `movies`
  }`;

  useEffect(() => {
    if (loggedIn) {
      history.push(localPath);
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  // CLOSE POPUP BY ESC
  const handleEsc = (e) => {
    if (e.keyCode === 27) {
      closeAllPopups();
    }
  };

  const handleMenuClick = () => {
    setIsPopupMenuOpen(true);
    window.addEventListener("keydown", handleEsc);
  };

  const closeAllPopups = () => {
    setIsPopupMenuOpen(false);
    window.removeEventListener("keydown", handleEsc);
  };

  // AUTH TOKEN
  function checkToken() {
    // jwt токен в локальном хранилище браузера ?
    const token = localStorage.getItem("jwt");
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
          handleGetSavedMovies(token);
          console.log(token);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        showError(err);
        handleLogout();
      });
  }

  // API PATCH USER INFO
  const token = localStorage.getItem("jwt");

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
      })
      .then(() => history.push("/profile"))
      .catch((err) => {
        showError(err);
      });
  }

  // API GET USER INFO
  function handleGetUserInfo(token) {
    userApi
      .getUserInfo(token)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        showError(err);
      });
  }

  // API GET SAVED MOVIES
  function handleGetSavedMovies(token) {
    api
      .getSavedMovies(token)
      .then((res) => {
        console.log(res);
        if(res.message) {
          throw FileNotFoundError(res.message);
        }
        setSavedMovies(res);
        localStorage.setItem("saved-movies", JSON.stringify(res));
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
          return res;
        }
      })
      .then((res) => {
        history.push("/movies");
        handleGetUserInfo(res.token);
        handleGetSavedMovies(res.token);
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
          return res;
        }
      })
      .then((res) => {
        handleGetUserInfo(res.token);
      })
      .catch((err) => {
        showError(err);
      });
  };

  // LOGOUT
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("movies");
    localStorage.removeItem("saved-movies");
    localStorage.removeItem("local-path");
  };

  const showError = (err) => {
    alert(err);
  };

  function handleSearch(moviesForSearch, search, checked) {
    console.log(moviesForSearch);
    if (!moviesForSearch) {
      movieApi
        .getMovies()
        .then((res) => {
        setMovies(res);
        localStorage.setItem("movies", JSON.stringify(res));
      });
    } else if (checked) {
      const searchMovies = moviesForSearch.filter((i) => i.duration < 40);
      setMovies(searchMovies);
    } else {
      setMovies(moviesForSearch);
    }
  }

  // function handleToggleSave(movie, isSaved) {
  //   if (isSaved) {
  //     handleDelete(movie);
  //   } else {
  //     handleSave(movie);
  //   }
  // }

  function handleSaveMovie(object) {
    setSavedMovies([object, ...savedMovies]);
    //api
    //  .saveMovie(movie, token)
    //  .then((newMovie) => {
    //    setSavedMovies([newMovie, ...savedMovies]);
    //  })
    //  .then(() =>
    //    localStorage.setItem("saved-movies", JSON.stringify(savedMovies)//)
    //  )
    //  .then(() => localStorage.setItem("isSaved-status", true))
    //  .catch((err) => {
    //    showError(err);
    //  });
  }

  function handleDelete(movie, token) {
    console.log(token);
    console.log(movie);
  }

  if (loggedIn === null) {
    return <PageLoad />;
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <SavedMoviesContext.Provider value={savedMovies}>
          <Header isLoggedIn={loggedIn} onClick={handleMenuClick} />
          <Switch>
            <Route exact path="/" component={Main} />
            <ProtectedRoute
              path="/movies"
              movies={movies}
              isLoggedIn={loggedIn}
              onSearchClick={handleSearch}
              onSaveMovieClick={handleSaveMovie}
              component={Movies}
            />
            <ProtectedRoute
              path="/saved-movies"
              isLoggedIn={loggedIn}
              onSearchClick={handleSearch}
              onDeleteClick={handleDelete}
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
        </SavedMoviesContext.Provider>
      </CurrentUserContext.Provider>
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
    </>
  );
};

export default App;
