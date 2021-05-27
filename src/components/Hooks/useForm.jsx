import { useState, useContext, useCallback } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export function useForm() {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

export function useFormWithValidation() {
  const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateMessage = (target) => {
    if (target.name === "name") {
      if (target.value.length === 0) {
        return "Необходимо ввести имя";
      }
      if (target.value.length < 2) {
        return "Имя должено быть больше 2 символов";
      }
      return "";
    }
    if (target.name === "email") {
      if (target.value.length === 0) {
        return "Необходимо ввести E-mail";
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(target.value)) {
        return "Введите корректный E-mail";
      }
      return "";
    }
  };

  //const checkFormValidity = (form) => {
  //  const inputErrors = [form.querySelectorAll(".input__error")];
  //  console.log(inputErrors.some((i) => i.innerText !== ""));
  //};

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validateMessage(target) });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  const resetFormCurrentUser = useCallback(
    (
      newValues = { name: currentUser.name, email: currentUser.email },
      newErrors = {},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, currentUser]
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    setValues,
    resetFormCurrentUser,
    resetForm,
  };
}
