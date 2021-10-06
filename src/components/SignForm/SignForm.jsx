import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Title from "../Title/Title";

import "./SignForm.css";

const SignForm = ({
  title,
  buttonTitle,
  buttonClassName,
  children,
  onSubmit,
}) => {
const { currentPath } = useSelector((state) => state.app);

  return (
    <section className="form">
      <form
        className="form__container"
        method="POST"
        onSubmit={onSubmit}
      >
        <Logo className="form__logo" />
        <Title className="title form__title text-weight__medium">{title}</Title>
        {children}
        <Button type="submit" className={buttonClassName}>{buttonTitle}</Button>
        <div className="form__block">
        {currentPath === "/signup" && (
          <div className="form__redirect">
            <p className="form__paragraph text-color__grey">
              Уже зарегистрированы?
            </p>
            <NavLink
              to="/signin"
              className="button form__paragraph text-color__blue"
            >
              Войти
            </NavLink>
          </div>
        )}
        {currentPath === "/signin" && (
          <div className="form__redirect">
            <p className="form__paragraph text-color__grey">
              Еще не зарегистрированы?
            </p>
            <NavLink
              to="/signup"
              className="button form__paragraph text-color__blue"
            >
              Регистрация
            </NavLink>
          </div>
        )}
      </div>
      </form>
    </section>
  );
};

export default SignForm;
