import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  blogs: [],
  error: null,
};
const url = "/api/blogs/all";
export const storeAllBlogs = createAsyncThunk(
  "allBlogs/storeAllBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(url);
      //localStorage.removeItem("AllBlogs");
      localStorage.setItem("AllBlogs", JSON.stringify(data));
      return data;
    } catch (err) {
      //(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const allBlogsSlice = createSlice({
  name: "allBlogs",
  initialState,
  reducers: {},
  extraReducers: {
    [storeAllBlogs.pending]: (state, action) => {
      state.status = "loading";
    },
    [storeAllBlogs.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.blogs = action.payload;
    },
    [storeAllBlogs.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default allBlogsSlice.reducer;
