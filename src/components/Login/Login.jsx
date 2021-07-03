import React, { useEffect } from "react";
import Input from "../Input/Input.jsx";
import SignForm from "../SignForm/SignForm";
import PageServerRequest from "../PageServerRequest/PageServerRequest";
import { useFormWithValidation } from "../Hooks/useForm.jsx";

import { PATTERN_EMAIL, PATTERN_PASSWORD } from "../../utils/config";

import "./Login.css";

const Login = ({ onSignIn, buttonTitle, formDisabled }) => {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

    useEffect(() => {
      resetForm();
    }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(values.email, values.password);
  };

  const buttonClassName = `button__submit button__submit_login ${
    isValid && !formDisabled ? "button button__submit_active" : "button__submit_inactive"
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
          onChange={handleChange}
          value={values.email || ""}
          errors={errors.email}
          formDisabled={formDisabled}
          pattern={PATTERN_EMAIL}
        />
        <Input
          labelName="Пароль"
          type="password"
          inputName="password"
          inputClassName="input"
          errorClassName="input__error"
          onChange={handleChange}
          value={values.password || ""}
          errors={errors.password}
          formDisabled={formDisabled}
          pattern={PATTERN_PASSWORD}
        />
      </SignForm>
      <PageServerRequest className={pageServerRequestClassName} />
    </section>
  );
};

export default Login;
