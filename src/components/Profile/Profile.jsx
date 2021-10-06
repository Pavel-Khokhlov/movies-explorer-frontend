import React, { useEffect } from "react";
import Button from "../Button/Button";
import Line from "../Line/Line";
import Title from "../Title/Title";
import PageServerRequest from "../PageServerRequest/PageServerRequest";

import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleValuesChange,
  resetFormCurrentUser,
  validateMessage,
  validateProfileForm,
} from "../../store/formSlice";
import { logoutUser, patchUser, showError, showTooltip } from "../../store/userSlice";
import { resetStore } from "../../store/movieSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, token, status } = useSelector((state) => state.users);
  const { values, errors, isEditProfileFormValid } = useSelector(
    (state) => state.forms
  );
  const userTitle = `Привет, ${currentUser.name}!`;

  const formDisabled = false;

  useEffect(() => {
    dispatch(resetFormCurrentUser(currentUser));
  }, [currentUser]);

  const handleShowInfo = () => {
    status || status === null ? dispatch(showTooltip()) : dispatch(showError());
  }

  const buttonEditClassName = `button__edit button__word ${
    isEditProfileFormValid
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

  const handleChange = (e) => {
    dispatch(
      handleValuesChange({ name: e.target.name, value: e.target.value })
    );
    dispatch(validateMessage(e.target.name));
    dispatch(validateProfileForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      patchUser({ name: values.name, email: values.email, token: token })
    );
    setTimeout(() => {
      handleShowInfo();
    }, 500);
  };

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());
    dispatch(resetStore());
    setTimeout(() => {
      handleShowInfo();
    }, 500);
  }

  const buttonTitle = status === "loading" ? "Редактирование..." : "Редактировать";

  return (
    <section className="profile">
      <form
        className="profile__container"
        method="POST"
        onSubmit={handleSubmit}
      >
        <Title className="title title__profile text-weight__medium">
          {userTitle}
        </Title>
        <div className="profile__block">
          <p className="paragraph paragraph__profile">Имя</p>
          <input
            type="text"
            name="name"
            id="name"
            className="profile__input"
            value={values.name || ""}
            onInput={handleChange}
          />
        </div>
        <p className="input__error">{errors.name}</p>
        <Line className="line line__color_grey" />
        <div className="profile__block">
          <p className="paragraph paragraph__profile">E-mail</p>
          <input
            type="email"
            name="email"
            id="email"
            className="profile__input"
            value={values.email}
            onInput={handleChange}
          />
        </div>
        <p className="input__error">{errors.email}</p>
        <Button type="submit" className={buttonEditClassName}>
          {buttonTitle}
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
