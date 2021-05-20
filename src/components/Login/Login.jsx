import React, { useState, useEffect } from "react";
import Input from "../Input/Input.jsx";
import SignForm from "../SignForm/SignForm";
import PageServerRequest from "../PageServerRequest/PageServerRequest";

import "./Login.css";

const Login = ({ onSignIn, buttonTitle, formDisabled }) => {
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
  }, [email, password]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
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
    if (isEmailValid && isPasswordValid) {
      return setIsFormValid(true);
    }
    return setIsFormValid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  const buttonClassName = `button__submit button__submit_login ${
    isFormValid && !formDisabled ? "button button__submit_active" : "button__submit_inactive"
  }`;

  const pageServerRequestClassName = `${
    !formDisabled ? "server-request_inactive" : "server-request server-request_active"
  }`;

  return (
    <section className="login">
      <SignForm
        title={`Рады видеть!`}
        buttonTitle={buttonTitle}
        buttonClassName={buttonClassName}
        onSubmit={handleSubmit}
      >
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
      <PageServerRequest className={pageServerRequestClassName} />
    </section>
  );
};

export default Login;
