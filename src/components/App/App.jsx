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

import { ESC_CODE, MOBILE } from "../../utils/config";

import { useDispatch, useSelector } from "react-redux";
import {
  closeAllPopups,
  setCurrentPath,
} from "../../store/appSlice";
import { checkContent, logoutUser } from "../../store/userSlice";
import { initCountShowMovies, resetStore } from "../../store/movieSlice";

const App = ({ location }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentLang, isPopupOpen } = useSelector((state) => state.app);
  const { loggedIn } = useSelector((state) => state.users);

  const localToken = localStorage.getItem("jwt");

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

  if (loggedIn === null) {
    return <PageLoad />;
  }
  return (
    <TranslationContext.Provider value={translations[currentLang]}>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <ProtectedRoute path="/movies" component={Movies} />
        <ProtectedRoute path="/saved-movies" component={SavedMovies} />
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
