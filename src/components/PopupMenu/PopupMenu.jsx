import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAllPopups } from "../../store/appSlice";
import Button from "../Button/Button";
import NavAccount from "../NavAccount/NavAccount";
import NavMenu from "../NavMenu/NavMenu";

import "./PopupMenu.css";
import "./_opened/popup_opened.css";

const PopupMenu = () => {
  const dispatch = useDispatch();
  const { isMenuPopupOpen } = useSelector((state) => state.app);

  const handleClose = () => {
    dispatch(closeAllPopups());
  };

  const popupOpenClassName = `popup ${isMenuPopupOpen ? "popup_opened" : ""}`;

  return (
    <section className={popupOpenClassName} onClick={handleClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <Button
          type="button"
          className="button button__close-popup"
          aria-label="вернуться на страницу"
          onClick={handleClose}
        />
        <NavMenu className="popup__menu" onClose={handleClose} />
        <NavAccount className="nav__account" onClose={handleClose} />
      </div>
    </section>
  );
};

export default PopupMenu;
