import React from "react";
import Button from "../Button/Button";
import NavAccount from "../NavAccount/NavAccount";
import NavMenu from "../NavMenu/NavMenu";

import "./PopupMenu.css";
import "./_opened/popup_opened.css";

const PopupMenu = ({ isOpen, onClose }) => {
  const popupOpenClassName = `popup ${isOpen ? "popup_opened" : ""}`;

  return (
    <section className={popupOpenClassName} onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <Button
          type="button"
          className="button button__close-popup"
          aria-label="вернуться на страницу"
          onClick={onClose}
        />
        <NavMenu className="popup__menu" onClose={onClose} />
        <NavAccount className="nav__account" onClose={onClose} />
      </div>
    </section>
  );
};

export default PopupMenu;
