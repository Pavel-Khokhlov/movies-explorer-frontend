import React, { useEffect } from "react";
import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Tech from "./Tech/Tech";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
// import { scrollAnimations } from "../Hooks/useScrollAnimation";

import "./Main.css";

const Main = () => {
  // useEffect(() => {
  //   scrollAnimations();
  // }, [])

  useEffect(() => {
    const animationItems = document.querySelectorAll(".animation_item");

    if (animationItems.length > 0) {
      window.addEventListener("scroll", scrollAnimation);
      function scrollAnimation() {
        animationItems.forEach((el) => {
          const itemHeight = el.offsetHeight;
          const itemOffset = el.offsetTop;
          const animationStart = 4;

          let animationItemPoint =
            window.innerHeight - itemHeight / animationStart;
          if (itemHeight > window.innerHeight) {
            animationItemPoint =
              window.innerHeight - window.innerHeight / animationStart;
          }

          if (
            window.scrollY > itemOffset - animationItemPoint &&
            window.scrollY < itemOffset + itemHeight
          ) {
            el.classList.add("_active");
          } else {
            if (!el.classList.contains("stop_animation")) {
              el.classList.remove("_active");
            }
          }
        });
      }
      setTimeout(() => {
        scrollAnimation();
      }, 300);
    }
  }, []);

  return (
    <section className="main">
      <Promo />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Portfolio />
    </section>
  );
};

export default Main;
