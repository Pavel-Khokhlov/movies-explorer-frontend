import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../utils/config";
const BASE_URL_PHOTOS = "https://jsonplaceholder.typicode.com/photos";

export const getPlaces = createAsyncThunk(
  "places/getPlaces",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        BASE_URL_PHOTOS
      );
      if (!response.ok) {
        throw new Error('SERVER ERROR!');
      }
        const places = await response.json();
        return places;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const placeSlice = createSlice({
  name: "places",
  initialState: {
    places: [],
  },
  reducers: {
  
  },
  extraReducers: {
    [getPlaces.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [getPlaces.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.places = action.payload;
    },
    [getPlaces.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {
} = placeSlice.actions;

export default placeSlice.reducer;
