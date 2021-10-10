import React from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { toggleCheckboxSearch } from "../../store/formSlice";

const CustomCheckbox = ({ buttonClassName, children }) => {
  const dispatch = useDispatch();

  function handleClickCheckbox(e) {
    dispatch(toggleCheckboxSearch());
  }

  return (
    <Button
      type="button"
      className={buttonClassName}
      onClick={handleClickCheckbox}
    >
      {children}
    </Button>
  );
};

export default CustomCheckbox;
