import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import * as auth from "../../utils/auth.js";
import api from "../../utils/MainApi.js";
// import moviesApi from "../../utils/MoviesApi.js";
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
} from "../../utils/errors/Errors";

const App = () => {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
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
    api.patchUserInfo(name, email, token)
      .then((res) => {
      console.log(res);
      if (res.error) {
        throw new Error(400, res.error);
      }
      setCurrentUser(res);
    })
    .then(() => history.push('/profile'))
    .catch((err) => {
      showError(err);
    });
};

  // API GET USER INFO
  function handleGetUserInfo(token) {
    api
      .getUserInfo(token)
      .then((res) => {
        setCurrentUser(res);
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
        handleGetUserInfo(res.token);
        // handleGetCards(res.token)
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
  };

  const showError = (err) => {
    alert(err);
  };

  if (loggedIn === null) {
    return <PageLoad />;
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={loggedIn} onClick={handleMenuClick} />
        <Switch>
          <Route exact path="/" component={Main} />
          <ProtectedRoute
            path="/movies"
            isLoggedIn={loggedIn}
            component={Movies}
          />
          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={loggedIn}
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
