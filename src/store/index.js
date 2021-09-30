import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./userSlice";
import appReduser from "./appSlice";
import movieReduser from "./movieSlice";
import formReduser from "./formSlice";

export default configureStore({
  reducer: {
    app: appReduser,
    users: userReduser,
    movies: movieReduser,
    forms: formReduser,
  },
});