import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  BASE_URL,
  PATH_SIGNIN,
  PATH_SIGNUP,
  PATH_USERS_ME,
} from "../utils/config";

export const createUser = createAsyncThunk(
  "users/createUser",
  async function ({ values }, thunkAPI) {
    try {
      const response = await fetch(BASE_URL + PATH_SIGNUP, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      });
      let data = await response.json();
      console.log(data);
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async function ({ values }, thunkAPI) {
    try {
      const response = await fetch(BASE_URL + PATH_SIGNIN, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      let data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const patchUser = createAsyncThunk(
  "users/patchUser",
  async function (values, thunkAPI) {
    try {
      const response = await fetch(BASE_URL + PATH_USERS_ME, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${values.token}`,
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
        }),
      });
      let data = await response.json();
      if (response.ok) {
        return { ...data, name: values.name, email: values.email };
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkContent = createAsyncThunk(
  "users/checkContent",
  async function (token, thunkAPI) {
    try {
      const response = await fetch(BASE_URL + PATH_USERS_ME, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      let data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const loading = (state, action) => {
  state.tooltip = null;
  state.status = "loading";
  state.error = null;
};

const setError = (state, action) => {
  state.tooltip = null;
  state.status = false;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    loggedIn: null,
    currentUser: {},
    token: null,
    tooltip: null,
    status: null,
    error: null,
  },
  reducers: {
    logingApp(state, action) {
      state.loggedIn = action.payload;
    },
    showError(state, action) {
      alert(state.error);
    },
    showTooltip(state, action) {
      alert(state.tooltip);
    },
    logoutUser(state) {
      state.status = true;
      state.tooltip = `Спасибо, что были с нами!`;
      state.loggedIn = false;
      state.token = null;
      localStorage.removeItem("jwt");
      state.currentUser = {};
    },
  },
  extraReducers: {
    [createUser.pending]: loading,
    [loginUser.pending]: loading,
    [patchUser.pending]: loading,
    [checkContent.pending]: loading,
    [createUser.fulfilled]: (state, action) => {
      state.status = true;
      state.tooltip = `${action.payload.name}, вы успешно зарегистрировались!`;
      state.token = action.payload.token;
      localStorage.setItem("jwt", action.payload.token);
      state.currentUser = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
      };
      state.loggedIn = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = true;
      state.tooltip = `Вы успешно зашли на сайт!`;
      state.token = action.payload.token;
      localStorage.setItem("jwt", action.payload.token);
      state.currentUser = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
      };
      state.loggedIn = true;
    },
    [patchUser.fulfilled]: (state, action) => {
      state.status = true;
      state.tooltip = `${action.payload.name}, вы успешно отредактировали профиль!`;
      state.currentUser = {
        name: action.payload.name,
        email: action.payload.email,
      };
    },
    [checkContent.fulfilled]: (state, action) => {
      state.status = true;
      state.tooltip = `${action.payload.name}, вы успешно зашли на сайт!`;
      state.token = localStorage.getItem("jwt");
      state.currentUser = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
      };
      state.loggedIn = true;
    },
    [createUser.rejected]: setError,
    [loginUser.rejected]: setError,
    [patchUser.rejected]: setError,
    [checkContent.rejected]: setError,
  },
});

export const { logingApp, logoutUser, showError, showTooltip } = userSlice.actions;

export default userSlice.reducer;
