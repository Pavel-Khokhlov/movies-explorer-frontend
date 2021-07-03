import React, { useEffect } from "react";
import Input from "../Input/Input.jsx";
import SignForm from "../SignForm/SignForm";
import PageServerRequest from "../PageServerRequest/PageServerRequest";
import { useFormWithValidation } from "../Hooks/useForm.jsx";

import { PATTERN_EMAIL, PATTERN_PASSWORD } from "../../utils/config";

import "./Register.css";

const Register = ({ onSignUp, buttonTitle, formDisabled }) => {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

    useEffect(() => {
      resetForm();
    }, [resetForm]);

  const buttonClassName = `button__submit button__submit_reg ${
    isValid && !formDisabled
      ? "button button__submit_active"
      : "button__submit_inactive"
  }`;

  const pageServerRequestClassName = `${
    !formDisabled ? "server-request_inactive" : "server-request server-request_active"
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(values.name, values.email, values.password);
  };

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
          onChange={handleChange}
          value={values.name || ""}
          errors={errors.name}
          formDisabled={formDisabled}
        />
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
        />
      </SignForm>
      <PageServerRequest className={pageServerRequestClassName} />
    </section>
  );
};

export default Register;
