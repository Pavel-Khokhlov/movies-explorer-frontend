import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openMenuPopup } from "../../store/appSlice";
import Button from "../Button/Button";
import NavAccount from "../NavAccount/NavAccount";
import NavMenu from "../NavMenu/NavMenu";
import NavSign from "../NavSign/NavSign";

import "./Navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.users);

  const handleMenuOpen = () => {
    dispatch(openMenuPopup());
  }
  return (
    <nav className="nav">
      {loggedIn ? (
        <Fragment>
          <NavMenu className="nav__menu nav__display" />
          <NavAccount className="nav__menu nav__display" />
          <Button
            type="button"
            className="button button__menu"
            onClick={handleMenuOpen}
          />
        </Fragment>
      ) : (
        <NavSign />
      )}
    </nav>
  );
};

export default Navigation;
