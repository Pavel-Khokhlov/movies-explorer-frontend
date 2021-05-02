import React from 'react';
import Button from "../../Button/Button";

import './NavTab.css';

const NavTab = () => {
  return (
    <section className="navtab">
      <Button
          type="button"
          className={`button button__promo`}
          btnTitle="Узнать больше"
        />
    </section>
  )
};

export default NavTab;
