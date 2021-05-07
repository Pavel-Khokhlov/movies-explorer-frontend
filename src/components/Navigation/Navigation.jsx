import React from "react";
import Button from "../Button/Button";
import NavAccount from "../NavAccount/NavAccount";
import NavMenu from "../NavMenu/NavMenu";
import NavSign from "../NavSign/NavSign";

import "./Navigation.css";

const Navigation = ({ isLoggedIn, onClick }) => {
  return (
    <>
      <nav className="nav">
        {isLoggedIn ? (
          <>
            <NavMenu className="nav__menu" />
            <NavAccount className="nav__menu" />
          </>
        ) : (
          <NavSign />
        )}
      </nav>
      {isLoggedIn && (
        <Button
          type="button"
          className="button button__menu"
          onClick={onClick}
        />
      )}
    </>
  );
};

export default Navigation;
