import { createSlice } from "@reduxjs/toolkit";
import { REG_EMAIL, REG_NAME, REG_PASSWORD, REG_PHONE } from "../utils/config.js";

const initialState = {
  values: { name: "", email: "", password: "", search: "" },
  errors: { name: false, email: false, password: false },
  checkboxSearch: false,
  isSignupFormValid: false,
  isLoginFormValid: false,
  isEditProfileFormValid: false,
  isSearchFormValid: false,
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    handleValuesChange(state, action) {
      const { name, value } = action.payload;
      const newValues = { ...state.values, [name]: value };
      state.values = newValues;
    },
    validateMessage(state, action) {
      if (action.payload === `name`) {
        if (state.values.name.length === 0) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Необходимо ввести имя",
          };
          return;
        }
        if (state.values.name.length < 2) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Имя должно быть больше 2 букв!",
          };
          return;
        }
        if (!REG_NAME.test(state.values.name)) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Имя может содержать только буквы, - и пробел",
          };
          return;
        }
        state.errors = { ...state.errors, [action.payload]: true };
        return;
      }
      if (action.payload === `email`) {
        if (state.values.email.length === 0) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Необходимо ввести E-mail",
          };
          return;
        }
        if (!REG_EMAIL.test(state.values.email)) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Введите корректный E-mail!",
          };
          return;
        }
        state.errors = { ...state.errors, [action.payload]: true };
        return;
      }
      if (action.payload === "phone") {
        if (state.values.phone.length === 0) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Необходимо ввести номер телефона",
          };
          return;
        }
        if (!REG_PHONE.test(state.values.phone)) {
          state.errors = {
            ...state.errors,
            [action.payload]:
              "Номер может содержать только цифры, - / + / () и пробелы",
          };
          return;
        }
        if (state.values.phone.length < 10) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Номер должен содержать больше 10 цифр",
          };
          return;
        }
        state.errors = { ...state.errors, [action.payload]: true };
        return;
      }
      if (action.payload === "password") {
        if (state.values.password.length === 0) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Необходимо ввести пароль!",
          };
          return;
        }
        if (state.values.password.length < 8) {
          state.errors = {
            ...state.errors,
            [action.payload]: "Пароль должен быть больше 8 символов!",
          };
          return;
        }
        if (!REG_PASSWORD.test(state.values.password)) {
          state.errors = {
            ...state.errors,
            [action.payload]:
              "Пароль должен содержать цифры, символы, строчные и прописные буквы!",
          };
          return;
        }
        state.errors = { ...state.errors, [action.payload]: true };
        return;
      }
    },
    toggleCheckboxSearch(state) {
      state.checkboxSearch = !state.checkboxSearch;
    },
    validateSignupForm(state) {
      state.isSignupFormValid =
        state.errors.name === true &&
        state.errors.email === true &&
        state.errors.password === true
          ? true
          : false;
    },
    validateLoginForm(state) {
      state.isLoginFormValid =
        state.errors.email === true && state.errors.password === true
          ? true
          : false;
    },
    validateProfileForm(state) {
      state.isEditProfileFormValid =
        state.errors.name === true && state.errors.email === true
          ? true
          : false;
    },
    resetFormCurrentUser(state, action) {
      state.isSignupFormValid = false;
      state.isLoginFormValid = false;
      state.isEditProfileFormValid = false;
      state.values = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        password: "",
      };
      state.errors = {
        name: true,
        email: true,
        password: false,
      };
      state.checkboxSearch = false;
    },
    resetForm() {
      return initialState;
    },
  },
});

export const {
  handleValuesChange,
  toggleCheckboxSearch,
  validateMessage,
  validateSignupForm,
  validateLoginForm,
  validateProfileForm,
  resetFormCurrentUser,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
