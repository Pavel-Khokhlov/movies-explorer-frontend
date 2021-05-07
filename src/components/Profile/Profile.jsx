import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Button from "../Button/Button";
import Line from "../Line/Line";
import Title from "../Title/Title";

import "./Profile.css";

const Profile = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">
      <form className="profile__container" method="POST">
        <Title className="title title__profile text-weight__medium">Привет, Павел!</Title>
        <div className="profile__block">
          <p className="paragraph">Имя</p>
          <input type="text" className="profile__input" placeholder="Павел" />
        </div>
        <Line className="line line__color_grey" />
        <div className="profile__block">
          <p className="paragraph">E-mail</p>
          <input
            type="email"
            className="profile__input"
            placeholder="pochta@ya.ru"
          />
        </div>
        <Button type="submit" className="button button__edit button__word">
          Редактировать
        </Button>
        <Button
          type="button"
          className="button button__word text-color__red text-weight__medium"
        >
          Выйти из аккаунта
        </Button>
      </form>
    </section>
  );
};

export default Profile;
