import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import Title from "../Title/Title";

import "./SignForm.css";

const SignForm = ({
  title,
  buttonTitle,
  buttonClassName,
  children,
  onValid,
  onSubmit,
  location,
  disabled,
}) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const { pathname } = location;
    setCurrentPath(pathname);
  }, [location]);

  return (
    <section className="form">
      <form className="form__container" method="post" onSubmit={onSubmit}>
        <Logo className="form__logo" />
        <Title className="title form__title text-weight__medium">{title}</Title>
        {children}
        <Button className={buttonClassName} disabled={disabled}>
          {buttonTitle}
        </Button>
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
      </form>
    </section>
  );
};

export default withRouter(SignForm);
