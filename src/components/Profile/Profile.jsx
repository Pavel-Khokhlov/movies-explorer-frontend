import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Button from "../Button/Button";
import Line from "../Line/Line";
import Title from "../Title/Title";
import PageServerRequest from "../PageServerRequest/PageServerRequest";
import { useFormWithValidation } from "../Hooks/useForm.jsx";

import "./Profile.css";
import { PATTERN_EMAIL } from "../../utils/config";

const Profile = ({ onLogoutClick, onEditProfile, formDisabled }) => {
  const currentUser = useContext(CurrentUserContext);
  const userTitle = `Привет, ${currentUser.name}!`;
  const { values, errors, isValid, handleChange, resetFormCurrentUser } =
    useFormWithValidation();

  useEffect(() => {
    resetFormCurrentUser();
  }, [resetFormCurrentUser]);

  const newValueEmail = String(values.email).toLowerCase();

  const buttonEditClassName = `button__edit button__word ${
    isValid && !formDisabled
      ? "button button__edit_active"
      : "button__edit_inactive"
  }`;

  const buttonLogoutClassName = `button__word ${
    !formDisabled
      ? "button text-color__red text-weight__medium"
      : "button_inactive text-color__grey"
  }`;

  const pageServerRequestClassName = `${
    !formDisabled
      ? "server-request_inactive"
      : "server-request server-request_active"
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(values.name, newValueEmail);
  };

  function handleLogout(e) {
    e.preventDefault();
    onLogoutClick();
  }

  return (
    <section className="profile">
      <form
        className="profile__container"
        method="POST"
        onSubmit={handleSubmit}
        noValidate
      >
        <Title className="title title__profile text-weight__medium">
          {userTitle}
        </Title>
        <div className="profile__block">
          <p className="paragraph paragraph__profile">Имя</p>
          <input
            type="text"
            name="name"
            className="profile__input"
            value={values.name || ""}
            onChange={handleChange}
            disabled={formDisabled}
            minLength="2"
            required
          />
        </div>
        <p className="input__error">{errors.name}</p>
        <Line className="line line__color_grey" />
        <div className="profile__block">
          <p className="paragraph paragraph__profile">E-mail</p>
          <input
            type="email"
            name="email"
            className="profile__input"
            value={values.email || ""}
            onChange={handleChange}
            disabled={formDisabled}
            pattern={PATTERN_EMAIL}
            required
          />
        </div>
        <p className="input__error">{errors.email}</p>
        <Button type="submit" className={buttonEditClassName}>
          Редактировать
        </Button>
        <Button
          type="button"
          className={buttonLogoutClassName}
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </Button>
      </form>
      <PageServerRequest className={pageServerRequestClassName} />
    </section>
  );
};

export default Profile;
