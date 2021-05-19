import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Button from "../Button/Button";
import Line from "../Line/Line";
import Title from "../Title/Title";

import "./Profile.css";

const Profile = ({ onLogoutClick, onEditProfile, formDisabled }) => {
  const currentUser = useContext(CurrentUserContext);
  const userTitle = `Привет, ${currentUser.name}!`;
  const [name, setName] = useState(currentUser.name);
  const [nameErrMessage, setNameErrMessage] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const [email, setEmail] = useState(currentUser.email);
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setName(currentUser.name);
      setNameErrMessage("");
      setIsNameValid(true);
      setEmail(currentUser.email);
      setEmailErrMessage("");
      setIsEmailValid(true);
      setIsFormValid(false);
    }, 500);
  }, []);

  useEffect(() => {
    validateForm();
  }, [name, email]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validateName = (value) => {
    if (!value) {
      setNameErrMessage("Необходимо ввести имя");
      return setIsNameValid(false);
    }
    if (value.length < 2) {
      setNameErrMessage("Имя должено быть больше 2 символов");
      return setIsNameValid(false);
    }
    setNameErrMessage("");
    return setIsNameValid(true);
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailErrMessage("Необходимо ввести E-mail");
      return setIsEmailValid(false);
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      setEmailErrMessage("Введите корректный E-mail");
      return setIsEmailValid(false);
    }
    setEmailErrMessage("");
    return setIsEmailValid(true);
  };

  const validateForm = () => {
    if (isNameValid && isEmailValid) {
      return setIsFormValid(true);
    }
    return setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile(name, email);
  };

  function handleLogout(e) {
    e.preventDefault();
    onLogoutClick();
  }

  const buttonEditClassName = `button__edit button__word ${
    isFormValid && !formDisabled
      ? "button button__edit_active"
      : "button__edit_inactive"
  }`;

  const buttonLogoutClassName = `button__word ${
    !formDisabled
      ? "button text-color__red text-weight__medium"
      : "button_inactive text-color__grey"
  }`;

  return (
    <section className="profile">
      <form className="profile__container" method="POST">
        <Title className="title title__profile text-weight__medium">
          {userTitle}
        </Title>
        <div className="profile__block">
          <p className="paragraph paragraph__profile">Имя</p>
          <input
            type="text"
            className="profile__input"
            value={name}
            onChange={handleChangeName}
            disabled={formDisabled}
          />
        </div>
        <p className="input__error">{nameErrMessage}</p>
        <Line className="line line__color_grey" />
        <div className="profile__block">
          <p className="paragraph paragraph__profile">E-mail</p>
          <input
            type="email"
            className="profile__input"
            value={email}
            onChange={handleChangeEmail}
            disabled={formDisabled}
          />
        </div>
        <p className="input__error">{emailErrMessage}</p>
        <Button
          type="submit"
          className={buttonEditClassName}
          onClick={handleSubmit}
        >
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
    </section>
  );
};

export default Profile;
