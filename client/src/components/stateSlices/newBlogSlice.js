import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  blogsCreated: null,
  error: null,
};

export const createNewBlog = createAsyncThunk(
  "newBlog/createNewBlog",
  async (newBlogFormData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "/api/blogs/createblog",
        newBlogFormData
      );
      return data;
    } catch (err) {
      //(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const newBlogSlice = createSlice({
  name: "newBlog",
  initialState,
  reducers: {},
  extraReducers: {
    [createNewBlog.pending]: (state, action) => {
      state.status = "loading";
    },
    [createNewBlog.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.blogsCreated = action.payload;
    },
    [createNewBlog.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default newBlogSlice.reducer;
