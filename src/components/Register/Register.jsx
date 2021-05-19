import React, { useState, useEffect } from "react";
import Input from "../Input/Input.jsx";
import SignForm from "../SignForm/SignForm";

import "./Register.css";

const Register = ({ onSignUp, buttonTitle, formDisabled }) => {
  const [name, setName] = useState("");
  const [nameErrMessage, setNameErrMessage] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);

  const [email, setEmail] = useState("");
  const [emailErrMessage, setEmailErrMessage] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordErrMessage, setPasswordErrMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEmail("");
      setEmailErrMessage("");
      setIsEmailValid(false);
      setPassword("");
      setPasswordErrMessage("");
      setIsPasswordValid(false);
      setIsFormValid(false);
    }, 500);
  }, []);

  useEffect(() => {
    validateForm();
  }, [name, email, password]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
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

  const validatePassword = (value) => {
    if (!value) {
      setPasswordErrMessage("Необходимо ввести пароль");
      return setIsPasswordValid(false);
    }
    if (value.length < 8) {
      setPasswordErrMessage("Пароль должен быть больше 8 символов");
      return setIsPasswordValid(false);
    }
    setPasswordErrMessage("");
    return setIsPasswordValid(true);
  };

  const validateForm = () => {
    if (isNameValid && isEmailValid && isPasswordValid) {
      return setIsFormValid(true);
    }
    return setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(name, email, password);
  };

  const buttonClassName = `button__submit button__submit_reg ${
    isFormValid && !formDisabled
      ? "button button__submit_active"
      : "button__submit_inactive"
  }`;

  return (
    <section className="register">
      <SignForm
        title={`Добро пожаловать!`}
        buttonTitle={buttonTitle}
        buttonClassName={buttonClassName}
        onSubmit={handleSubmit}
      >
        <Input
          labelName="Имя"
          type="name"
          inputName="name"
          inputClassName="input"
          errorClassName="input__error"
          onChange={handleChangeName}
          value={name || ""}
          errors={nameErrMessage}
          formDisabled={formDisabled}
        />
        <Input
          labelName="E-mail"
          type="email"
          inputName="email"
          inputClassName="input"
          errorClassName="input__error"
          onChange={handleChangeEmail}
          value={email || ""}
          errors={emailErrMessage}
          formDisabled={formDisabled}
        />
        <Input
          labelName="Пароль"
          type="password"
          inputName="password"
          inputClassName="input"
          errorClassName="input__error"
          onChange={handleChangePassword}
          value={password || ""}
          errors={passwordErrMessage}
          formDisabled={formDisabled}
        />
      </SignForm>
    </section>
  );
};

export default Register;
