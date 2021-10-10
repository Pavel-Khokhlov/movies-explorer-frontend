// windows.innerHeight - высота окна браузера

// animateItemOffset - высота элемента
export const scrollAnimations = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const animationItems = document.querySelectorAll(".animation_item");

      const scrollAnimation = () => {
        let windowCenter = window.innerHeight / 2 + window.scrollY;
        animationItems.forEach((el) => {
          let scrollOffset = el.offsetTop + el.offsetHeight / 2;
          windowCenter >= scrollOffset
            ? el.classList.add("._active")
            : el.classList.remove("._active");
        });
      };
      window.addEventListener("scroll", () => {
        scrollAnimation();
      });
    });
};
