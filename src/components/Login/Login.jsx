import React, { useEffect } from "react";
import Input from "../Input/Input.jsx";
import SignForm from "../SignForm/SignForm";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleValuesChange,
  resetForm,
  validateLoginForm,
  validateMessage,
} from "../../store/formSlice.js";
import { checkContent, loginUser, showError, showTooltip } from "../../store/userSlice.js";
import { useHistory } from "react-router";

const Login = ({ buttonTitle }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { values, errors, isLoginFormValid } = useSelector(
    (state) => state.forms
  );
  const { status, token } = useSelector(
    (state) => state.users
  );

  const formDisabled = false;

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  const buttonClassName = `button__submit button__submit_login ${
    isLoginFormValid
      ? "button button__submit_active"
      : "button__submit_inactive"
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
    dispatch(validateLoginForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ values }));
    dispatch(checkContent(token));
    setTimeout(() => {
      handleShowInfo();
    }, 500);
  };

  const handleShowInfo = () => {
    status || status === null ? dispatch(showTooltip()) && 
    history.push("/movies") : dispatch(showError());
  }

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
          onInput={handleChange}
          value={values.email || ""}
          errors={errors.email}
        />
        <Input
          labelName="Пароль"
          type="password"
          inputName="password"
          onInput={handleChange}
          value={values.password || ""}
          errors={errors.password}
        />
      </SignForm>
    </section>
  );
};

export default Login;
