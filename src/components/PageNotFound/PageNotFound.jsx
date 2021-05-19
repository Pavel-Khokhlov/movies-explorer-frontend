import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../Button/Button";
import Paragraph from "../Paragraph/Paragraph";

import "./PageNotFound.css";

const PageNotFound = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <section className="nopage">
      <h2 className="title__nopage">404</h2>
      <Paragraph className="paragraph paragraph__nopage paragraph__size_s">
        Страница не найдена
      </Paragraph>
      <Button
        type="button"
        onClick={handleBack}
        className={`button button__word text-color__blue paragraph paragraph__size_s`}
      >
        Назад
      </Button>
    </section>
  );
};

export default PageNotFound;
