import React, { useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";

import "./App.css";
import PopupMenu from "../PopupMenu/PopupMenu";

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

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

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={loggedIn} onClick={handleMenuClick} />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
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
          window.location.href = "https://pavel-khokhlov.github.io/mesto-react/";
        }}
      />
      <Route
        path="/travel"
        component={() => {
          window.location.href = "https://pavel-khokhlov.github.io/russian-travel/index.html";
        }}
      />
      <Route
        path="/how-to-learn"
        component={() => {
          window.location.href = "https://github.com/Pavel-Khokhlov/how-to-learn";
        }}
      />
      <Footer />
      <PopupMenu isOpen={isPopupMenuOpen} onClose={closeAllPopups} />
    </BrowserRouter>
  );
}

export default App;
