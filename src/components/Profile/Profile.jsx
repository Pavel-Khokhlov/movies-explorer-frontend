import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Button from "../Button/Button";
import Line from "../Line/Line";
import Title from "../Title/Title";

import "./Profile.css";

const Profile = ({ onLogoutClick, onEditProfile, location }) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const currentUser = useContext(CurrentUserContext);
  const userTitle = `Привет, ${currentUser.name}!`;
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);

  useEffect(() => {
    localStorage.setItem("local-path", JSON.stringify(currentPath))
  }, [location]);

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangeUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(userName, userEmail);
  };

  return (
    <section className="profile">
      <form className="profile__container" method="POST">
        <Title className="title title__profile text-weight__medium">
          {userTitle}
        </Title>
        <div className="profile__block">
          <p className="paragraph">Имя</p>
          <input
            type="text"
            className="profile__input"
            value={userName}
            onChange={handleChangeUserName}
          />
        </div>
        <Line className="line line__color_grey" />
        <div className="profile__block">
          <p className="paragraph">E-mail</p>
          <input
            type="email"
            className="profile__input"
            value={userEmail}
            onChange={handleChangeUserEmail}
          />
        </div>
        <Button
          type="submit"
          className="button button__edit button__word"
          onClick={handleSubmit}
        >
          Редактировать
        </Button>
        <Button
          type="button"
          className="button button__word text-color__red text-weight__medium"
          onClick={onLogoutClick}
        >
          Выйти из аккаунта
        </Button>
      </form>
    </section>
  );
};

export default withRouter(Profile);
