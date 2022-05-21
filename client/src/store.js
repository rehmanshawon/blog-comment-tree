import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./components/stateSlices/registerSlice";
import loginReducer from "./components/stateSlices/loginSlice";
import passwordResetEmailReducer from "./components/stateSlices/passwordResetEmailSlice";
import passwordResetPasswordReducer from "./components/stateSlices/passwordResetPasswordSlice";
import newBlogReducer from "./components/stateSlices/newBlogSlice";
import allBlogsReducer from "./components/stateSlices/allBlogsSlice";
import allCommentsReducer from "./components/stateSlices/allCommentsSlice";

const loggedInUserFromStorage = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser"))
  : null;

const blogsFromStorage = localStorage.getItem("AllBlogs")
  ? JSON.parse(localStorage.getItem("AllBlogs"))
  : null;

const commentsFromStorage = localStorage.getItem("AllComments")
  ? JSON.parse(localStorage.getItem("AllComments"))
  : null;

const preloadedState = {
  login: {
    loggedInUser: loggedInUserFromStorage,
  },
  allBlogs: {
    blogs: blogsFromStorage,
  },
  allComments: {
    comments: commentsFromStorage,
  },
};

export default configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    passwordResetEmail: passwordResetEmailReducer,
    passwordResetPassword: passwordResetPasswordReducer,
    newBlog: newBlogReducer,
    allBlogs: allBlogsReducer,
    allComments: allCommentsReducer,
  },
  preloadedState,
});
