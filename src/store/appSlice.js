import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isPopupOpen: false,
    isMenuPopupOpen: false,
    isInfoPopupOpen: false,
    status: null,
    error: null,
  },
  reducers: {
    openMenuPopup(state, action) {
      state.isMenuPopupOpen = true;
      state.isPopupOpen = true;
    },
    openInfoPopup(state, action) {
      state.isInfoPopupOpen = true;
      state.isPopupOpen = true;
    },
    setErrorStatus(state, action) {
      state.status = action.payload;
    },
    setErrorMessage(state, action) {
      state.error = action.payload;
    },
    closeAllPopups(state, action) {
      state.isPopupOpen = false;
      state.isMenuPopupOpen = false;
      state.isInfoPopupOpen = false;
    },
  },
});

export const {
  openMenuPopup,
  openInfoPopup,
  setErrorStatus,
  setErrorMessage,
  closeAllPopups,
} = appSlice.actions;

export default appSlice.reducer;
