import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BASE_URL,
  BEATFILM_URL,
  DURATION,
  PATH_MOVIES,
  PATH_SAVED_MOVIES,
} from "../utils/config";

export const getAllMovies = createAsyncThunk(
  "movies/getAllMovies",
  async function (_, thunkAPI) {
    try {
      const response = await fetch(BEATFILM_URL + PATH_MOVIES, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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

export const getSavedMovies = createAsyncThunk(
  "movies/getSavedMovies",
  async function (token, thunkAPI) {
    try {
      const response = await fetch(BASE_URL + PATH_SAVED_MOVIES, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      let data = await response.json();
      if (data.message) {
        return thunkAPI.rejectWithValue(data.message);
      } else {
        return data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const saveMovie = createAsyncThunk(
  "movies/saveMovie",
  async function (value, thunkAPI) {
    try {
      const response = await fetch(BASE_URL + PATH_SAVED_MOVIES, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: value.token,
        },
        body: JSON.stringify({
          country: `${
            value.movie.country ? value.movie.country : "No country"
          }`,
          director: `${value.movie.director ? value.movie.director : ""}`,
          duration: value.movie.duration,
          year: `${value.movie.year ? value.movie.year : ""}`,
          description: `${
            value.movie.description ? value.movie.description : ""
          }`,
          image: `${BEATFILM_URL}${
            value.movie.image ? value.movie.image.url : ""
          }`,
          trailer: `${BEATFILM_URL}${
            value.movie.trailerLink
              ? value.movie.trailerLink
              : value.movie.image.formats.thumbnail.url
          }`,
          thumbnail: `${BEATFILM_URL}${
            value.movie.image ? value.movie.image.formats.thumbnail.url : ""
          }`,
          movieId: value.movie.id,
          nameRU: `${value.movie.nameRU ? value.movie.nameRU : "No Ru Title"}`,
          nameEN: `${value.movie.nameEN ? value.movie.nameEN : "No EN Title"}`,
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

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async function (value, thunkAPI) {
    const MOVIE = value.movieForDelete;
    try {
      const response = await fetch(BASE_URL + PATH_SAVED_MOVIES + "/" + MOVIE, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: value.token,
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

const setLoading = (state) => {
  state.tooltip = null;
  state.status = "loading";
  state.error = null;
};

const setError = (state, action) => {
  state.tooltip = null;
  state.status = false;
  state.error = action.payload;
};

const initialState = {
  movies: [],
  savedMovies: [],
  filteredMovies: [],
  countShowMovies: 0,
  count: 0,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    incrementCount(state, action) {
      state.countShowMovies = state.countShowMovies + action.payload;
    },
    initCountShowMovies(state, action) {
      state.countShowMovies = action.payload;
      state.count = action.payload;
    },
    setSavedMovies(state, action) {
      state.savedMovies = action.payload;
    },
    setFilteredMovies(state, action) {
      let newMovies = [];
      const { search, checkboxSearch, currentPath } = action.payload;
      if (currentPath === "/movies" && checkboxSearch === false) {
        newMovies = state.movies.filter(
          (m) =>
            m.duration > DURATION &&
            m.description
              .toLowerCase()
              .replace(/[.,!?%]/g, "")
              .includes(search.toLowerCase())
        );
        state.filteredMovies = newMovies;
      } else if (currentPath === "/movies" && checkboxSearch === true) {
        newMovies = state.movies.filter(
          (m) =>
            m.duration < DURATION &&
            m.description
              .toLowerCase()
              .replace(/[.,!?%]/g, "")
              .includes(search.toLowerCase())
        );
        state.filteredMovies = newMovies;
      } else if (currentPath === "/saved-movies" && checkboxSearch === false) {
        newMovies = state.savedMovies.filter(
          (m) =>
            m.duration > DURATION &&
            m.description
              .toLowerCase()
              .replace(/[.,!?%]/g, "")
              .includes(search.toLowerCase())
        );
        state.filteredMovies = newMovies;
      } else if (currentPath === "/saved-movies" && checkboxSearch === true) {
        newMovies = state.savedMovies.filter(
          (m) =>
            m.duration < DURATION &&
            m.description
              .toLowerCase()
              .replace(/[.,!?%]/g, "")
              .includes(search.toLowerCase())
        );
        state.filteredMovies = newMovies;
      }
    },
    resetStore() {
      localStorage.removeItem("localAllMovies");
      localStorage.removeItem("localSavedMovies");
      return initialState;
    },
  },
  extraReducers: {
    [getAllMovies.pending]: setLoading,
    [getSavedMovies.pending]: setLoading,
    [saveMovie.pending]: setLoading,
    [deleteMovie.pending]: setLoading,
    [getAllMovies.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.movies = action.payload;
      localStorage.setItem("localAllMovies", JSON.stringify(action.payload));
    },
    [getSavedMovies.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.savedMovies = action.payload;
      localStorage.setItem("localSavedMovies", JSON.stringify(action.payload));
    },
    [saveMovie.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.savedMovies.push(action.payload);
      localStorage.setItem(
        "localSavedMovies",
        JSON.stringify(state.savedMovies)
      );
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.status = "resolved";
      const newMovies = state.savedMovies.filter(
        (item) => item._id !== action.payload._id
      );
      state.savedMovies = newMovies;
      console.log(newMovies);
      localStorage.setItem("localSavedMovies", JSON.stringify(newMovies));
    },
    [getAllMovies.rejected]: setError,
    [getSavedMovies.rejected]: setError,
    [saveMovie.rejected]: setError,
    [deleteMovie.rejected]: setError,
  },
});

export const {
  incrementCount,
  setSavedMovies,
  setFilteredMovies,
  initCountShowMovies,
  resetStore,
} = movieSlice.actions;

export default movieSlice.reducer;
