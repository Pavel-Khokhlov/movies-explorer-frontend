import React, { useEffect } from "react";
import Input from "../Input/Input.jsx";
import SignForm from "../SignForm/SignForm";

import { createUser, showError, showTooltip } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { handleValuesChange, resetForm, validateMessage, validateSignupForm } from "../../store/formSlice";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.users);
  const { values, errors, isSignupFormValid } = useSelector((state) => state.forms);

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  const buttonClassName = `button button__submit ${
    isSignupFormValid ? "button__submit_active" : "button__submit_inactive"
  }`;

  const handleChange = (e) => {
    dispatch(
      handleValuesChange({ name: e.target.name, value: e.target.value })
    );
    dispatch(validateMessage(e.target.name));
    dispatch(validateSignupForm());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ values }));
    setTimeout(() => {
      handleShowInfo();
    }, 2000);
  };
  
  function handleShowInfo() {
    status === true
      ? dispatch(showTooltip())
      : dispatch(showError());
  }

  const buttonTitle = status === "loading" ? "Регистрация..." : "Зарегистрироваться";

  return (
    <section className="register">
      <div className="container">
        <SignForm
          title="Добро пожаловать!"
          buttonTitle={buttonTitle}
          buttonClassName={buttonClassName}
          onSubmit={handleSubmit}
        >
          <Input
            labelName="Имя"
            type="text"
            inputName="name"
            onInput={handleChange}
            value={values.name || ""}
            errors={errors.name}
          />
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
      </div>
    </section>
  );
};

export default Register;
