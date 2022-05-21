import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  comments: [],
  error: null,
};

export const storeAllComments = createAsyncThunk(
  "allComments/storeAllComments",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/comments/all"
      );
      //localStorage.removeItem("AllBlogs");
      localStorage.setItem("AllComments", JSON.stringify(data));
      return data;
    } catch (err) {
      //console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const allCommentsSlice = createSlice({
  name: "allComments",
  initialState,
  reducers: {},
  extraReducers: {
    [storeAllComments.pending]: (state, action) => {
      state.status = "loading";
    },
    [storeAllComments.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.comments = action.payload;
    },
    [storeAllComments.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export default allCommentsSlice.reducer;
