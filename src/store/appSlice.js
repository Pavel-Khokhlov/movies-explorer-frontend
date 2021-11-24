import { createSlice } from "@reduxjs/toolkit";
import { INIT_SCROLL } from "../utils/config";

const initialState = {
  currentPath: "",
  currentLang: "ru",
  scrolled: {
    lastPosition: null,
    status: null,
  },
  isPopupOpen: false,
  isMenuPopupOpen: false,
  isInfoPopupOpen: false,
  status: null,
  error: null,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPath(state, action) {
      state.currentPath = action.payload;
    },
    setScrolled(state, action) {
      if (action.payload < INIT_SCROLL) {
        state.scrolled = { lastPosition: action.payload, status: false };
      } else {
        state.scrolled = { lastPosition: action.payload, status: true };
      }
    },
    openMenuPopup(state) {
      state.isMenuPopupOpen = true;
      state.isPopupOpen = true;
    },
    openInfoPopup(state) {
      state.isInfoPopupOpen = true;
      state.isPopupOpen = true;
    },
    setErrorStatus(state, action) {
      state.status = action.payload;
    },
    setErrorMessage(state, action) {
      state.error = action.payload;
    },
    closeAllPopups(state) {
      state.isPopupOpen = false;
      state.isMenuPopupOpen = false;
      state.isInfoPopupOpen = false;
    },
  },
});

export const {
  setCurrentPath,
  setScrolled,
  openMenuPopup,
  openInfoPopup,
  setErrorStatus,
  setErrorMessage,
  closeAllPopups,
} = appSlice.actions;

export default appSlice.reducer;
