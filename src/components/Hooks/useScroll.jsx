import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScrolled } from "../../store/appSlice";

const useScroll = () => {
  const dispatch = useDispatch();
  const { scrolled } = useSelector((state) => state.app);

  useEffect(() => {
    const handleScroll = () => {
      let scrollPosition = window.scrollY;
      dispatch(setScrolled(scrollPosition));
    };
    window.addEventListener("scroll", handleScroll, false);
    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, [window.scrollY]);

  return {
    scrolled,
  };
};

export default useScroll;
