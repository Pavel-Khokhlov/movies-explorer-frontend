import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <Header isLoggedIn={loggedIn} />
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
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
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
            window.location.href = "https://www.github.com/";
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
