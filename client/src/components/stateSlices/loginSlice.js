import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  loggedInUser: null,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (loginFormData, { rejectWithValue }) => {
    try {
      // console.log(loginFormData);
      const { data } = await axios.post("/api/users/login", loginFormData);
      // const { data } = await axios.post("/api/blogs/createblog", {
      //   blogTitle: "hello",
      //   blogBody: "hello",
      //   blogWriter: "62849f4570abf9686c04d441",
      // });
      //  console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state, action) {
      state.user = null;
      state.loggedInUser = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loggedInUser = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    },
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
